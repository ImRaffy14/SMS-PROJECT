import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = path === '/login'
  
  // Check for auth cookie
  const authCookie = request.cookies.get('school-app-user')?.value
  
  if (!isPublicPath && !authCookie) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
  
  if (isPublicPath && authCookie) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/announcements',
    '/communications',
    '/grades',
    '/payments',
    '/subjects',
    '/login'
  ]
}