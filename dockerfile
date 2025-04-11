# ---- Base Stage ----
# Node.js'in LTS (Uzun Süreli Destek) sürümünü temel alıyoruz.
# Alpine sürümü daha küçüktür.
FROM node:22-alpine AS base
WORKDIR /app

# ---- Dependencies Stage ----
# Sadece bağımlılıkları kuracağımız aşama. Katman önbelleklemesini optimize eder.
FROM base AS dependencies
COPY package.json package-lock.json* ./
# Sadece production bağımlılıklarını kuruyoruz (build için gerekli değilse)
# Eğer build için devDependencies gerekiyorsa: RUN npm install
RUN npm install --only=production
# Prisma Client'ı generate etmek için schema'yı kopyala
COPY prisma ./prisma
# Prisma Client'ı generate et (runtime için gerekli)
# Not: Prisma CLI normalde devDependency'dir. Eğer production'da kurmadıysanız,
# build aşamasında kurup generate edip sonra silebilir veya global kurabilirsiniz.
# Ya da en kolayı, build aşamasında tüm bağımlılıkları kurmaktır.
# Biz builder aşamasında yapacağız.

# ---- Builder Stage ----
# Uygulamayı build edeceğimiz aşama.
FROM base AS builder
WORKDIR /app
# Önceki aşamadaki production bağımlılıklarını kopyala (isteğe bağlı, tümünü kuracaksak gerek yok)
# COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/prisma ./prisma
COPY package.json package-lock.json* ./
# Tüm bağımlılıkları kur (devDependencies dahil, build ve generate için)
RUN npm install
# Prisma Client'ı oluştur
RUN npx prisma generate
# Tüm proje dosyalarını kopyala
COPY . .
# Next.js uygulamasını build et
# DATABASE_URL build sırasında gerekmeyebilir, gerekirse build arg olarak ekleyin.
ENV NODE_ENV=production
RUN npm run build

# ---- Runner Stage ----
# Son production imajı
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
# Production bağımlılıklarını kopyala
COPY --from=dependencies /app/node_modules ./node_modules
# Prisma schema ve oluşturulan client'ı kopyala (runtime'da migrate/client için)
COPY --from=builder /app/prisma ./prisma
# Build edilmiş Next.js uygulamasını kopyala
COPY --from=builder /app/.next ./.next
# Public klasörünü kopyala
# COPY --from=builder /app/public ./public
# package.json'ı kopyala (npm start için gerekli)
COPY package.json ./

# Ortam değişkenlerini dışarıdan alacağımızı varsayıyoruz (DATABASE_URL vb.)

# Uygulamanın çalışacağı port
EXPOSE 6060

# Uygulamayı başlatma komutu
CMD ["npm", "start"]