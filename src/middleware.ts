import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { baseClientEnv } from './libs/core/base/baseEnv';

const publicPages = ['/', '/auth/login', '/auth/signup'];

export default async function middleware(request: NextRequest) {
  let response = NextResponse.next();

  if (request.nextUrl.pathname === '/auth/success') {
    const access_token = request.nextUrl.searchParams.get('access_token');
    if (typeof access_token === 'string') {
      response.cookies.set('jwt', access_token);
    }
  }
  if (publicPages.includes(request.nextUrl.pathname)) {
    const access_token = request.cookies.get('jwt')?.value;

    if (typeof access_token === 'string') {
      const response = await fetch(`${baseClientEnv.serverAPIUri}/auth/profile`, {
        headers: { Authorization: access_token }
      });
      if (response.ok) {
        const { data } = await response.json();
        const url = request.nextUrl.clone();
        url.pathname = data.nickname;
        return NextResponse.redirect(url.href);
      }
    }
  }

  return response;
}
