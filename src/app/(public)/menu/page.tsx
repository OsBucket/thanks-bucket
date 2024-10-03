'use client';

import { FullHeightPage } from '@/widgets/full-height-page';
import { BottomNavigation } from '@/widgets/bottom-navigation';
import { TextHeader } from '@/widgets/full-height-page/ui/text-header';
import { Divider } from '@/shared/ui/Divider';
import Image from 'next/image';
import { getMe } from '@/entities/auth';
import { logout } from '@/services/user';
import { deleteCookie } from 'cookies-next';
import { Button } from '@/shared/ui/Button';
import { KAKAO_LOGIN_URL } from '@/features/login';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function MenuPage() {
  const router = useRouter();

  const me = getMe();

  const handleLogout = () => {
    logout();
    deleteCookie('jwt');
    window.location.href = '/';
  };

  const handleWelcome = () => {
    router.push('/invitations/new');
  };

  return (
    <>
      <FullHeightPage>
        <TextHeader title={'전체 메뉴'} />
        <main className="mb-[180px] w-full">
          {me === undefined ? (
            <>
              <div className="flex h-[72px] flex-1 items-center justify-center gap-2 px-4">
                <Button className="flex-1">
                  <Link href={KAKAO_LOGIN_URL}>
                    <span className="subTitle2">회원가입/로그인</span>
                  </Link>
                </Button>
              </div>
              <Divider className="h-2" />
            </>
          ) : (
            <></>
          )}
          <div className="flex h-[72px] flex-1 items-center justify-center gap-2 px-4">
            <Image width={28} height={28} src={'/images/icons/letter.svg'} alt={'letter'} />
            <div className="flex flex-1 flex-col items-start justify-center">
              <span className="body2Strong flex-1">친구에게 땡스버킷 알려주기</span>
              <span className="caption1 flex-1 text-gray-400">가족, 연인, 친구와 함께 버킷리스트를 이뤄봐요</span>
            </div>
            <Image width={24} height={24} src={'/images/icons/right-arrow.svg'} alt={'note'} onClick={handleWelcome} />
          </div>
          <Divider className="h-2" />
          <div className="flex h-[72px] flex-1 items-center justify-center gap-2 px-4">
            <Image width={28} height={28} src={'/images/icons/book.svg'} alt={'book'} />
            <p className="body2Strong flex-1">개인정보 처리방침</p>
            <Link href="https://brick-socks-7f1.notion.site/e4fe8a4f4e7f4c73bced530fbca340fc?pvs=4">
              <Image width={24} height={24} src={'/images/icons/right-arrow.svg'} alt={'note'} />
            </Link>
          </div>
          {me && (
            <div className="flex h-[72px] flex-1 items-center justify-center gap-2 px-4">
              <Image width={28} height={28} src={'/images/icons/logout.svg'} alt={'logout'} />
              <span className="body2Strong flex-1">로그아웃</span>
              <Image width={24} height={24} src={'/images/icons/right-arrow.svg'} alt={'note'} onClick={handleLogout} />
            </div>
          )}
        </main>
        <BottomNavigation />
      </FullHeightPage>
    </>
  );
}
