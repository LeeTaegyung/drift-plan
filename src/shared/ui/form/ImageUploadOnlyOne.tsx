import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';

import { PlusIcon, XIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/shared/shadcn/components/ui/button';
import { Input } from '@/shared/shadcn/components/ui/input';
import { Label } from '@/shared/shadcn/components/ui/label';

interface Props {
  value: File | string | null;
  onChange: (file: File | null) => void;
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 1024 * 1024 * 3; // 3MB

export default function ImageUploadOnlyOne({ value, onChange }: Props) {
  const [preview, setPreview] = useState<string | null>(() => {
    if (typeof value === 'string') return value;
    return null;
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    // 사이즈 검증 - 3MB 이상이면 null
    if (file.size >= MAX_SIZE) {
      toast.error('파일 크기는 3MB 이하여야 합니다.');
      e.target.value = '';
      return;
    }

    // 확장자 검증
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.warning('jpeg, png, webp 포맷의 이미지만 업로드 가능합니다.');
      e.target.value = '';
      return;
    }

    onChange(file);
    e.target.value = '';
  };

  const handleRemovePreview = () => {
    if (!preview) return;
    URL.revokeObjectURL(preview);
    setPreview(null);
    onChange(null);
  };

  useEffect(() => {
    if (!(value instanceof File)) return;

    const objectUrl = URL.createObjectURL(value);
    setPreview(objectUrl);

    return () => {
      setPreview(null);
      URL.revokeObjectURL(objectUrl);
    };
  }, [value]);

  return (
    <Label className='border-input bg-surface relative flex h-30 w-30 cursor-pointer items-center justify-center rounded-lg border'>
      <Input
        type='file'
        accept={ALLOWED_TYPES.join(',')}
        onChange={handleChange}
        className='hidden'
      />
      {!preview && <PlusIcon className='text-input size-10' />}
      {preview && (
        <>
          <Image
            src={preview}
            alt='미리보기 이미지'
            width={120}
            height={120}
            className='h-full w-full object-contain'
          />
          <Button
            type='button'
            size={'icon-xs'}
            className='absolute -top-2 -right-2 rounded-full'
            onClick={handleRemovePreview}
          >
            <XIcon />
          </Button>
        </>
      )}
    </Label>
  );
}
