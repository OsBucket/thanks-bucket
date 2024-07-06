import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { MemberRole } from './libs/core/base';
import { fetchProfile } from './services/user';

export default async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/auth/success') {
    return AuthSuccessReponse(request);
  }
  if (publicPages.includes(request.nextUrl.pathname)) {
    return PublicPageReponse(request);
  }
  if (request.nextUrl.pathname.includes('/buckets')) {
    return PrivatePageResponse(request);
  }

  return NextResponse.next();
}

async function AuthSuccessReponse(request: NextRequest) {
  const access_token = request.nextUrl.searchParams.get('access_token');
  const url = request.nextUrl.clone();

  if (typeof access_token === 'string') {
    const fetchedResponse = await fetchProfile(access_token);
    if (fetchedResponse.ok) {
      const { data } = await fetchedResponse.json();
      if (data.memberRoles.includes(MemberRole.ROLE_USER)) {
        const response = NextResponse.redirect(`${url.origin}/buckets/${data.nickname}`);
        response.cookies.set('jwt', access_token);
        return response;
      } else if (data.memberRoles.includes(MemberRole.ROLE_GUEST)) {
        return NextResponse.redirect(`${url.origin}/auth/signup?access_token=${access_token}`);
      }
    } else {
      return NextResponse.redirect(`${url.origin}/auth/login`);
    }
  }
}

const publicPages = ['/', '/auth/login', '/auth/signup', '/welcome'];
async function PublicPageReponse(request: NextRequest) {
  const access_token = request.cookies.get('jwt')?.value;
  const url = request.nextUrl.clone();

  if (access_token !== undefined) {
    const res = await fetchProfile(access_token);
    if (res.ok) {
      const { data } = await res.json();
      url.pathname = `buckets/${data.nickname}`;
      return NextResponse.redirect(url.href);
    } else {
      const response = NextResponse.next();
      response.cookies.delete('jwt');
      return response;
    }
  } else {
    return NextResponse.next();
  }
}

async function PrivatePageResponse(request: NextRequest) {
  const access_token = request.cookies.get('jwt')?.value;
  const url = request.nextUrl.clone();

  if (access_token === undefined) {
    return NextResponse.redirect(`${url.origin}/auth/login`);
  } else {
    const res = await fetchProfile(access_token);
    if (res.ok) {
      return NextResponse.next();
    } else {
      const response = NextResponse.redirect(`${url.origin}/auth/login`);
      response.cookies.delete('jwt');
      return response;
    }
  }
}
