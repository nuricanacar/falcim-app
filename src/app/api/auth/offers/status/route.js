import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { offer_id, status } = body;

    if (!offer_id || !status) {
      return new Response(JSON.stringify({ error: "Eksik veri!" }), { status: 400 });
    }

    if (!["Accepted", "Rejected"].includes(status)) {
      return new Response(JSON.stringify({ error: "Geçersiz durum!" }), { status: 400 });
    }

    // Teklifin durumunu güncelle
    const updatedOffer = await prisma.offer.update({
      where: { id: offer_id },
      data: { status }
    });

    return new Response(JSON.stringify(updatedOffer), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
