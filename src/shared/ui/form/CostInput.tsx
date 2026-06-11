import { ChangeEvent, FocusEvent, InputHTMLAttributes, useState } from 'react';

import { cn } from '@/shared/shadcn/lib/utils';
import FormCommonInput from '@/shared/ui/form/FormCommonInput';

interface Props extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> {
  value: string | null;
  onChange: (value: string | null) => void;
  inputSize?: 'default' | 'sm';
  className?: string;
  comma?: boolean;
  decimal?: boolean;
}

export default function CostInput({
  value,
  onChange,
  inputSize = 'sm',
  className,
  comma = true,
  decimal = true,
  ...props
}: Props) {
  // 입력 중인 문자열을 별도로 관리
  const [inputText, setInputText] = useState<string | null>(null);

  // inputText가 있으면 그걸 우선 표시 (입력 중), 없으면 value 기반으로 포맷
  const displayValue = (() => {
    if (inputText !== null) return inputText;
    if (value === null || value === undefined) return '';
    if (comma)
      return Number(value).toLocaleString(undefined, {
        maximumFractionDigits: decimal ? 2 : 0,
      });
    return String(value);
  })();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');

    // 숫자와 . 허용
    const pattern = decimal ? /^\d*\.?\d*$/ : /^\d*$/;
    if (!pattern.test(value)) return;

    setInputText(value);

    // 빈 문자열이거나 . 단독으로 있을때엔 null
    if (value === '' || value === '.') {
      onChange(null);
    } else {
      onChange(value);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    // blur 시 inputText 초기화 → value 기반 포맷으로 전환
    setInputText(null);
    props.onBlur?.(e);
  };

  return (
    <FormCommonInput
      inputSize={inputSize}
      className={cn('text-right', className)}
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      {...props}
    />
  );
}
