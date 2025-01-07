"use client";
import { useAuth } from "./AuthContext"; // AuthContext'i kullan
import { useEffect, useState } from "react";
import LoginPage from './loginp'

export default function ProtectedPage({ children }) {
  const { isAuthenticated } = useAuth(); // Giriş durumu
  const [isPopupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    // Oturum kontrolü
    if (!isAuthenticated) {
      setPopupVisible(true);
    } else {
      setPopupVisible(false);
    }
  }, [isAuthenticated]);

  return (
    <div className="relative">
      {/* Sayfa içeriği */}
      <div className={`transition-all ${isPopupVisible ? "blur-sm" : ""}`}>
        {children}
      </div>

      {/* Popup */}
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-md">
            <h2 className="text-lg text-gray-700 font-bold mb-4">Giriş Yapmanız Gerekiyor</h2>
            <p className="mb-6 text-gray-700">
              Bu içeriği görüntülemek için lütfen giriş yapın.
            </p>
            <LoginPage />
          </div>
        </div>
      )}
    </div>
  );
}
