'use client';

import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import {
  SignInFormValues,
  signInSchema,
} from '@/features/auth/signin/model/signin.schema';
import { useSignin } from '@/features/auth/signin/model/useSignin';
import { PATH } from '@/shared/constants/path';
import { generateErrorMessage } from '@/shared/lib/supabase/error';
import { Button } from '@/shared/shadcn/components/ui/button';
import { LabelInputField, PasswordInputField } from '@/shared/ui/form';
import { FormWrapper } from '@/shared/ui/form/FormWrapper';
import { getSafeRedirect } from '@/shared/utils/getSafeRedirect';

export default function SigninForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get('redirect');

  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const { mutateAsync: signInMutate } = useSignin();

  const handleSubmitForm = handleSubmit(async (formData) => {
    await signInMutate(formData, {
      onSuccess: () => {
        toast.success('로그인에 성공하였습니다.');
        const nextUrl = getSafeRedirect(redirect);

        router.push(nextUrl);
      },
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message);
      },
    });
  });

  return (
    <FormWrapper onSubmit={handleSubmitForm}>
      <LabelInputField
        title='이메일'
        placeholder='이메일을 입력해주세요.'
        errorMsg={errors?.email?.message || ''}
        {...register('email')}
      />

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

      <Button disabled={!isValid || isSubmitting} size='lg'>
        {isSubmitting ? '로그인중...' : '로그인'}
      </Button>
    </FormWrapper>
  );
}
