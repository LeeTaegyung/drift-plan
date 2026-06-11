'use client';

import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

import { createTripSchedule } from '@/entities/trips/api/trips.api';
import { TRIPS_QUERIES } from '@/entities/trips/query/trips.queries';
import { TripScheduleCardFormType } from '@/entities/trips/type';
import TripScheduleForm from '@/features/trips/tripSchedule/ui/TripScheduleForm';
import { Button } from '@/shared/shadcn/components/ui/button';

interface Props {
  isEmpty: boolean;
  tripId: string;
  dateId: string;
  length: number;
}

export default function TripScheduleAddArea({
  isEmpty,
  tripId,
  dateId,
  length,
}: Props) {
  const queryClient = useQueryClient();
  const [isAddMode, setIsAddMode] = useState(false);
  const { mutateAsync: createTripScheduleMutate } = useMutation({
    mutationFn: createTripSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TRIPS_QUERIES.schedule.queryKey(tripId, dateId),
      });
      setIsAddMode(false);
    },
    onError: () => {
      toast.error('카드 등록에 실패하였습니다. 다시 시도해주세요.');
    },
  });

  const handleClickAddToggle = () => {
    setIsAddMode((p) => !p);
  };

  const handleCreateCard = async (
    formData: Partial<TripScheduleCardFormType>
  ) => {
    const data = formData as TripScheduleCardFormType;
    const submitData: TripScheduleCardFormType = {
      ...data,
      trip_id: tripId,
      date: dateId,
      order_index: length,
    };

    await createTripScheduleMutate(submitData);
  };

  return (
    <div className='pl-5'>
      {isAddMode ? (
        <TripScheduleForm
          onSubmit={handleCreateCard}
          onCancel={handleClickAddToggle}
        />
      ) : (
        <>
          {isEmpty && (
            <p className='text-text-muted mb-3'>아직 등록된 일정이 없어요.</p>
          )}
          <Button
            variant={'outline'}
            className='bg-surface inline-flex h-8 items-center gap-1 rounded-sm md:h-10 md:rounded-lg'
            onClick={handleClickAddToggle}
          >
            <Plus />
            일정 추가
          </Button>
        </>
      )}
    </div>
  );
}
