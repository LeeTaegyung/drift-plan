'use client';

import { useState } from 'react';

import { Plus } from 'lucide-react';

import TripScheduleForm from '@/features/trips/tripSchedule/ui/TripScheduleForm';
import { Button } from '@/shared/shadcn/components/ui/button';

interface Props {
  isEmpty: boolean;
  tripId: string;
  dateId: string;
}

export default function TripScheduleAddArea({
  isEmpty,
  tripId,
  dateId,
}: Props) {
  const [isAddMode, setIsAddMode] = useState(false);

  const handleClickAddToggle = () => {
    setIsAddMode((p) => !p);
  };
  return (
    <div className='pl-5'>
      {isAddMode ? (
        <TripScheduleForm onSubmit={() => {}} />
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
