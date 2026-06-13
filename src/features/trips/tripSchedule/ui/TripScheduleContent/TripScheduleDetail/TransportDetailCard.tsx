import { Road } from 'lucide-react';

import { TRANSPORT_TYPE_MAP } from '@/features/trips/tripSchedule/constants';
import { TransportCardFormValues } from '@/features/trips/tripSchedule/model/scheduleForm.schema';
import SDCardWrapper from '@/features/trips/tripSchedule/ui/TripScheduleContent/TripScheduleDetail/SDCardWrapper';

interface Props {
  detail: TransportCardFormValues['detail'];
}

export default function TransportDetailCard({ detail }: Props) {
  return (
    <SDCardWrapper>
      <SDCardWrapper.Header
        icon={
          detail.transport_type
            ? TRANSPORT_TYPE_MAP[detail.transport_type]
            : Road
        }
        className='bg-completed-bg text-completed-text'
      >
        <div>
          <div className='text-sm font-medium'>
            {detail.transport_type ?? '-'}
          </div>
          {detail.cost && (
            <span className='text-xs text-black/70'>
              {detail.cost_currency ?? ''}{' '}
              {Number(detail.cost).toLocaleString()}
            </span>
          )}
        </div>
      </SDCardWrapper.Header>
    </SDCardWrapper>
  );
}
