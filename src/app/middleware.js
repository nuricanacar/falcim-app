// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const authToken = request.cookies.get('authToken')?.value;

  // Giriş yapmamış kullanıcıları giriş sayfasına yönlendir
  if (!authToken && request.nextUrl.pathname.startsWith('/api/falcilar')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Middleware'in uygulanacağı sayfaları belirle
export const config = {
  matcher: ['/api/falcilar'], // Sadece /api/falcilar rotasını koru
};