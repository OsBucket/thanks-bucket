import { getOccupations } from '@/services/bucket';
import { useQuery } from '@tanstack/react-query';
import React, { forwardRef } from 'react';

interface OccupationSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  selectedOccupation?: string;
}

const OccupationSelect = forwardRef<HTMLSelectElement, OccupationSelectProps>(
  ({ selectedOccupation, ...props }, ref) => {
    const { data: occupations } = useQuery({
      queryKey: ['occupations'],
      queryFn: getOccupations
    });

    return (
      <select
        className={`w-full bg-white h-12 rounded-5xl py-[5px] appearance-none px-4 focus:outline-none border-2 border-text-gray-400
      ${!selectedOccupation ? 'text-gray-400' : ''}
      `}
        ref={ref}
        {...props}
      >
        <option value="">직무</option>
        {occupations?.map((occupation) => {
          return (
            <option className="text-black" key={occupation.id} value={occupation.id}>
              {occupation.name}
            </option>
          );
        })}
      </select>
    );
  }
);

OccupationSelect.displayName = 'OccupationSelect';

export default OccupationSelect;
