'use client';

import { useState } from 'react';

import { Check, NotebookText, PenBox } from 'lucide-react';

import { TripCheckListType } from '@/entities/checklist/type';
import { CheckListFormValues } from '@/features/trips/checkList/model/checklistForm.schema';
import CheckItemForm from '@/features/trips/checkList/ui/CheckItemForm';
import { Button } from '@/shared/shadcn/components/ui/button';
import { Input } from '@/shared/shadcn/components/ui/input';
import { Label } from '@/shared/shadcn/components/ui/label';
import { cn } from '@/shared/shadcn/lib/utils';

interface Props {
  checkItem: TripCheckListType;
  onChangeDone: (id: string, done: boolean) => void;
  onChangeDelete: (id: string) => void;
  isEdit: boolean;
  isSelected: (id: string) => boolean;
  onSubmitEdit: (
    formData: Partial<CheckListFormValues>,
    id: string,
    onSuccess: () => void
  ) => void;
}

export default function CheckListItem({
  checkItem,
  onChangeDone,
  onChangeDelete,
  isEdit,
  isSelected,
  onSubmitEdit,
}: Props) {
  const [isEditForm, setIsEditForm] = useState(false);
  const { id, name, quantity, memo, done } = checkItem;

  const handleChange = () => {
    if (isEdit) {
      onChangeDelete(id);
    } else {
      onChangeDone(id, done);
    }
  };

  // 편집모드 토글
  const handleChangeEditFormMode = () => setIsEditForm((e) => !e);

  const handleSubmitEdit = async (formData: Partial<CheckListFormValues>) => {
    await onSubmitEdit(formData, id, () => setIsEditForm(false));
  };

  return (
    <li
      className={cn(
        'rounded-sm border px-3 py-2',
        'bg-inactive-bg/50 border-inactive-border text-inactive-text',
        !isEdit &&
          'has-checked:bg-success-bg has-checked:border-success-border has-checked:text-success-text',
        isEdit &&
          !isEditForm &&
          'has-checked:bg-error-bg has-checked:border-error-border has-checked:text-error-text'
      )}
    >
      {isEditForm ? (
        <div>
          <CheckItemForm
            initData={checkItem}
            onSubmit={handleSubmitEdit}
            onCancel={handleChangeEditFormMode}
          />
        </div>
      ) : (
        <>
          <div className='flex items-start gap-1'>
            <Label className='group flex-1 cursor-pointer items-center gap-1 text-xs font-normal md:gap-2 md:text-sm'>
              <Input
                type='checkbox'
                className='hidden'
                checked={isEdit ? isSelected(id) : done}
                onChange={handleChange}
              />
              <div
                className={cn(
                  'flex h-4 w-4 items-center justify-center border md:h-4.5 md:w-4.5',
                  !isEdit &&
                    'group-has-checked:border-text-primary group-has-checked:bg-text-primary',
                  isEdit &&
                    'group-has-checked:border-error-border group-has-checked:bg-error-border'
                )}
              >
                <Check className='hidden size-3 text-white group-has-checked:block md:size-4' />
              </div>
              {name} {quantity && quantity > 1 && quantity}
            </Label>
            {isEdit && (
              <Button
                size='icon-sm'
                variant='ghost'
                className='relative size-5 shrink-0 after:absolute after:top-1/2 after:left-1/2 after:h-full after:w-full after:-translate-x-1/2 after:-translate-y-1/2 after:scale-170 after:content-[""]'
                onClick={handleChangeEditFormMode}
              >
                <PenBox />
              </Button>
            )}
          </div>
          {memo && (
            <div className='border-wind bg-surface mt-1 ml-5 flex gap-1 rounded-sm border p-1.5 text-xs whitespace-pre-line md:mt-1.5 md:ml-7 md:p-2'>
              <NotebookText className='text-wind-strong size-4 shrink-0' />
              {memo}
            </div>
          )}
        </>
      )}
    </li>
  );
}
