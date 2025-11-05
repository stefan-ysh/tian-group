import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Since we're using cookie-based locale detection in i18n/request.ts,
  // we don't need to handle locale routing in middleware
  // Just pass through all requests
  return NextResponse.next();
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
