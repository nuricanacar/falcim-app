import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Kullanıcıyı bul
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        password: true, // Şifreyi seçiyoruz
      },
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { error: "Geçersiz email veya şifre" },
        { status: 401 }
      );
    }

    // Şifreyi doğrula
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Geçersiz email veya şifre" },
        { status: 401 }
      );
    }

    // Başarılı yanıt döndür
    return NextResponse.json(
      {
        message: "Giriş başarılı",
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isFortuneTeller: user.isFortuneTeller,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Sunucu Hatası:", error.message, error.stack);
    return NextResponse.json(
      { error: "Sunucu hatası: Giriş başarısız"},
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Sadece POST metodu destekleniyor" },
    { status: 405 }
  );
}
