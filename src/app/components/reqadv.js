import { useState } from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useAuth } from './AuthContext'; // AuthContext dosyanızın yolunu doğru şekilde ayarlayın

export default function Example() {
  const { user } = useAuth(); // AuthContext'ten kullanıcı bilgisini al
  const userId = user?.id; // Kullanıcının ID'sini al

  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState({
    fortuneType: "", // Fal türü
    question: "", // Soru
  });
  const [loading, setLoading] = useState(false); // Yükleme durumu
  const [error, setError] = useState(""); // Hata mesajı

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleMouseDown = (e) => {
    if (e.target.id === "updateProductModal") {
      setIsDragging(true);
    }
  };

  const handleMouseUp = (e) => {
    if (isDragging && e.target.id === "updateProductModal") {
      closeModal();
    }
    setIsDragging(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!userId) {
      alert("Lütfen giriş yapın.");
      return;
    }
  
    if (!formData.fortuneType || !formData.question) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }
  
    setLoading(true);
    setError("");
  
    try {
      const response = await fetch("/api/auth/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          fortuneType: formData.fortuneType,
          question: formData.question,
          photos: [], // Eğer fotoğraf yoksa boş bir dizi gönderin
        }),
      });
  
      // Yanıtın boş olup olmadığını kontrol et
      const data = response.headers.get('content-length') > 0 ? await response.json() : {};
  
      console.log("Sunucu yanıtı:", { status: response.status, data }); // Yanıtı logla
  
      if (!response.ok) {
        const errorMessage = data.error || "İlan oluşturulurken bir hata oluştu.";
        console.error("Sunucu hatası:", errorMessage); // Hata mesajını logla
        throw new Error(errorMessage);
      }
  
      alert("İlan başarıyla oluşturuldu!");
      closeModal();
      setFormData({ fortuneType: "", question: "" }); // Formu sıfırla
    } catch (error) {
      console.error("Hata:", error);
      setError(error.message || "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Modal'ı açacak buton */}
      <div className="flex-shrink-0">
        <button
          onClick={openModal}
          type="button"
          className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <QuestionMarkCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Fal Baktır
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          id="updateProductModal"
          tabIndex="-1"
          aria-hidden="true"
          className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full h-full bg-black/50"
        >
          <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Yeni İlan Oluştur
                </h3>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="fortuneType"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Fal Türü
                    </label>
                    <select
                      id="fortuneType"
                      name="fortuneType"
                      value={formData.fortuneType}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    >
                      <option value="">Lütfen Bakılacak Fal Türü Seçiniz</option>
                      <option value="KahveFali">Kahve Falı</option>
                      <option value="ElFali">El Falı (Palmistry)</option>
                      <option value="IskambilFali">İskambil Falı</option>
                      <option value="Astroloji">Astroloji (Yıldız Falı)</option>
                      <option value="SuFali">Su Falı</option>
                      <option value="Numeroloji">Numeroloji</option>
                      <option value="RuyaYorumu">Rüya Yorumu</option>
                      <option value="AuraFali">Aura Falı</option>
                      <option value="YuzFali">Yüz Falı (Fizyonomi)</option>
                      <option value="KatinaAsKali">Katina Aşk Falı</option>
                      <option value="TarotFali">Tarot Falı</option>
                      <option value="DuruGoru">Duru Görü (Clairvoyance)</option>
                      <option value="MumFali">Mum Falı</option>
                      <option value="CayFali">Çay Falı</option>
                      <option value="TasFali">Taş Falı</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="question"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Sorunuz
                    </label>
                    <textarea
                      id="question"
                      name="question"
                      rows="5"
                      value={formData.question}
                      onChange={handleInputChange}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Sorunuzu buraya yazın..."
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="text-red-500 text-sm mb-4">
                    {error}
                  </div>
                )}

                <div className="flex items-center space-x-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    {loading ? "Yükleniyor..." : "İlanı Yükle"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}