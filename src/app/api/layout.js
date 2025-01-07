"use client"
import ProtectedPage from "../components/ProtectedPage"; // ProtectedPage bileşenini içe aktar
import { usePathname } from "next/navigation"; // Aktif yolu almak için

const protectedRoutes = ["/api/falcilar","/api/ilanlar","/api/siparis","/api/profil"]; // Koruma gereken yolları burada belirtiyoruz

export default function ApiLayout({ children }) {
  const pathname = usePathname(); // Şu anki yolun adını al

  const isProtected = protectedRoutes.includes(pathname); // Şu anki yol koruma gerektiriyor mu?

  return isProtected ? (
    <ProtectedPage>{children}</ProtectedPage> // Koruma mekanizmasını uygula
  ) : (
    <>{children}</> // Koruma gerekmiyorsa direkt içeriği göster
  );
}
