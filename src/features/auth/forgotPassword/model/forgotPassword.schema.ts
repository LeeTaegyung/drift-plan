import z from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.email('이메일 형식으로 작성해주세요.'),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
