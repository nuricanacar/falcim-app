import { useEffect, useState } from "react";

export default function MyOffers({ userId }) {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOffers() {
      const response = await fetch(`/api/auth/offers/myOffers?user_id=${userId}`);
      const data = await response.json();
      setOffers(data);
      setLoading(false);
    }
    fetchOffers();
  }, [userId]);

  if (loading) return <p>Teklifler yükleniyor...</p>;
  if (offers.length === 0) return <p>Henüz teklif vermediniz.</p>;

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-3">Verdiğiniz Teklifler</h2>
      <ul>
        {offers.map((offer) => (
          <li key={offer.id} className="border-b py-2">
            <p><strong>İlan:</strong> {offer.listing?.fortuneType}</p>
            <p><strong>Fiyat:</strong> {offer.price} TL</p>
            <p><strong>Mesaj:</strong> {offer.message}</p>
            <p><strong>Durum:</strong> {offer.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
