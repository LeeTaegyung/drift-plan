import { InputHTMLAttributes, ReactNode } from 'react';

import { TriangleAlert } from 'lucide-react';

import {
  Field,
  FieldDescription,
  FieldLabel,
} from '@/shared/shadcn/components/ui/field';
import { cn } from '@/shared/shadcn/lib/utils';
import FormCommonInput from '@/shared/ui/form/FormCommonInput';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  desc?: string;
  required?: boolean;
  children?: ReactNode;
  errorMsg?: string;
  className?: string;
  inputSize?: 'default' | 'sm';
  direct?: 'vertical' | 'horizontal';
}

export function LabelInputField({
  title,
  desc,
  required = false,
  children,
  errorMsg,
  className,
  inputSize = 'default',
  direct = 'vertical',
  ...props
}: Props) {
  const isHorizontal = direct === 'horizontal';
  const isSizeSm = inputSize === 'sm';

  return (
    <Field className={cn(isHorizontal && 'flex-row items-start', className)}>
      <FieldLabel
        className={cn(
          'field-label font-normal',
          isHorizontal && 'w-13! shrink-0 leading-8!',
          isSizeSm && 'text-xs'
        )}
      >
        {title}
        {required && <span className='text-error-text'>*</span>}
      </FieldLabel>

      <div
        className={cn(
          'field-body flex flex-col gap-2',
          isHorizontal && 'flex-1',
          isSizeSm && 'gap-1'
        )}
      >
        {children ? (
          children
        ) : (
          <FormCommonInput
            inputSize={inputSize}
            errorMsg={errorMsg}
            {...props}
          />
        )}
        {desc && (
          <FieldDescription
            className={cn('text-[13px]', isSizeSm && 'text-xs')}
          >
            {desc}
          </FieldDescription>
        )}

        {errorMsg && (
          <p
            className={cn(
              'text-error-text flex items-start gap-1 text-sm',
              isSizeSm && 'text-xs'
            )}
          >
            <TriangleAlert
              className={cn('size-5 shrink-0', isSizeSm && 'w-4')}
            />
            {errorMsg}
          </p>
        )}
      </div>
    </Field>
  );
}
