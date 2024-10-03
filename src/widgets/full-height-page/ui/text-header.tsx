interface Props {
  title: string;
}

export const TextHeader = (props: Props) => {
  const { title } = props;

  return (
    <header className="flex h-[54px] items-center justify-start px-4">
      <span className="subTitle1 text-gray-900">{title}</span>
    </header>
  );
};
