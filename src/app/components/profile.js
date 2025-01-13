import { useState } from 'react'
import {
  CalendarDaysIcon,
  PencilSquareIcon,
  CheckIcon,
  PhoneIcon,
  TagIcon,
  EnvelopeIcon,
  ClockIcon,
  UserIcon,
} from '@heroicons/react/20/solid'

export default function Profile({ user }) {
  const [editMode, setEditMode] = useState(false);
  const [editSecurityMode, setEditSecurityMode] = useState(false);
  const [userData, setUserData] = useState({
    birthDate: "01/01/1990",
    gender: "Erkek",
    phone: "+90 555 555 55 55",
    interests: "Spor, Müzik, Seyahat",
    email: user.email,
    password: "********",
  });

  // Düzenleme modunu aç/kapa
  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (editMode) {
      // Düzenleme modu kapatıldığında güvenlik modunu da kapat
      setEditSecurityMode(false);
    }
  };

  // Güvenlik düzenleme modunu aç/kapa
  const toggleSecurityEditMode = () => {
    setEditSecurityMode(!editSecurityMode);
  };

  // Input değişikliklerini yakala
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
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
              onClick={toggleEditMode}
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
            {/* Doğum Tarihi */}
            <div className="flex items-center gap-x-2">
              <CalendarDaysIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
              <label className="text-sm text-gray-600 flex items-center gap-2">
                <span>Doğum Tarihi:</span>
                <input
                  type="date"
                  name="birthDate"
                  value={userData.birthDate}
                  onChange={handleInputChange}
                  className={`${editMode ? 'border rounded-md px-2 py-1' : 'bg-transparent border-none focus:outline-none'
                    }`}
                  readOnly={!editMode}
                />
              </label>
            </div>

            {/* Doğum Saati */}
            <div className="flex items-center gap-x-2">
              <ClockIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
              <label className="text-sm text-gray-600 flex items-center gap-2">
                <span>Doğum Saati:</span>
                <input
                  type="time"
                  name="birthTime"
                  value={userData.birthTime}
                  onChange={handleInputChange}
                  className={`${editMode ? 'border rounded-md px-2 py-1' : 'bg-transparent border-none focus:outline-none'
                    }`}
                  readOnly={!editMode}
                />
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

          {/* Email ve Şifre */}
          <div className="mt-4 mb-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none flex flex-col gap-2">
              <span className="sr-only">Email ve Şifre</span>
              <EnvelopeIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
              <TagIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
            </dt>
            <dd className="text-sm leading-6 text-gray-500 flex flex-col justify-between w-full">
              {editMode && editSecurityMode ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    className="border rounded-md px-2 py-1"
                    placeholder="Email"
                  />
                  <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleInputChange}
                    className="border rounded-md px-2 py-1"
                    placeholder="Şifre"
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <span>{userData.email}</span>
                  <span>{userData.password}</span>
                </div>
              )}
              {editMode && (
                <button
                  onClick={toggleSecurityEditMode}
                  className="self-end flex items-center justify-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 ring-1 ring-inset ring-blue-600/20 hover:bg-blue-100 mt-2"
                >
                  {editSecurityMode ? (
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
              )}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}