import { BucketTemplate, getBucketTemplates } from '@/services/bucket';
import { Divider } from '@/shared/ui/Divider';
import { useSuspenseQuery } from '@tanstack/react-query';

interface BucketTemplatesProps {
  onSelect: (bucketTemplate: BucketTemplate) => void;
}

const BucketTemplates = ({ onSelect }: BucketTemplatesProps) => {
  const { data: bucketTemplates } = useSuspenseQuery({
    queryKey: ['bucket-templates'],
    queryFn: getBucketTemplates
  });

  return (
    <ul>
      {bucketTemplates.map((bucketTemplate) => (
        <li key={bucketTemplate.id} onClick={() => onSelect(bucketTemplate)}>
          <div className="body2 flex h-[54px] cursor-pointer items-center">{bucketTemplate.bucketName}</div>
          <Divider />
        </li>
      ))}
    </ul>
  );
};

export default BucketTemplates;
