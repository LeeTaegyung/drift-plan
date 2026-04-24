'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AuthWrapper } from '@/features/auth/_common/ui';
import { resetPassword } from '@/features/auth/resetPassword/api/resetPassword.api';
import {
  resetPasswordSchema,
  ResetPasswordValues,
} from '@/features/auth/resetPassword/model/resetPassword.schema';
import { PATH } from '@/shared/constants/path';
import { generateErrorMessage } from '@/shared/lib/supabase/error';
import { Button } from '@/shared/shadcn/components/ui/button';
import {
  FormWrapper,
  LabelInputField,
  PasswordInputField,
} from '@/shared/ui/form';

export default function ResetPasswordForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { isValid, isSubmitting, errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
    mode: 'onChange',
  });
  const { mutateAsync: resetPasswordMutate } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success('비밀번호 재설정에 성공하였습니다.');
      router.push(PATH.global.main);
    },
    onError: (error) => {
      const message = generateErrorMessage(error);
      toast.error(message);
    },
  });

  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');

  useEffect(() => {
    // 비밀번호 확인 필드에 값이 있을 때 비밀번호 필드 변경시 양방향 검증되도록, trigger
    if (passwordConfirm.length === 0) return;
    trigger('passwordConfirm');
  }, [password, passwordConfirm, trigger]);

  const handleSubmitForm = handleSubmit(async (formData) => {
    const { password } = formData;
    await resetPasswordMutate(password);
  });

  return (
    <AuthWrapper>
      <FormWrapper onSubmit={handleSubmitForm}>
        <LabelInputField
          title='비밀번호'
          errorMsg={errors?.password?.message || ''}
        >
          <PasswordInputField
            placeholder='영문 대소문자, 숫자, 특수문자 포함 8자 이상'
            isError={!!errors.password?.message}
            {...register('password')}
          />
        </LabelInputField>

        <LabelInputField
          title='비밀번호 확인'
          errorMsg={errors.passwordConfirm?.message || ''}
        >
          <PasswordInputField
            placeholder='비밀번호를 한번 더 입력해주세요.'
            isError={!!errors.passwordConfirm?.message}
            {...register('passwordConfirm')}
          />
        </LabelInputField>

        <Button disabled={!isValid || isSubmitting} size='lg'>
          {isSubmitting ? '비밀번호 재설정중...' : '비밀번호 재설정'}
        </Button>
      </FormWrapper>
    </AuthWrapper>
  );
}
