interface MobileHeaderProps {
  title: React.ReactNode;
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
}

export default function MobileHeader({ title, headerLeft, headerRight }: MobileHeaderProps) {
  return (
    <header className="fixed z-10 flex h-[54px] w-full items-center justify-between bg-white px-2">
      <Side>{headerLeft && headerLeft}</Side>
      <div className="body2Strong text-gray-900">{title}</div>
      <Side>{headerRight && headerRight}</Side>
    </header>
  );
}

const Side = ({ children }: { children: React.ReactNode }) => {
  return <div className={`flex h-9 w-9 items-center justify-center`}>{children}</div>;
};
