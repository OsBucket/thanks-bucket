import { LoadBucketTemplateList } from '@/domain/usecases';
import { makeRemoteLoadBucketTemplateList } from '@/main/factories/usecases';
import { Divider } from '@/presentation/components/ui';
import { useSuspenseQuery } from '@tanstack/react-query';

interface BucketTemplatesProps {
  bucketName: string;
  onSelect: (bucketTemplate: LoadBucketTemplateList.Model) => void;
}

const BucketTemplates = ({ bucketName, onSelect }: BucketTemplatesProps) => {
  const { data: bucketTemplates } = useSuspenseQuery({
    queryKey: ['bucket-templates', bucketName],
    queryFn: () => makeRemoteLoadBucketTemplateList().load({ bucketName })
  });

  return (
    <ul>
      {bucketTemplates.map((bucketTemplate) => (
        <li key={bucketTemplate.id} onClick={() => onSelect(bucketTemplate)}>
          <div className="flex items-center h-[54px] body2">{bucketTemplate.bucketName}</div>
          <Divider />
        </li>
      ))}
    </ul>
  );
};

export default BucketTemplates;
