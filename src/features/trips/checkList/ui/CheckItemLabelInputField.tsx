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
      className={cn(
        'flex-2 flex-row items-start [&_.field-body]:gap-1 [&_.field-body_svg]:w-4! [&_.field-body>p]:text-xs [&_label]:w-13 [&_label]:shrink-0 [&_label]:text-xs [&_label]:leading-8',
        !children &&
          '[&_input]:h-8 [&_input]:rounded-sm [&_input]:px-2 [&_input]:text-[13px] [&_input]:md:h-8',
        className
      )}
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
