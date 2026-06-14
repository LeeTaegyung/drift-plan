'use client';

import { useState } from 'react';

import {
  TripScheduleCardFormType,
  TripScheduleCardType,
} from '@/entities/trips/type';
import { ScheduleCardFormValues } from '@/features/trips/tripSchedule/model/scheduleForm.schema';
import TripScheduleDetail from '@/features/trips/tripSchedule/ui/TripScheduleContent/TripScheduleDetail';
import TripScheduleForm from '@/features/trips/tripSchedule/ui/TripScheduleForm';
import {
  convertTimeTaken,
  timeTakenToString,
} from '@/features/trips/tripSchedule/utils/convertTimeTaken';
import ActionMenu from '@/shared/ui/ActionMenu';

interface Props {
  data: TripScheduleCardType;
  onUpdateSubmit: (
    formData: Partial<TripScheduleCardFormType>,
    id: string,
    onSuccess: () => void
  ) => void;
  onDeleteCard: (id: string, order: number) => void;
}

export default function TripScheduleCard({
  data,
  onUpdateSubmit,
  onDeleteCard,
}: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const { id, card_type, title, time, time_taken, detail, memo, order_index } =
    data;

  const handleCancel = () => setIsEdit(false);

  const handleSubmit = (formData: Partial<TripScheduleCardFormType>) =>
    onUpdateSubmit(formData, id, () => setIsEdit(false));

  const handleDelete = () => onDeleteCard(id, order_index);

  return (
    <>
      <div className='relative flex flex-col items-start pl-4 md:pl-5'>
        <Pin />
        {isEdit ? (
          <TripScheduleForm
            initValue={data}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        ) : (
          <>
            {time && (
              <span className='top-px right-[calc(100%+20px)] text-sm font-medium md:absolute md:text-[18px]'>
                {`${time.split(':')[0]}:${time.split(':')[1]}`}
              </span>
            )}
            <div className='flex w-full items-start justify-between'>
              <h3 className='font-semibold md:text-[18px]'>{title}</h3>
              <ActionMenu
                onClickEdit={() => setIsEdit(true)}
                onClickDelete={handleDelete}
                className='text-black hover:text-black aria-expanded:text-black'
              />
            </div>
            {time_taken && (
              <span className='text-sm text-gray-500 dark:text-gray-200'>
                {timeTakenToString(
                  Number(convertTimeTaken(time_taken).hour),
                  Number(convertTimeTaken(time_taken).min)
                )}
              </span>
            )}

            {/* 카드타입별 컨텐츠 */}
            <TripScheduleDetail
              card_type={card_type as ScheduleCardFormValues['card_type']}
              detail={detail as ScheduleCardFormValues['detail']}
            />

            {memo && (
              <div className='mt-2 text-sm whitespace-pre-line'>{memo}</div>
            )}
          </>
        )}
      </div>
    </>
  );
}

function Pin() {
  return (
    <div className='bg-wind-strong absolute top-0.5 left-0 flex h-4.5 w-4.5 -translate-x-1/2 items-center justify-center rounded-full md:top-1.5'>
      <div className='border-wind-soft h-3 w-3 rounded-full border-2' />
    </div>
  );
}
