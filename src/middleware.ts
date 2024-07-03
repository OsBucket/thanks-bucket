import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { baseClientEnv } from './libs/core/base/baseEnv';
import { MemberRole } from './services/user';

const publicPages = ['/', '/auth/login', '/auth/signup', '/welcome'];

const fetchProfile = (accessToken: string) => {
  return fetch(`${baseClientEnv.serverAPIUri}/auth/profile`, {
    headers: { Authorization: accessToken }
  });
};

export default async function middleware(request: NextRequest) {
  let response = NextResponse.next();

  if (request.nextUrl.pathname === '/auth/success') {
    const access_token = request.nextUrl.searchParams.get('access_token');

    if (typeof access_token === 'string') {
      const res = await fetchProfile(access_token);
      if (res.ok) {
        const { data } = await res.json();
        if (data.memberRoles.includes(MemberRole.ROLE_USER)) {
          response.cookies.set('jwt', access_token);
        }
      } else {
        const url = request.nextUrl.clone();
        return NextResponse.redirect(`${url.origin}/auth/login`);
      }
    }
  }
  const access_token = request.cookies.get('jwt')?.value;
  if (publicPages.includes(request.nextUrl.pathname)) {
    if (typeof access_token === 'string') {
      const res = await fetchProfile(access_token);
      if (res.ok) {
        const { data } = await res.json();
        const url = request.nextUrl.clone();
        url.pathname = data.nickname;
        return NextResponse.redirect(url.href);
      } else {
        response.cookies.delete('jwt');
        return response;
      }
    }
  } else {
    if (typeof access_token === 'string') {
      const res = await fetchProfile(access_token);
      if (res.ok) {
        return response;
      } else {
        const url = request.nextUrl.clone();
        return NextResponse.redirect(`${url.origin}/auth/login`);
      }
    }
  }
  return response;
}
