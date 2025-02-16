import { PrismaClient, Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

// Prisma Client tek bir instance olarak kullanılır
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// GET Method: Fetch Listings
export async function GET() {
  try {
    const listings = await prisma.fortuneListing.findMany({
      include: {
        user: true, // Kullanıcı bilgilerini çek
      },
    });

    return NextResponse.json({ success: true, listings }, { status: 200 });
  } catch (error) {
    console.error('İlanları çekerken hata oluştu:', error);
    return NextResponse.json(
      { success: false, error: "İlanlar alınırken bir hata oluştu." },
      { status: 500 }
    );
  }
}


// POST Method: Create Listing
export async function POST(request) {
  try {
    const { userId, fortuneType, question } = await request.json();

    console.log("Gelen istek:", { userId, fortuneType, question });

    // Validation
    if (!userId || !fortuneType || !question) {
      return NextResponse.json(
        { success: false, error: "Eksik alanlar: userId, fortuneType veya question" },
        { status: 400 }
      );
    }

    // İlan oluştur
    const listing = await prisma.fortuneListing.create({
      data: {
        user_id: userId,
        fortuneType,
        question,
        status: "Beklemede",
      },
    });

    console.log("İlan başarıyla oluşturuldu:", listing);

    return NextResponse.json({ success: true, listing }, { status: 201 }); // 201 Created
  } catch (error) {
    console.error('İlan oluşturma hatası:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Prisma hatası:', error.code, error.message);
      return NextResponse.json(
        { success: false, error: `Veritabanı hatası: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || "İlan oluşturulurken bir hata oluştu." },
      { status: 500 }
    );
  }
}