import { InputHTMLAttributes } from 'react';

import { Input } from '@/shared/shadcn/components/ui/input';
import { cn } from '@/shared/shadcn/lib/utils';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: 'default' | 'sm';
  errorMsg?: string;
  className?: string;
}

export default function FormCommonInput({
  inputSize = 'default',
  errorMsg,
  className,
  ...props
}: Props) {
  return (
    <Input
      className={cn(
        'bg-surface text-sm',
        inputSize === 'sm' && 'h-8 rounded-sm px-2 text-[13px] md:h-8',
        errorMsg && 'border-error-border',
        className
      )}
      {...props}
    />
  );
}
