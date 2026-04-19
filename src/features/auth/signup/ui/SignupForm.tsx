'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { createNickname } from '@/features/auth/signup/api/signup.api';
import {
  SignUpFormValues,
  signUpSchema,
} from '@/features/auth/signup/model/signup.schema';
import { useSignup } from '@/features/auth/signup/model/useSignup';
import { PATH } from '@/shared/constants/path';
import { generateErrorMessage } from '@/shared/lib/supabase/error';
import { Button } from '@/shared/shadcn/components/ui/button';
import {
  FormWrapper,
  LabelInputField,
  PasswordInputField,
} from '@/shared/ui/form';

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    reset,
    formState: { isValid, isSubmitting, errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    mode: 'onChange',
  });
  const { mutateAsync: signupMutate } = useSignup();
  const router = useRouter();

  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');

  useEffect(() => {
    // 비밀번호 확인 필드에 값이 있을 때 비밀번호 필드 변경시 양방향 검증되도록, trigger
    if (passwordConfirm.length === 0) return;
    trigger('passwordConfirm');
  }, [password, passwordConfirm, trigger]);

  const handleSubmitForm = handleSubmit(async (formData) => {
    const { email, password } = formData;

    const nickname = await createNickname();

    await signupMutate(
      { email, password, nickname },
      {
        onSuccess: () => {
          toast.success('회원가입에 성공하였습니다.');
          router.push(PATH.global.main);
        },
        onError: (error) => {
          const message = generateErrorMessage(error);
          toast.error(message);
          reset();
        },
      }
    );
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
        {isSubmitting ? '회원가입중...' : '회원가입'}
      </Button>
    </FormWrapper>
  );
}
