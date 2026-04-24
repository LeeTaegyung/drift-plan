'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { forgotPassword } from '@/features/auth/forgotPassword/api/forgotPassword.api';
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from '@/features/auth/forgotPassword/model/forgotPassword.schema';
import { PATH } from '@/shared/constants/path';
import { generateErrorMessage } from '@/shared/lib/supabase/error';
import { Button } from '@/shared/shadcn/components/ui/button';
import { FormWrapper, LabelInputField } from '@/shared/ui/form';

export default function ForgotPasswordForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
  });

  const { mutateAsync: forgotPasswordMutate } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (_, variable) => {
      toast.success('인증 메일을 전송하였습니다.');
      router.push(`${PATH.auth.forgotPasswordSuccess}?email=${variable}`);
    },
    onError: (error) => {
      const message = generateErrorMessage(error);
      toast.error(message);
    },
  });

  const handleSubmitForm = handleSubmit(async (formData) => {
    const { email } = formData;

    await forgotPasswordMutate(email);
  });

  return (
    <FormWrapper onSubmit={handleSubmitForm}>
      <div className='text-text-primary text-center text-[15px]'>
        가입하신 이메일을 입력해주세요. <br />
        비밀번호 재설정 링크를 보내드릴게요.
      </div>

      <LabelInputField
        title='이메일'
        required
        errorMsg={errors.email?.message || ''}
        placeholder='이메일을 입력해주세요.'
        {...register('email')}
      />

      <Button disabled={!isValid || isSubmitting} size='lg'>
        {isSubmitting ? '인증 메일 요청중...' : '인증 메일 요청'}
      </Button>
    </FormWrapper>
  );
}
