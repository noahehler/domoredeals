import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect /admin routes with HTTP Basic Auth
  if (pathname.startsWith('/admin')) {
    const auth = request.headers.get('authorization')

    if (!auth || !auth.startsWith('Basic ')) {
      return new NextResponse(null, {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="DoMoreDeals Admin"' },
      })
    }

    const decoded = atob(auth.slice(6))
    const colonIdx = decoded.indexOf(':')
    const password = colonIdx >= 0 ? decoded.slice(colonIdx + 1) : ''

    if (password !== process.env.ADMIN_PASSWORD) {
      return new NextResponse(null, {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="DoMoreDeals Admin"' },
      })
    }
  }

  // Protect /api/cron routes — Vercel sends Authorization: Bearer <CRON_SECRET>
  if (pathname.startsWith('/api/cron')) {
    const cronSecret = process.env.CRON_SECRET
    if (cronSecret) {
      const auth = request.headers.get('authorization')
      if (auth !== `Bearer ${cronSecret}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/cron/:path*'],
}
