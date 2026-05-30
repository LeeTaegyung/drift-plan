import z from 'zod';

export const checklistFormSchema = z.object({
  category: z
    .string('카테고리를 선택해주세요.')
    .min(1, '카테고리를 선택해주세요.'),
  name: z.string('품목을 입력해주세요.').min(1, '품목을 입력해주세요.'),
  quantity: z.number('1개 이상 입력해주세요.').min(1, '1개 이상 입력해주세요.'),
  memo: z.string().nullable(),
});

export type CheckListFormValues = z.infer<typeof checklistFormSchema>;
