'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { createNickname } from '@/features/auth/signup/api/signup.api';
import {
  SignUpFormValues,
  signUpSchema,
} from '@/features/auth/signup/model/signup.schema';
import { useSignup } from '@/features/auth/signup/model/useSignup';
import { generateErrorMessage } from '@/shared/lib/supabase/error';
import { Button } from '@/shared/shadcn/components/ui/button';
import { LabelInputField, PasswordInputField } from '@/shared/ui/form';

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
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
  const { mutateAsync: signMutate } = useSignup();

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

    await signMutate(
      { email, password, nickname },
      {
        onSuccess: () => {
          // 성공후 토스트 알람 -> 메인페이지로 이동
          console.log('성공!');
        },
        onError: (error) => {
          // 토스트 알람
          // 폼 reset 처리
          const message = generateErrorMessage(error);
          console.log(message);
        },
      }
    );
  });

  return (
    <div className='w-full'>
      <form
        className='flex flex-col gap-2 md:gap-5'
        onSubmit={handleSubmitForm}
      >
        <LabelInputField
          title='아이디(이메일)'
          placeholder='아이디를 입력해주세요.'
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
          회원가입
        </Button>
      </form>
    </div>
  );
}
