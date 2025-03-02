import { useEffect, useState } from "react";

const ReceivedOffers = ({ userId }) => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(`/api/auth/offers/receivedOffers?user_id=${userId}`);
        if (!response.ok) throw new Error("Teklifler yüklenemedi");
        const data = await response.json();

        // Teklifleri ilanlara göre gruplama
        const groupedOffers = data.reduce((acc, offer) => {
          if (!acc[offer.listing_id]) acc[offer.listing_id] = [];
          acc[offer.listing_id].push(offer);
          return acc;
        }, {});

        setOffers(groupedOffers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, [userId]);

  const handleOfferAction = async (listingId, offerId, action) => {
    try {
      const response = await fetch(`/api/auth/offers/receivedOffers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offerId, status: action }),
      });

      if (!response.ok) throw new Error("Teklif güncellenemedi");

      setOffers((prevOffers) => {
        return {
          ...prevOffers,
          [listingId]: prevOffers[listingId].map((offer) =>
            offer.id === offerId
              ? { ...offer, status: action }
              : action === "Accepted"
              ? { ...offer, status: "Rejected" }
              : offer
          ),
        };
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Teklifler yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">İlanlarınıza Gelen Teklifler</h2>
      {Object.keys(offers).length === 0 ? (
        <p>Henüz teklif almadınız.</p>
      ) : (
        Object.entries(offers).map(([listingId, listingOffers]) => (
          <div key={listingId} className="mb-6 p-4 bg-white shadow-lg rounded">
            <h3 className="text-lg font-semibold mb-2">İlan ID: {listingId}</h3>
            <ul>
              {listingOffers.map((offer) => (
                <li key={offer.id} className="p-3 border rounded mb-2">
                  <p className="font-semibold">
                    Teklif Veren: {offer.user.firstName} {offer.user.lastName}
                  </p>
                  <p>Fiyat: {offer.price}₺</p>
                  <p>Mesaj: {offer.message}</p>
                  <p>
                    Durum:{" "}
                    <span
                      className={
                        offer.status === "Accepted"
                          ? "text-green-600"
                          : offer.status === "Rejected"
                          ? "text-red-600"
                          : "text-gray-600"
                      }
                    >
                      {offer.status}
                    </span>
                  </p>
                  {offer.status === "Pending" && (
                    <div className="mt-2">
                      <button
                        className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                        onClick={() => handleOfferAction(listingId, offer.id, "Accepted")}
                      >
                        Kabul Et
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded"
                        onClick={() => handleOfferAction(listingId, offer.id, "Rejected")}
                      >
                        Reddet
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default ReceivedOffers;
