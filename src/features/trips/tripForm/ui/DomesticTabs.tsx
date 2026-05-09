import { Button } from '@/shared/shadcn/components/ui/button';
import { cn } from '@/shared/shadcn/lib/utils';

const DomesticTabList = [
  {
    name: '국내',
    value: true,
  },
  {
    name: '해외',
    value: false,
  },
];

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function DomesticTabs({ value, onChange }: Props) {
  return (
    <div className='flex gap-2'>
      {DomesticTabList.map((tab) => (
        <Button
          type='button'
          variant={'outline'}
          className={cn('flex-1', value === tab.value && 'bg-active')}
          key={tab.name}
          onClick={() => onChange(tab.value)}
        >
          {tab.name}
        </Button>
      ))}
    </div>
  );
}
