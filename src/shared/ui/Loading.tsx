import { cn } from '@/shared/shadcn/lib/utils';

interface Props {
  className?: string;
}

export default function Loading({ className }: Props) {
  return (
    <div
      className={cn(
        'border-inactive-border h-6 w-6 animate-spin rounded-full border-4 border-t-transparent',
        className
      )}
    />
  );
}
