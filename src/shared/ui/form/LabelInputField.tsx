import { InputHTMLAttributes, ReactNode } from 'react';

import { TriangleAlert } from 'lucide-react';

import {
  Field,
  FieldDescription,
  FieldLabel,
} from '@/shared/shadcn/components/ui/field';
import { Input } from '@/shared/shadcn/components/ui/input';
import { cn } from '@/shared/shadcn/lib/utils';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  desc?: string;
  required?: boolean;
  children?: ReactNode;
  errorMsg?: string;
  className?: string;
}

export function LabelInputField({
  title,
  desc,
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

      <div className='field-body flex flex-col gap-2'>
        {children ? (
          children
        ) : (
          <Input
            className={cn(
              'bg-surface text-sm',
              errorMsg && 'border-error-border'
            )}
            {...props}
          />
        )}
        {desc && (
          <FieldDescription className='text-[13px]'>{desc}</FieldDescription>
        )}

        {errorMsg && (
          <p className='text-error-text flex items-start gap-1 text-sm'>
            <TriangleAlert className='size-5 shrink-0' />
            {errorMsg}
          </p>
        )}
      </div>
    </Field>
  );
}
