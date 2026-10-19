import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const CASE_REDIRECTS: Record<string, string> = {
  '/faq': '/Faq',
  '/career': '/Career',
  '/successstories': '/Successstories',
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const target = CASE_REDIRECTS[pathname];
  if (target) {
    const url = request.nextUrl.clone();
    url.pathname = target;
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/faq', '/career', '/successstories'],
};
