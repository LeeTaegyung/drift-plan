import z from 'zod';

const tripFormDateRange = z
  .union([
    z.undefined(),
    z.object({
      from: z.date(),
      to: z.date().optional(),
    }),
  ])
  .superRefine((data, ctx) => {
    if (!data) {
      ctx.addIssue({
        code: 'custom',
        message: '여행 기간을 입력해주세요.',
        path: ['from'],
        fatal: true,
      });
      return;
    }

    // 둘 다 없으면
    if (!data.from && !data.to) {
      ctx.addIssue({
        code: 'custom',
        message: '여행 기간을 입력해주세요.',
        path: ['from'],
        fatal: true,
      });
      return;
    }

    // from이 to보다 뒤면 안 됨
    if (data.from && data.to && data.from > data.to) {
      ctx.addIssue({
        code: 'custom',
        message: '마지막 날짜는 시작 날짜 이후여야 합니다.',
        path: ['to'],
      });
    }
  });

const tripFormContryItem = z.object({
  id: z.number(),
  alpha2: z.string(),
  alpha3: z.string(),
  name: z.string(),
  continent: z.string(),
});

const tripFormDomesticField = z
  .discriminatedUnion('is_domestic', [
    z.object({
      is_domestic: z.literal(true),
      region: z.string().nullable(),
      countries: z.null(),
    }),
    z.object({
      is_domestic: z.literal(false),
      region: z.null(),
      countries: z.array(tripFormContryItem).nullable(),
    }),
  ])
  .superRefine((data, ctx) => {
    if (
      data.is_domestic === true &&
      (!data.region || data.region?.trim() === '')
    ) {
      ctx.addIssue({
        code: 'custom',
        message: '여행지를 추가해주세요.',
        path: ['region'],
      });
    } else if (
      data.is_domestic === false &&
      (!data.countries || data.countries.length === 0)
    ) {
      ctx.addIssue({
        code: 'custom',
        message: '나라를 추가해주세요.',
        path: ['countries'],
      });
    }
  });

const tripFormCommonField = z.object({
  title: z.string().nullable(),
  date: tripFormDateRange,
  participants_count: z
    .number('인원을 입력해주세요.')
    .min(1, '최소 1명 이상이어야 합니다.'),
  background_image_url: z.string().nullable(),
  background_color: z.string().nullable(),
});

export const tripFormSchema = z.intersection(
  tripFormDomesticField,
  tripFormCommonField
);

export type TripFormValues = z.infer<typeof tripFormSchema>;
