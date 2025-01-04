import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { firstName, lastName, email, password, isFortuneTeller } = req.body;

  try {
    // Şifreyi hash'le
    const hashedPassword = await bcrypt.hash(password, 10);

    // Kullanıcıyı oluştur
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        isFortuneTeller: isFortuneTeller || false, // Varsayılan olarak false
      },
    });

    res.status(201).json({ message: "Kayıt başarılı", user });
  } catch (error) {
    if (error.code === "P2002") {
      res.status(400).json({ error: "Bu email zaten kullanılıyor" });
    } else {
      res.status(500).json({ error: "Kayıt başarısız" });
    }
  }
}
