import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { categorySlug } from './app/helpers/categorySlug';

// Legacy capitalised URLs -> lowercase canonical (matched on the first path segment, so /Career/mentor etc. follow)
const CASE_REDIRECTS: Record<string, string> = {
  '/Career': '/career',
  '/Successstories': '/successstories',
  '/Lost-password': '/lost-password',
  '/Reset-password': '/reset-password',
};

const LEGACY_FAQ_REDIRECTS: Record<string, string> = {
  '/Faqs/program': '/faq',
  '/Faqs/admissions': '/faq',
  '/Faqs/fee-scholarships': '/faq',
  '/Faq': '/faq',
  '/Faqs': '/faq',
  '/Faqs/program-pre-requisites': '/faq',
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === '/faq') {
    return NextResponse.next();
  }

  // Normalize path without trailing slash for exact matching
  const normalizedPath = pathname.length > 1 && pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname;

  const faqRedirect = LEGACY_FAQ_REDIRECTS[normalizedPath];
  if (faqRedirect && faqRedirect !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = faqRedirect;
    return NextResponse.redirect(url, 301);
  }
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
    const cleanRest = rest.filter(Boolean);
    url.pathname = cleanRest.length ? `${target}/${cleanRest.join('/')}` : target;
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/Career',
    '/Career/:path*',
    '/Successstories',
    '/Successstories/:path*',
    '/course/:category',
    '/Lost-password',
    '/Lost-password/:path*',
    '/Reset-password',
    '/Reset-password/:path*',
    '/Faq',
    '/Faq/:path*',
    '/Faqs',
    '/Faqs/:path*',
  ],
};
