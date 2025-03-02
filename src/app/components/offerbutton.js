import { useState } from "react";

export default function OfferButton({ listingId, userId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/auth/offers/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listing_id: listingId, user_id: userId, price, message })
    });

    const data = await response.json();
    if (response.ok) {
      alert("Teklifiniz gönderildi!");
      setIsOpen(false);
      setPrice("");
      setMessage("");
    } else {
      alert(data.error);
    }
  };

  return (
    <div>
      {/* Buton */}
      <button 
        onClick={() => setIsOpen(true)} 
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Teklif Ver
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Teklif Ver</h2>
            <form onSubmit={handleSubmit}>
              <input 
                type="number" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                placeholder="Teklif fiyatı" 
                className="w-full p-2 border rounded mb-2"
              />
              <div className="flex justify-end space-x-2">
                <button 
                  type="button" 
                  onClick={() => setIsOpen(false)} 
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  İptal
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}