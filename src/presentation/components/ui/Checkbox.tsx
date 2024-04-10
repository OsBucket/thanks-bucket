import { FC } from 'react';

interface CheckboxProps {
  id?: string;
  label?: string;
  textClass?: string;
  onChange?: (id: string, checked: boolean) => void;
  checked?: boolean;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
}

const Checkbox: FC<CheckboxProps> = ({ id, label, textClass = 'body1', checked, onChange, onClick }) => {
  return (
    <>
      <label htmlFor={id} className="flex items-center cursor-pointer">
        <input
          id={id}
          onClick={onClick}
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            const id = e.target.id;
            const checked = e.target.checked;
            onChange && onChange(id, checked);
          }}
          style={{
            backgroundImage: `${checked ? `url('/images/icons/check-on.svg')` : ''}`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
          className="w-[20px] h-[20px] border border-gray-300 rounded-[4px] checked:bg-green-default appearance-none"
        />
        <span className={`${textClass} ml-2`}>{label}</span>
      </label>
    </>
  );
};

export default Checkbox;
