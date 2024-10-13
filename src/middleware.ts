import { NextRequest, NextResponse } from 'next/server';

// Define protected routes using regex to handle dynamic segments
const protectedRoutePatterns = [
  '/customer/account',
  '/customer/account/edit',
  '/sales/order/history',
  '/customer/address'
];

const publicRoutes = ['/customer/account/create'];

export default async function middleware(req: NextRequest) {

  const path = req.nextUrl.pathname;

  const isProtectedRoute = await protectedRoutePatterns.some((pattern) =>
    path.startsWith(pattern)
  );

  // Check if the current path is a public route
  const isPublicRoute = await publicRoutes.includes(path);

  const token: any = await req.cookies.get('customerToken')?.value;
  console.log('token',token);
  console.log('path',path);
  console.log('isProtectedRoute',isProtectedRoute);
  console.log('isPublicRoute',isPublicRoute);
  // If the route is protected and the user is not authenticated, redirect to login
  // if (isProtectedRoute && !token) {
  //   return NextResponse.redirect(new URL('/customer/account/create', req.nextUrl));
  // }

  // // If the user is already authenticated and trying to access a public route, redirect to dashboard
  // if (isPublicRoute && !token) {
  //   return NextResponse.redirect(new URL('/customer/account', req.nextUrl));
  // }

  return NextResponse.next();
}

// Define routes to be excluded from the middleware
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
