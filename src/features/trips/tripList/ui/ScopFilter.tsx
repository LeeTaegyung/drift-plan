import { Button } from '@/shared/shadcn/components/ui/button';
import { cn } from '@/shared/shadcn/lib/utils';

const TRIP_SCOPE_TYPE = [
  { value: 'all', text: '전체' },
  { value: 'domestic', text: '국내' },
  { value: 'international', text: '해외' },
];

interface Props {
  selectScope: string;
  setSelectScope: (value: string) => void;
}

export default function ScopFilter({ selectScope, setSelectScope }: Props) {
  return (
    <div className='bg-surface flex max-w-50 items-center gap-2 rounded-sm p-1.5 px-2'>
      {TRIP_SCOPE_TYPE.map((region) => (
        <Button
          key={region.value}
          variant='outline'
          className={cn(
            'border-dp-accent-soft text-text-secondary h-8 flex-1 rounded-sm text-xs font-normal md:text-sm',
            region.value === selectScope &&
              'border-dp-accent! text-surface! bg-dp-accent! font-semibold'
          )}
          onClick={() => setSelectScope(region.value)}
        >
          {region.text}
        </Button>
      ))}
    </div>
  );
}
