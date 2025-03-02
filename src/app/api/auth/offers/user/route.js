import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
      return new Response(JSON.stringify({ error: "Kullanıcı ID eksik!" }), { status: 400 });
    }

    // Kullanıcının verdiği tüm teklifleri getir
    const offers = await prisma.offer.findMany({
      where: { user_id: parseInt(user_id) },
      include: { listing: true }
    });

    return new Response(JSON.stringify(offers), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
