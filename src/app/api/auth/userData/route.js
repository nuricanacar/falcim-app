import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    // URL'den kullanıcı ID'sini al
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: "Kullanıcı ID'si gereklidir" },
        { status: 400 }
      );
    }

    // Kullanıcıyı veritabanından bul
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        isFortuneTeller: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    // Kullanıcı bilgilerini döndür
    return NextResponse.json(
      { user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Sunucu Hatası:", error.message, error.stack);
    return NextResponse.json(
      { error: "Sunucu hatası: Kullanıcı bilgileri getirilemedi" },
      { status: 500 }
    );
  }
}