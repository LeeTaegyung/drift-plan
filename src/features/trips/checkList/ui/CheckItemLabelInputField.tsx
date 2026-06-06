import { InputHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/shadcn/lib/utils';
import { LabelInputField } from '@/shared/ui/form';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  desc?: string;
  required?: boolean;
  children?: ReactNode;
  errorMsg?: string;
  className?: string;
}

export default function CheckItemLabelInputField({
  title,
  desc,
  required = false,
  children,
  errorMsg,
  className,
  ...props
}: Props) {
  return (
    <LabelInputField
      inputSize='sm'
      direct='horizontal'
      className={className}
      title={title}
      desc={desc}
      required={required}
      errorMsg={errorMsg}
      {...props}
    >
      {children ? children : null}
    </LabelInputField>
  );
}
