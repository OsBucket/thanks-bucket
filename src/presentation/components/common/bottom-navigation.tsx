'use client';

import * as React from 'react';
import Link from 'next/link';
import { Feed, Menu, Star } from './vectors';

const BottomNavigation = () => {
  return (
    <footer className="fixed bottom-0 left-0 h-[54px] w-full border-t bg-white border-gray-200">
      <ul className="flex h-full">
        <NavigationItem to="/" icon="home" text="내 버킷" />
        <NavigationItem to="/" icon="feed" text="버킷 피드" />
        <NavigationItem to="/" icon="menu" text="메뉴" />
      </ul>
    </footer>
  );
};

const iconMap = {
  menu: Menu,
  feed: Feed,
  home: Star
} as const;

interface NavigationItemProps {
  text: string;
  icon: keyof typeof iconMap;
  to: string;
}

const NavigationItem = ({ to, text, icon }: NavigationItemProps) => {
  const iconElement = React.createElement(iconMap[icon]);

  return (
    <li className="flex-1">
      <Link href={to} className="flex flex-col justify-center items-center h-full">
        {iconElement}
        <p className="mt-1 text-[10px]">{text}</p>
      </Link>
    </li>
  );
};

export default BottomNavigation;
