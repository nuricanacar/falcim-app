import { PrismaClient, Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { userId, fortuneType, question, photos } = await request.json();

    console.log("Gelen istek:", { userId, fortuneType, question, photos });

    if (!userId || !fortuneType || !question) {
      return NextResponse.json(
        { success: false, error: "Eksik alanlar: userId, fortuneType veya question" },
        { status: 400 }
      );
    }

    // İlanı oluştur
    const listing = await prisma.fortuneListing.create({
      data: {
        user_id: userId,
        fortuneType,
        question,
        status: "Beklemede",
      },
    });

    console.log("İlan başarıyla oluşturuldu:", listing); // İlanı logla

    // Fotoğrafları ekle (varsa)
    if (photos && photos.length > 0) {
      await prisma.listingPhoto.createMany({
        data: photos.map((photoUrl) => ({
          listing_id: listing.id,
          photo_url: photoUrl,
        })),
      });
    }

    // Başarılı yanıt
    return NextResponse.json(
      { success: true, listing },
      { status: 200 }
    );
  } catch (error) {
    console.error('İlan oluşturma hatası:', error);

    // Prisma hatalarını yakala
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Prisma hatası:', error.code, error.message);
      return NextResponse.json(
        { success: false, error: `Veritabanı hatası: ${error.message}` },
        { status: 500 }
      );
    }

    // Diğer hatalar
    return NextResponse.json(
      { success: false, error: error.message || "İlan oluşturulurken bir hata oluştu." },
      { status: 500 }
    );
  }
}