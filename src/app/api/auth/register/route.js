import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // JWT token üretmek için

export async function POST(req) {
  try {
    const { firstName, lastName, email, password, isFortuneTeller } =
      await req.json();

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

    // JWT token üret
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        isFortuneTeller: user.isFortuneTeller,
      },
      process.env.JWT_SECRET, // .env dosyasında JWT_SECRET tanımlayın
      { expiresIn: "1h" } // Token'ın geçerlilik süresi
    );

    return NextResponse.json(
      {
        message: "Kayıt başarılı",
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isFortuneTeller: user.isFortuneTeller,
        },
        token, // Token'ı yanıta ekle
      },
      { status: 201 }
    );
  } catch (error) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Bu email zaten kullanılıyor" },
        { status: 400 }
      );
    }
    console.error("Sunucu Hatası:", error.message, error.stack);
    return NextResponse.json(
      { error: "Kayıt başarısız" },
      { status: 500 }
    );
  }
}