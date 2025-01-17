// src/app/api/auth/userdetail/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { userId, birthTimestamp, photo, birthPlace, gender } = await request.json();

    // UserDetail tablosuna kayıt ekle veya güncelle
    const userDetail = await prisma.userDetail.upsert({
      where: { user_id: userId },
      update: {
        birth_timestamp: new Date(birthTimestamp), // Tarih ve saat bilgisini tek bir sütunda tutar
        photo: photo, // Fotoğraf linkini kaydet
        birth_place: birthPlace, // Doğum yerini kaydet
        gender: gender, // Cinsiyeti kaydet
      },
      create: {
        user_id: userId,
        birth_timestamp: new Date(birthTimestamp),
        photo: photo,
        birth_place: birthPlace,
        gender: gender,
      },
    });

    return new Response(JSON.stringify({ success: true, userDetail }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saving user details:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to save user details' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}