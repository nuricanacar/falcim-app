import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = parseInt(searchParams.get("user_id"));

    if (!userId) {
      return Response.json({ error: "Kullanıcı ID gerekli." }, { status: 400 });
    }
     
    // Kullanıcının ilanlarına gelen teklifleri çek
    const receivedOffers = await prisma.offer.findMany({
      where: {
        listing: {
          user_id: userId, // İlanın sahibi bu kullanıcı olmalı
        },
      },
      include: {
        user: true, // Teklifi yapan kullanıcı bilgilerini de getir
        listing: true, // İlgili ilanı da getir
      },
    });

    return Response.json(receivedOffers, { status: 200 });
  } catch (error) {
    console.error("Teklifleri alma hatası:", error);
    return Response.json({ error: "Teklifler yüklenirken hata oluştu." }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { offerId, status } = await req.json();

    if (!offerId || !status) {
      return Response.json({ error: "Teklif ID ve yeni durum gerekli." }, { status: 400 });
    }

    if (status === "Accepted") {
      // Kabul edilen teklifin detaylarını çek
      const offer = await prisma.offer.findUnique({
        where: { id: offerId },
        select: { listing_id: true },
      });

      // Önce teklifi kabul et
      await prisma.offer.update({
        where: { id: offerId },
        data: { status: "Accepted" },
      });

      // İlanın durumunu "Fal bakılıyor" olarak güncelle
      await prisma.fortuneListing.update({
        where: { id: offer.listing_id },
        data: { status: "Fal bakılıyor" },
      });

      // Aynı ilana gelen diğer teklifleri reddet
      await prisma.offer.updateMany({
        where: {
          listing_id: offer.listing_id,
          id: { not: offerId },
        },
        data: { status: "Rejected" },
      });
    } else {
      // Eğer sadece reddediliyorsa
      await prisma.offer.update({
        where: { id: offerId },
        data: { status: "Rejected" },
      });
    }

    return Response.json({ message: "Teklif güncellendi." }, { status: 200 });
  } catch (error) {
    console.error("Teklif güncelleme hatası:", error);
    return Response.json({ error: "Teklif güncellenirken hata oluştu." }, { status: 500 });
  }
}
