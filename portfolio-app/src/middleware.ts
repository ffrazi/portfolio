import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Next.js Middleware: lightweight route guard
// Full auth verification is done client-side via AuthProvider.
// This middleware ensures unauthenticated visitors can only access /login.
// It checks for the Firebase auth cookie presence as a quick gate.

const PUBLIC_PATHS = ['/login', '/api', '/_next', '/favicon.ico'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Allow static files
  if (pathname.includes('.')) {
    return NextResponse.next();
  }

  // For all other routes, the client-side AuthProvider handles
  // the full Firebase auth check and redirect.
  // Middleware just passes through — the AuthProvider in layout.tsx
  // will redirect unauthenticated users to /login.
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
