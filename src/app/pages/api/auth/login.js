import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  try {
    // Kullanıcıyı bul
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "Geçersiz email veya şifre" });
    }

    // Şifreyi doğrula
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Geçersiz email veya şifre" });
    }

    res.status(200).json({
      message: "Giriş başarılı",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isFortuneTeller: user.isFortuneTeller,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Giriş başarısız" });
  }
}
