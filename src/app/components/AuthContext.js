"use client"
// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Kullanıcı bilgisi
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Oturum durumu

  // Kullanıcı giriş yaptığında çağrılır
  const login = (userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('authToken', token); // Token'ı localStorage'a kaydet
    localStorage.setItem('user', JSON.stringify(userData)); // Kullanıcı bilgisini localStorage'a kaydet
  };

  // Kullanıcı çıkış yaptığında çağrılır
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken'); // Token'ı localStorage'dan sil
    localStorage.removeItem('user'); // Kullanıcı bilgisini localStorage'dan sil
  };

  // Sayfa yenilendiğinde kullanıcı bilgisini localStorage'dan yükle
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);