export async function GET(req) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("user_id");

    // Gelişmiş validasyon
    if (!userId || !/^\d+$/.test(userId)) {
      return new Response("Geçerli bir kullanıcı ID'si gereklidir", { status: 400 });
    }

    const userIdNumber = parseInt(userId);

    // Prisma sorgusu
    const offers = await prisma.offer.findMany({
      where: {
        user_id: userIdNumber, // Veri tipini Prisma schema'ya göre ayarlayın
      },
    });

    return new Response(JSON.stringify(offers), { status: 200 });
  } catch (error) {
    console.error("Hata Detayı:", error); // Gerçek hatayı logla
    return new Response("Teknik bir hata oluştu", { status: 500 });
  }
}