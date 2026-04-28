import { cn } from '@/shared/shadcn/lib/utils';

interface Props {
  is_domestic: boolean;
}

export default function TripScopeTag({ is_domestic }: Props) {
  return (
    <span
      className={cn(
        'flex items-center justify-center rounded-2xl border px-2 py-0.5 text-xs',
        is_domestic ? 'badge-domestic' : 'badge-international'
      )}
    >
      {is_domestic ? '국내' : '해외'}
    </span>
  );
}
