import { useState } from 'react'
import {
    CalendarDaysIcon,
    PencilSquareIcon,
    CheckIcon,
    PhoneIcon,
    TagIcon,
    EnvelopeIcon,
} from '@heroicons/react/20/solid'


export default function profile() {

    const [editMode, setEditMode] = useState(false);
    const [showSecurityButton, setShowSecurityButton] = useState(false);
    const [userData, setUserData] = useState({
        role: "Admin",
        birthDate: "01/01/1990",
        gender: "Erkek",
        phone: "+90 555 555 55 55",
        interests: "Spor, Müzik, Seyahat",
        email: "example@example.com",
        password: "********",
    });

    // Düzenleme modunu aç/kapa
    const toggleEditMode = () => {
        setEditMode(!editMode);
        if (editMode) {
            // Düzenleme modu kapatıldığında güvenlik butonunu gizle
            setShowSecurityButton(false);
        }
    };

    // Input değişikliklerini yakala
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    // Email ve şifre için güvenlik butonunu göster
    const handleSecurityButtonClick = () => {
        setShowSecurityButton(true);
    };


    return (
        <div className="lg:col-start-3 lg:row-end-1">
            <h2 className="sr-only">Kullanıcı Bilgileri</h2>
            <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                <dl className="flex flex-wrap">
                    {/* Rol Bilgisi */}
                    <div className="flex-none self-end px-6 pt-4">
                        <dt className="sr-only">Rol</dt>
                        <dd className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20">
                            {userData.role}
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

                    {/* Doğum Tarihi ve Cinsiyet */}
                    <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                        <dt className="flex-none">
                            <span className="sr-only">Doğum Tarihi ve Cinsiyet</span>
                            <CalendarDaysIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                        </dt>
                        <dd className="text-sm font-medium leading-6 text-gray-900">
                            {editMode ? (
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        name="birthDate"
                                        value={userData.birthDate}
                                        onChange={handleInputChange}
                                        className="border rounded-md px-2 py-1"
                                    />
                                    <input
                                        type="text"
                                        name="gender"
                                        value={userData.gender}
                                        onChange={handleInputChange}
                                        className="border rounded-md px-2 py-1"
                                    />
                                </div>
                            ) : (
                                `${userData.birthDate} - ${userData.gender}`
                            )}
                        </dd>
                    </div>

                    {/* Telefon Numarası */}
                    <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                        <dt className="flex-none">
                            <span className="sr-only">Telefon Numarası</span>
                            <PhoneIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                        </dt>
                        <dd className="text-sm leading-6 text-gray-500">
                            {editMode ? (
                                <input
                                    type="text"
                                    name="phone"
                                    value={userData.phone}
                                    onChange={handleInputChange}
                                    className="border rounded-md px-2 py-1"
                                />
                            ) : (
                                userData.phone
                            )}
                        </dd>
                    </div>

                    {/* İlgi Alanları */}
                    <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                        <dt className="flex-none">
                            <span className="sr-only">İlgi Alanları</span>
                            <TagIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                        </dt>
                        <dd className="text-sm leading-6 text-gray-500">
                            {editMode ? (
                                <input
                                    type="text"
                                    name="interests"
                                    value={userData.interests}
                                    onChange={handleInputChange}
                                    className="border rounded-md px-2 py-1"
                                />
                            ) : (
                                userData.interests
                            )}
                        </dd>
                    </div>

                    {/* Email ve Şifre */}
                    <div className="mt-4 mb-4 flex w-full flex-none gap-x-4 px-6">
                        <dt className="flex-none">
                            <span className="sr-only">Email ve Şifre</span>
                            <EnvelopeIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                        </dt>
                        <dd className="text-sm leading-6 text-gray-500">
                            {editMode && showSecurityButton ? (
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleInputChange}
                                        className="border rounded-md px-2 py-1"
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        value={userData.password}
                                        onChange={handleInputChange}
                                        className="border rounded-md px-2 py-1"
                                    />
                                </div>
                            ) : (
                                <>
                                    <span>{userData.email}</span> - <span>{userData.password}</span>
                                    {editMode && (
                                        <button
                                            onClick={handleSecurityButtonClick}
                                            className="ml-2 rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-600 ring-1 ring-inset ring-yellow-600/20 hover:bg-yellow-100"
                                        >
                                            Değiştir
                                        </button>
                                    )}
                                </>
                            )}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>)
}