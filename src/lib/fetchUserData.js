"use client"
export const fetchUserData = async (userId) => {
    try {
      const url = `/api/auth/userData?userId=${userId}`; // Kullanıcı ID'sini query parametresi olarak ekleyin
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Kullanıcı verileri getirilemedi");
      }
  
      const data = await response.json();
      return data.user; // Kullanıcı verilerini döndür
    } catch (error) {
      console.error("Hata:", error.message);
      throw error;
    }
  };