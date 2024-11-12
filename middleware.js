import { NextResponse } from 'next/server';
import { validateToken, getCurrentUser } from './app/api/auth/login/route';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Paths that don't require authentication
  const publicPaths = ['/login', '/register'];

  // Check if the current path is a public path
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Get the auth token from the cookies
  const token = request.cookies.get('auth-token');

  if (!token) {
    // If there's no token, redirect to the login page
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Validate the token
    const validToken = await validateToken(token.value);

    if (!validToken) {
      // If the token is invalid, redirect to the login page
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Get the current user from the token
    const user = await getCurrentUser(request);

    if (!user) {
      // If the user is not found, redirect to the login page
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Attach the user object to the request
    request.user = user;

    // Continue to the next middleware or route handler
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    // If there's an error, redirect to the login page
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes that don't need auth (e.g., login/register)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (e.g., images, css, js)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)',
  ],
};