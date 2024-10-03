import * as React from 'react';
import Link from 'next/link';

interface NavigationItemProps {
  text: string;
  icon: React.ReactNode;
  to: string;
}

export const NavigationItem = ({ to, text, icon }: NavigationItemProps) => {
  return (
    <li className="flex-1">
      <Link href={to} className="flex flex-col justify-center items-center h-full">
        {icon}
        <p className="mt-1 text-[10px]">{text}</p>
      </Link>
    </li>
  );
};