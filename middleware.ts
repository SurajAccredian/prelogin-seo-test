import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { categorySlug } from './app/helpers/categorySlug';

// Legacy capitalised URLs -> lowercase canonical (matched on the first path segment, so /Career/mentor etc. follow)
const CASE_REDIRECTS: Record<string, string> = {
  '/Career': '/career',
  '/Successstories': '/successstories',
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // /course/<slug>: send case/"&" variants (e.g. CXO-Leadership, strategy-&-leadership) to the canonical slug
  if (pathname.startsWith('/course/')) {
    const segment = pathname.slice('/course/'.length);
    if (segment && !segment.includes('/')) {
      let decoded = segment;
      try {
        decoded = decodeURIComponent(segment);
      } catch {}
      const canonical = categorySlug(decoded);
      if (canonical !== segment) {
        const url = request.nextUrl.clone();
        url.pathname = `/course/${canonical}`;
        return NextResponse.redirect(url, 308);
      }
    }
    return NextResponse.next();
  }

  const [, first, ...rest] = pathname.split('/');
  const target = CASE_REDIRECTS[`/${first}`];
  if (target) {
    const url = request.nextUrl.clone();
    url.pathname = [target, ...rest].join('/');
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/Career/:path*', '/Successstories', '/course/:category'],
};
