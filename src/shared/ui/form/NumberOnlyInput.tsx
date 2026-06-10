import { ChangeEvent, InputHTMLAttributes } from 'react';

import { cn } from '@/shared/shadcn/lib/utils';
import FormCommonInput from '@/shared/ui/form/FormCommonInput';

interface Props extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> {
  value: number | null;
  onChange: (value: number | null) => void;
  inputSize?: 'default' | 'sm';
  className?: string;
  comma?: boolean;
}

export default function NumberOnlyInput({
  value,
  onChange,
  inputSize = 'sm',
  className,
  comma,
  ...props
}: Props) {
  const displayValue =
    comma && value !== null && value !== undefined
      ? Number(value).toLocaleString()
      : (value ?? '');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');

    // 숫자만 허용
    const pattern = /^\d*$/;
    if (!pattern.test(value)) return;

    onChange(value === '' ? null : Number(value));
  };

  return (
    <FormCommonInput
      inputSize={inputSize}
      className={cn('text-center', className)}
      value={displayValue}
      onChange={handleChange}
      {...props}
    />
  );
}
