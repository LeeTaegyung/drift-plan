import { TripsStatusType } from '@/entities/trips/type';
import { cn } from '@/shared/shadcn/lib/utils';

interface Props {
  status: TripsStatusType;
}

const STATUS_MAP = {
  before: {
    color: 'border-inactive-border bg-inactive-bg text-inactive-text',
    text: '여행전',
  },
  during: {
    color: 'border-info-border bg-info-bg text-info-text',
    text: '여행중',
  },
  after: {
    color: 'bg-completed-bg text-completed-text border-completed-border',
    text: '여행완료',
  },
};

export default function TripStatusChip({ status }: Props) {
  return (
    <span
      className={cn(
        'flex items-center justify-center rounded-2xl border px-2 py-0.5 text-xs',
        STATUS_MAP[status].color
      )}
    >
      {STATUS_MAP[status].text}
    </span>
  );
}
