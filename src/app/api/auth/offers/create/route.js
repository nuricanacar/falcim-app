import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { listing_id, user_id, price, message } = body;

    if (!listing_id || !user_id || !price) {
      return new Response(JSON.stringify({ error: "Eksik veri!" }), { status: 400 });
    }

    // Kullanıcının zaten bu ilana teklif verip vermediğini kontrol et
    const existingOffer = await prisma.offer.findFirst({
      where: { listing_id, user_id }
    });

    if (existingOffer) {
      return new Response(JSON.stringify({ error: "Bu ilana zaten teklif verdiniz!" }), { status: 400 });
    }

    // Yeni teklifi oluştur
    const offer = await prisma.offer.create({
      data: { listing_id, user_id, price, message }
    });

    return new Response(JSON.stringify(offer), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
