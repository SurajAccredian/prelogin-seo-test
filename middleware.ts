import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { categorySlug } from './app/helpers/categorySlug';

// Legacy structural redirects: maps old URL structures to new destinations (301)
const LEGACY_STRUCTURAL_REDIRECTS: Record<string, string> = {
  '/terms/refund': '/refund-policies/accredian-policy',
  '/explore-programs': '/programs',
  '/chief-technology-officer-program': '/programs/chief-technology-officer-programme',
  '/programs/chief-technology-officer-program': '/programs/chief-technology-officer-programme',
  '/iiml-chief-digital-and-ai-officer-programme-the-cdaio-program': '/programs/iiml-chief-digital-ai-officer-programme-the-cdaio-program',
  '/programs/iiml-chief-digital-and-ai-officer-programme-the-cdaio-program': '/programs/iiml-chief-digital-ai-officer-programme-the-cdaio-program',
  '/pg-certificate-in-chief-digital-and-ai-officer-program': '/programs/pg-certificate-program-in-chief-digital-and-ai-officer-program',
  '/programs/pg-certificate-in-chief-digital-and-ai-officer-program': '/programs/pg-certificate-program-in-chief-digital-and-ai-officer-program',
  '/pg-certificate-program-in-chief-digital-and-ai-officer-program': '/programs/pg-certificate-program-in-chief-digital-and-ai-officer-program',
  '/executive-program-strategic-hr-leadership': '/programs/executive-program-in-strategic-hr-leadership',
  '/programs/executive-program-strategic-hr-leadership': '/programs/executive-program-in-strategic-hr-leadership',
  '/generative-ai-for-leaders': '/programs/executive-program-in-generative-ai-for-leaders',
  '/programs/generative-ai-for-leaders': '/programs/executive-program-in-generative-ai-for-leaders',
  '/iimr-executive-program-in-leadership-with-ai': '/programs/iim-ranchi-executive-program-in-leadership-with-ai',
  '/programs/iimr-executive-program-in-leadership-with-ai': '/programs/iim-ranchi-executive-program-in-leadership-with-ai',
  '/transform-business-workflows-with-generative-ai': '/free-courses/transform-business-workflows-with-generative-ai',
  '/programs/transform-business-workflows-with-generative-ai': '/free-courses/transform-business-workflows-with-generative-ai',
  '/programs/executive-program-in-strategy-leadership-innovation-in-ai-era-iimsirmaur': '/programs/iims-executive-programme-in-strategy-leadership-and-innovation-in-ai-era',
  '/programs/executive-program-in-leadership-with-ai-iim-sirmaur': '/programs/iims-executive-program-in-leadership-with-ai',
  '/programs/chief-marketing-growth-officer-program-inactive': '/programs',
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Exclude Next.js internals, API routes, and static files with extensions
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Exact lowercase match for /faq: early return to avoid redundant checks
  if (pathname === '/faq') {
    return NextResponse.next();
  }

  // Normalize path without trailing slash for exact lookup matching
  const normalizedPath = pathname.length > 1 && pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname;

  const lowerPath = normalizedPath.toLowerCase();

  // 2. Legacy FAQ redirects: any /faqs or /faqs/* -> /faq (301)
  if (lowerPath === '/faqs' || lowerPath.startsWith('/faqs/')) {
    const url = request.nextUrl.clone();
    url.pathname = '/faq';
    return NextResponse.redirect(url, 301);
  }

  // 3. Legacy structural redirects (e.g. /terms/refund -> /refund-policies/accredian-policy) (301)
  const legacyTarget = LEGACY_STRUCTURAL_REDIRECTS[lowerPath];
  if (legacyTarget && legacyTarget !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = legacyTarget;
    return NextResponse.redirect(url, 301);
  }

  // 4. Token-sensitive routes: /reset-password/:token and /course/payment/:token
  // The route prefix must be lowercase, but the Base64 token segment MUST preserve exact casing.
  if (pathname.startsWith('/reset-password/')) {
    return NextResponse.next();
  }
  if (/^\/reset-password\//i.test(pathname)) {
    const token = pathname.slice('/reset-password/'.length);
    const url = request.nextUrl.clone();
    url.pathname = `/reset-password/${token}`;
    return NextResponse.redirect(url, 308);
  }

  if (pathname.startsWith('/course/payment/')) {
    return NextResponse.next();
  }
  if (/^\/course\/payment\//i.test(pathname)) {
    const token = pathname.slice('/course/payment/'.length);
    const url = request.nextUrl.clone();
    url.pathname = `/course/payment/${token}`;
    return NextResponse.redirect(url, 308);
  }

  // 5. Course category canonicalization (/course/:category)
  if (lowerPath.startsWith('/course/')) {
    const segment = pathname.slice('/course/'.length);
    if (segment && !segment.includes('/')) {
      let decoded = segment;
      try {
        decoded = decodeURIComponent(segment);
      } catch { }
      const canonical = categorySlug(decoded);
      const target = `/course/${canonical}`;
      if (target !== pathname) {
        const url = request.nextUrl.clone();
        url.pathname = target;
        return NextResponse.redirect(url, 308);
      }
    }
  }

  // 6. Universal uppercase to lowercase normalization (308)
  if (/[A-Z]/.test(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - API routes (/api/*)
     * - Next.js internals (/_next/static/*, /_next/image/*)
     * - Metadata files (favicon.ico, robots.txt, sitemap.xml)
     * - Static asset files with file extensions
     */
    '/((?!api|_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|txt|xml|json|pdf|css|js|woff|woff2|ttf|eot)$).*)',
  ],
};
