'use client';

import * as React from 'react';
import { NavigationItem } from './NavigationItem';
import { MenuIcon } from './icon/MenuIcon';
import { MyBucketIcon } from './icon/MyBucketIcon';
import { FeedIcon } from './icon/FeedIcon';

export const BottomNavigation = () => {
  return (
    <footer className="fixed bottom-0 left-0 h-[54px] w-full border-t border-gray-200 bg-white">
      <ul className="flex h-full">
        <NavigationItem to="/" icon={<MyBucketIcon />} text="내 버킷" />
        <NavigationItem to="/" icon={<FeedIcon />} text="버킷 피드" />
        <NavigationItem to="/menu" icon={<MenuIcon />} text="메뉴" />
      </ul>
    </footer>
  );
};
