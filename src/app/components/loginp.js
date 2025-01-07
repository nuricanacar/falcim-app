import { useState } from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useAuth } from '../components/AuthContext'; // AuthContext'i import et

export default function LoginSignup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [initialClickInside, setInitialClickInside] = useState(false);

  const { login } = useAuth(); // AuthContext'ten login fonksiyonunu al

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin ? "/api/auth/login" : "/api/auth/register";

    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          isFortuneTeller: formData.role === "falcı",
        };

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Şifreler eşleşmiyor");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Bir hata oluştu");
      } else {
        setError("");

        if (!isLogin) {
          // Kullanıcı kayıt olduysa, otomatik giriş yap
          const loginResponse = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
            }),
          });

          const loginData = await loginResponse.json();

          if (!loginResponse.ok) {
            setError(loginData.error || "Otomatik giriş başarısız oldu");
          } else {
            // AuthContext üzerinden giriş yap
            login(loginData.user, loginData.token); // Kullanıcı bilgisi ve token'ı gönder
            setIsOpen(false);
          }
        } else {
          // Doğrudan giriş yap
          login(data.user, data.token); // Kullanıcı bilgisi ve token'ı gönder
          setIsOpen(false);
        }

        // Formu sıfırla
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "",
        });
      }
    } catch (error) {
      console.error("Hata:", error);
      setError("Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleMouseDown = (e) => {
    const isInsideModal = e.target.closest(".modal-content");
    setInitialClickInside(!!isInsideModal);
  };

  const handleMouseUp = (e) => {
    const isInsideModal = e.target.closest(".modal-content");
    if (!initialClickInside && !isInsideModal) {
      setIsOpen(false);
    }
  };

  return (
    <div onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      <div className="flex-shrink-0">
        <button
          onClick={() => setIsOpen(true)}
          type="button"
          className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <QuestionMarkCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Giriş Yap / Kaydol
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="modal-content bg-white rounded-lg shadow-xl p-8 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="loader border-t-4 border-indigo-600 rounded-full w-12 h-12 animate-spin"></div>
                <p className="ml-4 text-indigo-600">Yükleniyor...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Ad
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required={!isLogin}
                        minLength={2}
                        maxLength={50}
                        className="px-2 mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black bg-white"
                      />
                    </div>

                    <div className="flex-1">
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Soyad
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required={!isLogin}
                        minLength={2}
                        maxLength={50}
                        className="px-2 mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black bg-white"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    minLength={5}
                    maxLength={150}
                    className="px-2 mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black bg-white"
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Şifre
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    minLength={8}
                    maxLength={255}
                    className="px-2 mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black bg-white pr-10"
                  />
                  <button
                    type="button"
                    className="absolute top-10 transform -translate-y-1/4 right-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>

                {!isLogin && (
                  <>
                    <div className="relative">
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Şifreyi Onayla
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="px-2 mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black bg-white pr-10"
                      />
                      <button
                        type="button"
                        className="absolute top-10 transform -translate-y-1/4 right-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                    </div>

                    <div>
                      <label
                        htmlFor="role"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Rol Seçimi
                      </label>
                      <select
                        name="role"
                        id="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black bg-white"
                      >
                        <option value="">Lütfen bir rol seçin</option>
                        <option value="falcı">Falcı</option>
                        <option value="müşteri">Müşteri</option>
                      </select>
                    </div>
                  </>
                )}

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {isLogin ? "Giriş Yap" : "Kayıt Ol"}
                  </button>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    {isLogin
                      ? "Hesabınız yok mu? Kayıt olun"
                      : "Zaten hesabınız var mı? Giriş yapın"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}