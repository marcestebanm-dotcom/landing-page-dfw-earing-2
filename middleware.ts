import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const { pathname } = request.nextUrl

  // Ignore static assets, api routes, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Check if accessing via halloween subdomain (e.g. halloween.localhost:3000, halloween.dfwearing.com)
  const isHalloweenSubdomain = host.startsWith('halloween.')

  if (isHalloweenSubdomain) {
    // If not already on /halloween route, rewrite internally to /halloween
    if (!pathname.startsWith('/halloween')) {
      const url = request.nextUrl.clone()
      url.pathname = `/halloween${pathname === '/' ? '' : pathname}`
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
