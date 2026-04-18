import { InputHTMLAttributes, ReactNode } from 'react';

import { Info, TriangleAlert } from 'lucide-react';

import { Field, FieldLabel } from '@/shared/shadcn/components/ui/field';
import { Input } from '@/shared/shadcn/components/ui/input';
import { cn } from '@/shared/shadcn/lib/utils';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  required?: boolean;
  children?: ReactNode;
  errorMsg?: string;
  className?: string;
}

export function LabelInputField({
  title,
  required = false,
  children,
  errorMsg,
  className,
  ...props
}: Props) {
  return (
    <Field className={className}>
      <FieldLabel className='font-normal'>
        {title}
        {required && <span className='text-error-text'>*</span>}
      </FieldLabel>

      {children ? (
        children
      ) : (
        <Input
          className={cn('text-sm', errorMsg && 'border-error-border')}
          {...props}
        />
      )}

      {errorMsg && (
        <p className='text-error-text flex items-center gap-1 text-sm'>
          <TriangleAlert className='size-5' />
          {errorMsg}
        </p>
      )}
    </Field>
  );
}
