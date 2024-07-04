import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken');

  const url = request.nextUrl.clone();
  const publicPaths = ['/', '/login', '/signup'];
  const isPublicPath = publicPaths.includes(url.pathname);

  if (!token && !isPublicPath) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (token && isPublicPath) {
    url.pathname = '/mydashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/mydashboard', '/dashboard', '/mypage', '/login', '/signup'],
};
