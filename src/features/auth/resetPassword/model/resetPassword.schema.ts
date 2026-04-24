import { z } from 'zod';

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, '비밀번호는 8자 이상이어야 해요.')
      .regex(/[a-z]/, '영문 소문자를 포함해야 해요.')
      .regex(/[A-Z]/, '영문 대문자를 포함해야 해요.')
      .regex(/[0-9]/, '숫자를 포함해야 해요')
      .regex(/[!@#$%^&*(),.?":{}|<>]/, '특수문자를 포함해야 해요'),
    passwordConfirm: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: 'custom',
        path: ['passwordConfirm'],
        message: '비밀번호가 일치하지 않습니다.',
      });
    }
  });

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
