interface FullHeightPageProps {
  children: React.ReactNode;
}

export default function FullHeightPage({ children }: FullHeightPageProps) {
  return <div className="relative h-full flex flex-col">{children}</div>;
}
