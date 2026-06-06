import { Controller, useForm, UseFormReset } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  CheckListCategoryType,
  TripCheckListType,
} from '@/entities/checklist/type';
import {
  checklistFormSchema,
  CheckListFormValues,
} from '@/features/trips/checkList/model/checklistForm.schema';
import CheckItemLabelInputField from '@/features/trips/checkList/ui/CheckItemLabelInputField';
import { CHECKLIST_CATEGORY } from '@/shared/config/checklists';
import { Button } from '@/shared/shadcn/components/ui/button';
import { Input } from '@/shared/shadcn/components/ui/input';
import { Textarea } from '@/shared/shadcn/components/ui/textarea';
import { cn } from '@/shared/shadcn/lib/utils';
import Select from '@/shared/ui/form/Select';

interface Props {
  initData?: TripCheckListType;
  onSubmit: (
    formData: Partial<CheckListFormValues>,
    reset: UseFormReset<CheckListFormValues>
  ) => void;
  onCancel: () => void;
}

export default function CheckItemForm({ initData, onSubmit, onCancel }: Props) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, errors, isSubmitting, isDirty, dirtyFields },
  } = useForm<CheckListFormValues>({
    resolver: zodResolver(checklistFormSchema),
    defaultValues: {
      category: initData?.category || '',
      name: initData?.name || '',
      quantity: initData?.quantity || 1,
      memo: initData?.memo ?? null,
    },
    mode: 'onChange',
  });
  const isEditMode = !!initData;
  const submitText = isEditMode
    ? isSubmitting
      ? '수정중...'
      : '수정'
    : isSubmitting
      ? '추가중...'
      : '추가';

  const onSubmitForm = handleSubmit(async (formData) => {
    const submitData: Partial<CheckListFormValues> = isEditMode
      ? Object.fromEntries(
          Object.keys(dirtyFields).map((key) => [
            key,
            formData[key as keyof CheckListFormValues],
          ])
        )
      : formData;

    if ('memo' in submitData) {
      submitData.memo = submitData.memo === '' ? null : submitData.memo;
    }

    await onSubmit(submitData, reset);
  });

  return (
    <form className='flex flex-col gap-2' onSubmit={onSubmitForm}>
      <Controller
        control={control}
        name='category'
        render={({ field }) => (
          <CheckItemLabelInputField
            title='카테고리'
            errorMsg={errors.category?.message || ''}
          >
            <Select
              className='h-8 rounded-sm text-[13px] md:h-8'
              value={field.value}
              onChange={field.onChange}
            >
              <option value={''}>카테고리를 선택해주세요.</option>
              {Object.keys(CHECKLIST_CATEGORY).map((key) => (
                <option value={key} key={key}>
                  {CHECKLIST_CATEGORY[key as CheckListCategoryType]}
                </option>
              ))}
            </Select>
          </CheckItemLabelInputField>
        )}
      />

      <div className='flex flex-col items-start gap-2 md:flex-row'>
        <Controller
          control={control}
          name='name'
          render={({ field }) => (
            <CheckItemLabelInputField
              title='품목'
              className='flex-1 md:flex-2'
              value={field.value}
              onChange={field.onChange}
              errorMsg={errors.name?.message || ''}
            />
          )}
        />
        <Controller
          control={control}
          name='quantity'
          render={({ field }) => (
            <CheckItemLabelInputField
              className='max-w-40 flex-1 md:max-w-none'
              title='수량'
              errorMsg={errors.quantity?.message || ''}
            >
              <div className='flex items-center gap-1'>
                <Input
                  className={cn(
                    'bg-surface h-8 rounded-sm px-2 text-right text-[13px] md:h-8'
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
                <span className='text-xs'>개</span>
              </div>
            </CheckItemLabelInputField>
          )}
        />
      </div>
      <Controller
        control={control}
        name='memo'
        render={({ field }) => (
          <CheckItemLabelInputField title='메모'>
            <Textarea
              className='bg-surface resize-none rounded-sm px-2 text-[13px]'
              value={field.value || ''}
              onChange={field.onChange}
            />
          </CheckItemLabelInputField>
        )}
      />

      <div className='flex items-center justify-end gap-1'>
        <Button
          size={'sm'}
          className='rounded-sm'
          disabled={!isValid || isSubmitting || !isDirty}
        >
          {submitText}
        </Button>
        <Button
          type='button'
          size={'sm'}
          variant={'outline'}
          className='rounded-sm'
          onClick={onCancel}
          disabled={isSubmitting}
        >
          {isEditMode ? '취소' : '닫기'}
        </Button>
      </div>
    </form>
  );
}
