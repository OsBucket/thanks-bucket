'use client';

import { FC } from 'react';
import Link from 'next/link';
import { Button } from '@/presentation/components/ui';
import MainLogo from '@/presentation/components/common/main-logo';

const Login: FC = () => {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization`;
  const providers = [
    { name: 'Google', href: `${baseUrl}/google` },
    { name: 'Naver', href: `${baseUrl}/naver` },
    { name: 'Kakao', href: `${baseUrl}/kakao` }
  ];

  return (
    <div>
      <div className="flex justify-center mt-20">
        <MainLogo />
      </div>
      <div className="mt-5 text-center mb-8">
        <p className="body1">꿈꾸는 것, 도전하고 싶은 것</p>
        <p className="body2Strong">하나씩 이뤄가는 누군가의 버킷리스트</p>
      </div>
      <div className="flex flex-col gap-4 px-8">
        {providers.map((provider) => (
          <Link key={provider.name} href={provider.href}>
            <Button className="w-full">{provider.name}</Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Login;
