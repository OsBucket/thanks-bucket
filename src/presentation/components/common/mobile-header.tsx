interface MobileHeaderProps {
  title?: React.ReactNode;
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
}

export default function MobileHeader({ title, headerLeft, headerRight }: MobileHeaderProps) {
  return (
    <header className="fixed h-[54px] w-full flex items-center justify-center bg-white z-10">
      {headerLeft && <Side placement="left">{headerLeft}</Side>}
      {title && <div className="body2Strong text-gray-900">{title}</div>}
      {headerRight && <Side placement="right">{headerRight}</Side>}
    </header>
  );
}

const Side = ({ placement = 'left', children }: { children: React.ReactNode; placement?: 'left' | 'right' }) => {
  const position = { left: 'left-4', right: 'right-4' } as const;

  return <div className={`absolute top-0 ${position[placement]} flex h-full items-center`}>{children}</div>;
};
