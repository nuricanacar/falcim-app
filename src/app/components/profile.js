import { useState } from 'react';
import {
  CalendarDaysIcon,
  PencilSquareIcon,
  CheckIcon,
  UserIcon,
  ClockIcon,
} from '@heroicons/react/20/solid';

// Türkiye'deki 81 il
const citiesOfTurkey = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin",
  "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale",
  "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir",
  "Gaziantep", "Giresun", "Gümüşhane", "Hakkâri", "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir",
  "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya",
  "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya",
  "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak",
  "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale", "Batman", "Şırnak",
  "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"
];

export default function Profile({ user }) {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    birthTimestamp: '', // Tarih ve saat bilgisini tek bir alanda tutar
    photo: '', // Fotoğraf linki
    birthPlace: '', // Doğum yeri
    gender: '', // Cinsiyet
  });

  // Düzenleme modunu aç/kapa
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Input değişikliklerini yakala
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Fotoğraf yükleme işlemi
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Hızlıresim.com'a dosya yükleme
      const response = await fetch('https://hizliresim.com/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      const photoUrl = data.url; // Hızlıresim.com'dan dönen URL

      // URL'yi state'e kaydet
      setUserData({ ...userData, photo: photoUrl });
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Fotoğraf yüklenirken bir hata oluştu.');
    }
  };

  // Formu gönder
  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/auth/userdetail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          birthTimestamp: userData.birthTimestamp,
          photo: userData.photo,
          birthPlace: userData.birthPlace,
          gender: userData.gender,
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert('Bilgiler başarıyla kaydedildi!');
        setEditMode(false);
      } else {
        alert('Bilgiler kaydedilirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Bilgiler kaydedilirken bir hata oluştu.');
    }
  };

  return (
    <div className="lg:col-start-3 lg:row-end-1">
      <h2 className="sr-only">Kullanıcı Bilgileri</h2>
      <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
        <dl className="flex flex-wrap">
          {/* Rol Bilgisi */}
          <div className="flex-none self-end px-6 pt-4">
            <dt className="sr-only">Rol</dt>
            <dd className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 ring-1 ring-inset ring-green-600/20">
              Kullanıcı Detayları
            </dd>
          </div>

          {/* Düzenleme Butonu */}
          <div className="flex-none self-end px-6 pt-4 ml-auto">
            <button
              onClick={editMode ? handleSubmit : toggleEditMode}
              className="flex items-center justify-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 ring-1 ring-inset ring-blue-600/20 hover:bg-blue-100"
            >
              {editMode ? (
                <>
                  <CheckIcon className="h-4 w-4 mr-1" />
                  Kaydet
                </>
              ) : (
                <>
                  <PencilSquareIcon className="h-4 w-4 mr-1" />
                  Düzenle
                </>
              )}
            </button>
          </div>

          {/* Doğum Tarihi ve Saati */}
          <div className="mt-6 flex w-full flex-col gap-y-4 border-t border-gray-900/5 px-6 pt-6">
            {/* Doğum Tarihi ve Saati */}
            <div className="flex items-center gap-x-2">
              <CalendarDaysIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
              <label className="text-sm text-gray-600 flex items-center gap-2">
                <span>Doğum Tarihi ve Saati:</span>
                <input
                  type="datetime-local"
                  name="birthTimestamp"
                  value={userData.birthTimestamp}
                  onChange={handleInputChange}
                  className={`${editMode ? 'border rounded-md px-2 py-1' : 'bg-transparent border-none focus:outline-none'
                    }`}
                  readOnly={!editMode}
                />
              </label>
            </div>

            {/* Fotoğraf Yükleme */}
            <div className="flex items-center gap-x-2">
              <UserIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
              <label className="text-sm text-gray-600 flex items-center gap-2">
                <span>Fotoğraf:</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className={`${editMode ? 'border rounded-md px-2 py-1' : 'bg-transparent border-none focus:outline-none'
                    }`}
                  disabled={!editMode}
                />
              </label>
            </div>

            {/* Doğum Yeri */}
            <div className="flex items-center gap-x-2">
              <UserIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
              <label className="text-sm text-gray-600 flex items-center gap-2">
                <span>Doğum Yeri:</span>
                <select
                  name="birthPlace"
                  value={userData.birthPlace}
                  onChange={handleInputChange}
                  className={`${editMode ? 'border rounded-md px-2 py-1' : 'bg-transparent border-none focus:outline-none'
                    }`}
                  disabled={!editMode}
                >
                  <option value="">Seçiniz</option>
                  {citiesOfTurkey.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Cinsiyet */}
            <div className="flex items-center gap-x-2">
              <UserIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
              <label className="text-sm text-gray-600 flex items-center gap-2">
                <span>Cinsiyet:</span>
                <select
                  name="gender"
                  value={userData.gender}
                  onChange={handleInputChange}
                  className={`${editMode ? 'border rounded-md px-2 py-1' : 'bg-transparent border-none focus:outline-none'
                    }`}
                  disabled={!editMode}
                >
                  <option value="">Seçiniz</option>
                  <option value="Erkek">Erkek</option>
                  <option value="Kadın">Kadın</option>
                  <option value="Diğer">Diğer</option>
                </select>
              </label>
            </div>
          </div>
        </dl>
      </div>
    </div>
  );
}