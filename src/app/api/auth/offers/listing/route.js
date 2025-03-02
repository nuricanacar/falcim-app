import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const listing_id = searchParams.get("listing_id");

    if (!listing_id) {
      return new Response(JSON.stringify({ error: "İlan ID eksik!" }), { status: 400 });
    }

    // İlanın tüm tekliflerini getir
    const offers = await prisma.offer.findMany({
      where: { listing_id: parseInt(listing_id) },
      include: { user: true }
    });

    return new Response(JSON.stringify(offers), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
