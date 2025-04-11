// import { db } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Yalnızca POST isteği kabul edilir." });
  }

  try {
    const { offerId, comment } = req.body;

    // Teklifin kabul edildiğini kontrol et
    const offer = await db.offer.findUnique({
      where: { id: offerId },
    });

    if (!offer || offer.status !== "Accepted") {
      return res.status(403).json({ error: "Bu teklife yorum ekleyemezsiniz." });
    }

    // Yorumu güncelle
    await db.offer.update({
      where: { id: offerId },
      data: { comment },
    });

    return res.status(200).json({ success: true, comment });
  } catch (error) {
    console.error("Yorum eklenirken hata oluştu:", error);
    return res.status(500).json({ error: "Sunucu hatası" });
  }
}
