import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

// Define protected routes using regex to handle dynamic segments
const protectedRoutePatterns = [
  /^\/admin\/dashboard$/,
  /^\/admin$/,
  /^\/admin\/hero-slider(\/.*)?$/, // This protects /admin/hero-slider and any subroutes, e.g., /admin/hero-slider/[slide] or /admin/hero-slider/new
];

const publicRoutes = ['/admin/login', '/admin/signup'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  
  // Check if the current path matches any protected route pattern
  const isProtectedRoute = protectedRoutePatterns.some((pattern) =>
    pattern.test(path)
  );
  
  const isPublicRoute = publicRoutes.includes(path);

  const token: any = await getToken({ req, secret });

  // If the route is protected and the user is not authenticated, redirect to login
  if (isProtectedRoute && !token?.email) {
    return NextResponse.redirect(new URL('/admin/login', req.nextUrl));
  }

  // If the user is already authenticated and trying to access a public route, redirect to dashboard
  if (isPublicRoute && token?.email) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}

// Define routes to be excluded from the middleware
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
