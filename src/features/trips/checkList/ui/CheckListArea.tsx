'use client';

import { useMemo, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Eye, Pen, PlusCircle, SquarePen, Trash2, XIcon } from 'lucide-react';
import { toast } from 'sonner';

import { CHECKLIST_QUERIES } from '@/entities/checklist/api/checklist.queries';
import {
  CheckListCategoryType,
  TripCheckListType,
} from '@/entities/checklist/type';
import { updateCheckItemAction } from '@/features/trips/checkList/api/checkItemEdit.actions';
import { CheckListFormValues } from '@/features/trips/checkList/model/checklistForm.schema';
import CheckItemCreateForm from '@/features/trips/checkList/ui/CheckItemCreateForm';
import CheckListItem from '@/features/trips/checkList/ui/CheckListItem';
import CheckListUtilButton from '@/features/trips/checkList/ui/CheckListUtilButton';
import CheckListWrap from '@/features/trips/checkList/ui/CheckListWrap';
import { CHECKLIST_CATEGORY } from '@/shared/config/checklists';
import { Button } from '@/shared/shadcn/components/ui/button';
import { useModalStore } from '@/shared/store/modalStore';
import BackBtn from '@/shared/ui/BackBtn';

interface Props {
  initData: TripCheckListType[];
  tripId: string;
}

export default function CheckListArea({ initData, tripId }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const openModal = useModalStore((state) => state.openModal);
  const queryClient = useQueryClient();
  const { data: checkList } = useQuery(
    CHECKLIST_QUERIES.detail.queryOptions(tripId, initData)
  );
  const { mutateAsync: updateCheckItemMutate } = useMutation({
    mutationFn: updateCheckItemAction,
    onError: () => {
      toast.error('체크리스트 수정에 실패하였습니다.');
    },
  });

  const processChecklist = useMemo(() => {
    const newChecklist: Record<CheckListCategoryType, TripCheckListType[]> = {
      essential: [],
      security: [],
      electronics: [],
      toiletries: [],
      beauty: [],
      clothing: [],
      accessories: [],
      hygiene: [],
      travel_gear: [],
      medicine: [],
      food: [],
      etc: [],
    };

    checkList.forEach((checkItem) => {
      const category = checkItem.category as CheckListCategoryType;
      newChecklist[category].push(checkItem);
    });

    return newChecklist;
  }, [checkList]);

  const handleSubmitEdit = async (
    formData: Partial<CheckListFormValues>,
    id: string,
    onSuccessFormClose: () => void
  ) => {
    // 업데이트 서버액션
    await updateCheckItemMutate(
      { formData, tripId, id },
      {
        onSuccess: () => {
          onSuccessFormClose();
          queryClient.invalidateQueries({
            queryKey: CHECKLIST_QUERIES.detail.queryKey(tripId),
          });
        },
      }
    );
  };

  const handleClickOpenModal = () => {
    openModal(
      '체크리스트 항목 추가',
      <CheckItemCreateForm tripId={tripId} total={checkList.length} />
    );
  };

  return (
    <div className='inner flex flex-col items-center gap-3 py-5 md:gap-5 md:py-10'>
      <div className='relative flex w-full items-center justify-start gap-1 md:justify-center'>
        <BackBtn className='md:absolute md:top-1/2 md:left-0 md:-translate-y-1/2' />
        <h2 className='text-base font-semibold md:text-xl'>체크리스트</h2>
      </div>

      <div className='flex w-full flex-wrap items-center justify-between gap-2'>
        {isEdit && (
          <div className='flex items-center gap-1 md:gap-2'>
            <CheckListUtilButton
              text='선택 항목 삭제'
              icon={Trash2}
              className='bg-error-bg border-error-border text-error-text hover:bg-error-bg/50 hover:text-error-text'
            />
            <CheckListUtilButton
              text='취소'
              icon={XIcon}
              className='bg-inactive-bg border-inactive-border text-inactive-text hover:bg-inactive-bg/50 hover:text-inactive-text'
            />
          </div>
        )}
        <div className='ml-auto flex items-center gap-1 md:gap-2'>
          <CheckListUtilButton
            text={isEdit ? '보기 모드' : '편집 하기'}
            icon={isEdit ? Eye : SquarePen}
            onClick={() => setIsEdit((e) => !e)}
          />
          <CheckListUtilButton
            text='항목 추가'
            icon={PlusCircle}
            onClick={handleClickOpenModal}
          />
        </div>
      </div>

      <div className='grid w-full grid-cols-1 gap-3 md:grid-cols-2 md:gap-4'>
        {Object.entries(processChecklist).map(([key, value]) => {
          return (
            value.length > 0 && (
              <CheckListWrap
                key={key}
                category={CHECKLIST_CATEGORY[key as CheckListCategoryType]}
              >
                {value.map((c) => (
                  <CheckListItem
                    key={`${c.id}-${isEdit}`}
                    checkItem={c}
                    onChangeDone={() => {}}
                    onChangeDelete={() => {}}
                    isEdit={isEdit}
                    isSelected={() => {
                      return false;
                    }}
                    onSubmitEdit={handleSubmitEdit}
                  />
                ))}
              </CheckListWrap>
            )
          );
        })}
      </div>
    </div>
  );
}
