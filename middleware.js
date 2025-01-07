// middleware.js

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Korunacak rotaları belirleyin (örneğin, /profile)
  const protectedRoutes = ["/profile"];

  // Eğer istek korunan bir rotaya ise
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = req.cookies.token;

    if (!token) {
      // Token yoksa giriş sayfasına yönlendir
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    try {
      // Token'ı doğrula
      jwt.verify(token, process.env.JWT_SECRET);
      // Token geçerliyse, isteğe devam et
      return NextResponse.next();
    } catch (err) {
      // Token geçersizse, giriş sayfasına yönlendir
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // Diğer istekler için müdahale etme
  return NextResponse.next();
}
