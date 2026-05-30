import { ButtonHTMLAttributes } from 'react';

import { LucideIcon } from 'lucide-react';

import { Button } from '@/shared/shadcn/components/ui/button';
import { cn } from '@/shared/shadcn/lib/utils';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: LucideIcon;
  className?: string;
}

export default function CheckListUtilButton({
  text,
  icon,
  className,
  ...props
}: Props) {
  const Icon = icon;

  return (
    <Button
      variant={'outline'}
      size={'sm'}
      className={cn(
        'bg-surface h-8 gap-1 rounded-sm px-1.5 text-xs md:h-8 md:gap-2 md:px-2 md:text-xs',
        className
      )}
      {...props}
    >
      {Icon && <Icon className='size-4 md:size-4.5' />}
      {text}
    </Button>
  );
}
