'use client';

import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';

import { TripsType, TripValuesType } from '@/entities/trips/type';
import {
  tripFormSchema,
  TripFormValues,
} from '@/features/trips/tripForm/model/tripForm.schema';
import CountriesSearch from '@/features/trips/tripForm/ui/CountriesSearch';
import CountriesSelects from '@/features/trips/tripForm/ui/CountriesSelects';
import DomesticTabs from '@/features/trips/tripForm/ui/DomesticTabs';
import KoreaRegionSearch from '@/features/trips/tripForm/ui/KoreaRegionSearch';
import {
  getDefaultValues,
  transformTripFormData,
} from '@/features/trips/tripForm/utils';
import { Button } from '@/shared/shadcn/components/ui/button';
import { Input } from '@/shared/shadcn/components/ui/input';
import { cn } from '@/shared/shadcn/lib/utils';
import { FormWrapper, LabelInputField } from '@/shared/ui/form';
import RangeDate from '@/shared/ui/form/RangeDate';

interface Props {
  onSubmit: (formData: Partial<TripValuesType>) => Promise<void> | void;
  initValues?: TripsType;
}

export default function TripForm({ onSubmit, initValues }: Props) {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting, isValid, isDirty, dirtyFields },
  } = useForm<TripFormValues>({
    resolver: zodResolver(tripFormSchema),
    defaultValues: getDefaultValues(initValues),
    mode: 'onSubmit',
  });
  const is_domestic = watch('is_domestic');
  const isEditMode = !!initValues;
  const submitText = isEditMode
    ? isSubmitting
      ? '수정중...'
      : '수정'
    : isSubmitting
      ? '등록중...'
      : '등록';

  const onSubmitForm = handleSubmit(async (formData) => {
    const originData: Partial<TripFormValues> = isEditMode
      ? Object.fromEntries(
          Object.keys(dirtyFields).map((key) => [
            key,
            formData[key as keyof TripFormValues],
          ])
        )
      : formData;

    const { date, is_domestic, region, countries, ...data } = originData;

    const transformData = transformTripFormData({
      date,
      is_domestic,
      region,
      countries,
    });

    const submitData: Partial<TripValuesType> = {
      ...transformData,
      ...data,
    };

    await onSubmit(submitData);
  });

  return (
    <div className='inner flex flex-col gap-5 py-6 md:gap-8 md:py-12 lg:py-20'>
      <FormWrapper onSubmit={onSubmitForm} className='mx-auto max-w-125'>
        <LabelInputField
          title='여행 제목'
          desc='여행 제목을 입력하지 않는 경우, 여행지(나라)가 여행 제목으로 표시됩니다.'
          {...register('title')}
        />

        <Controller
          name='is_domestic'
          control={control}
          render={({ field }) => (
            <LabelInputField
              title='국내/해외'
              required
              errorMsg={errors.is_domestic?.message || ''}
            >
              <DomesticTabs
                value={field.value}
                onChange={(value: boolean) => {
                  // 값에 따라 초기화
                  if (value) {
                    setValue('region', '', {
                      shouldDirty: true,
                    });
                    setValue('countries', null, {
                      shouldDirty: true,
                    });
                  } else {
                    setValue('region', null, {
                      shouldDirty: true,
                    });
                    setValue('countries', [], {
                      shouldDirty: true,
                    });
                  }
                  field.onChange(value);
                }}
              />
            </LabelInputField>
          )}
        />

        {/* 국내 선택시 */}
        {is_domestic === true && (
          <Controller
            name='region'
            control={control}
            render={({ field }) => (
              <LabelInputField
                title='여행지'
                required
                errorMsg={errors?.region?.message || ''}
              >
                <KoreaRegionSearch
                  value={field.value}
                  onChange={field.onChange}
                  errorMsg={errors?.region?.message || ''}
                />
              </LabelInputField>
            )}
          />
        )}

        {is_domestic === false && (
          <Controller
            name='countries'
            control={control}
            render={({ field }) => (
              <>
                <div>
                  <LabelInputField
                    title='나라'
                    required
                    errorMsg={errors?.countries?.message || ''}
                  >
                    <CountriesSearch
                      value={field.value}
                      onChange={(country) => {
                        const prevCountries = field.value ?? [];
                        const isDuplicate = prevCountries.some(
                          (c) => c.name === country.name
                        );

                        if (!isDuplicate)
                          field.onChange([...prevCountries, country]);
                      }}
                      errorMsg={errors?.countries?.message || ''}
                    />
                  </LabelInputField>

                  {/* 선택된 나라 표시 */}
                  {field.value && field.value.length > 0 && (
                    <CountriesSelects
                      countries={field.value}
                      onDelete={(country) => {
                        field.onChange(
                          field.value?.filter((c) => c.name !== country.name)
                        );
                      }}
                    />
                  )}
                </div>

                {/* 선택된 나라의 대륙 표시 */}
                <LabelInputField
                  title='대륙'
                  readOnly
                  value={Array.from(
                    new Set(field.value?.map((country) => country.continent))
                  ).join(', ')}
                />
              </>
            )}
          />
        )}

        <Controller
          name='date'
          control={control}
          render={({ field }) => (
            <LabelInputField
              title='기간'
              required
              errorMsg={
                errors?.date?.from?.message || errors?.date?.to?.message || ''
              }
            >
              <RangeDate
                selectDate={field.value}
                setSelectDate={field.onChange}
                errorMsg={
                  errors?.date?.from?.message || errors?.date?.to?.message || ''
                }
              />
            </LabelInputField>
          )}
        />

        <Controller
          name='participants_count'
          control={control}
          render={({ field }) => (
            <LabelInputField
              title='인원'
              required
              errorMsg={errors?.participants_count?.message || ''}
            >
              <div className='flex items-center justify-start gap-2'>
                <Input
                  className={cn(
                    'bg-surface w-[20%] text-right text-sm',
                    errors?.participants_count?.message && 'border-error-border'
                  )}
                  value={field.value}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '') {
                      field.onChange('');
                    } else {
                      const valueAsNumber = Number(value);
                      field.onChange(valueAsNumber ? valueAsNumber : 0);
                    }
                  }}
                />
                명
              </div>
            </LabelInputField>
          )}
        />

        <div className='mt-5 flex gap-2 md:mt-10'>
          <Button
            className='flex-1'
            disabled={!isValid || isSubmitting || !isDirty}
          >
            {submitText}
          </Button>
          <Button
            type='button'
            className='flex-1'
            variant={'outline'}
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            취소
          </Button>
        </div>
      </FormWrapper>
    </div>
  );
}
