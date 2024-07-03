import { Divider } from '@/presentation/components/common';
import { BucketTemplate, getBucketTemplates } from '@/services/bucket';
import { useSuspenseQuery } from '@tanstack/react-query';

interface BucketTemplatesProps {
  onSelect: (bucketTemplate: BucketTemplate) => void;
}

const BucketTemplates = ({ onSelect }: BucketTemplatesProps) => {
  const { data: bucketTemplates } = useSuspenseQuery({
    queryKey: ['bucket-templates'],
    queryFn: () => getBucketTemplates()
  });

  return (
    <ul>
      {bucketTemplates.map((bucketTemplate) => (
        <li key={bucketTemplate.id} onClick={() => onSelect(bucketTemplate)}>
          <div className="flex items-center h-[54px] body2 cursor-pointer">{bucketTemplate.bucketName}</div>
          <Divider />
        </li>
      ))}
    </ul>
  );
};

export default BucketTemplates;
