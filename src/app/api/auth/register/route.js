import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { firstName, lastName, email, password, isFortuneTeller } = await req.json();

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

    return NextResponse.json(
      { message: "Kayıt başarılı", user },
      { status: 201 }
    );
  } catch (error) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Bu email zaten kullanılıyor" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Kayıt başarısız" },
      { status: 500 }
    );
  }
}
