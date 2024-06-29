import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  let response = NextResponse.next();

  if (request.nextUrl.pathname === '/auth/success') {
    const access_token = request.nextUrl.searchParams.get('access_token');
    if (access_token !== null) {
      response.cookies.set('jwt', access_token);
    }
  }

  return response;
}
