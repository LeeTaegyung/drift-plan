import Link from 'next/link';

import {
  CalendarIcon,
  EllipsisVertical,
  MapPin,
  UsersRound,
} from 'lucide-react';

import {
  getParticipantsLabel,
  getTripLocationLabel,
  getTripStatus,
  getTripTitleLabel,
} from '@/entities/trips/lib/format';
import { TripsViewType } from '@/entities/trips/type';
import TripScopeTag from '@/entities/trips/ui/TripScopeTag';
import TripStatusChip from '@/entities/trips/ui/TripStatusChip';
import { PATH } from '@/shared/constants/path';
import { Button } from '@/shared/shadcn/components/ui/button';

interface Props {
  trip: TripsViewType;
}

export default function TripItem({ trip }: Props) {
  const {
    background_color,
    background_image_url,
    continent,
    countries,
    end_date,
    id,
    is_domestic,
    participants_count,
    region,
    start_date,
    title,
  } = trip;

  const status = getTripStatus(trip.status!);
  const displayTitle = getTripTitleLabel({
    title,
    is_domestic,
    continent,
    countries,
    region,
  });
  const displayLocation = getTripLocationLabel({
    is_domestic,
    continent,
    countries,
    region,
  });
  const displayParticipantsCount = getParticipantsLabel(participants_count!);

  return (
    <div
      className='border-border relative aspect-auto h-full overflow-hidden rounded-lg bg-cover md:aspect-9/11'
      style={{
        backgroundImage: background_image_url
          ? `url(${background_image_url})`
          : undefined,
        backgroundColor: background_color ?? undefined,
      }}
    >
      <Link
        href={PATH.global.trips.detail(id!)}
        className='flex h-full flex-col bg-black/30 p-3 text-white md:p-5'
      >
        <div className='mb-1.5 flex gap-1'>
          <TripStatusChip status={status} />
          <TripScopeTag is_domestic={is_domestic!} />
        </div>

        <h2 className='mb-3 line-clamp-1 shrink-0 text-lg font-semibold md:line-clamp-2'>
          {displayTitle}
        </h2>

        <div className='mt-auto flex flex-col gap-1'>
          {/* 나라가 여러개이면, 대륙으로 표시해주기 */}
          <div className='flex items-center gap-1 text-xs md:text-sm'>
            <MapPin className='size-4 md:size-4.5' />
            {displayLocation}
          </div>

          <div className='flex items-center gap-1 text-xs md:text-sm'>
            <CalendarIcon className='size-4 md:size-4.5' />
            {start_date!} ~ {end_date!}
          </div>

          {/* 인원수가 1명인 경우 나혼자 로 텍스트 대체 */}
          <div className='flex items-center gap-1 text-xs md:text-sm'>
            <UsersRound className='size-4 md:size-4.5' />
            {displayParticipantsCount}
          </div>
        </div>
      </Link>
      <div className='absolute'>
        <Button
          variant={'ghost'}
          size={'icon'}
          className='hover:bg-transparent'
        >
          <EllipsisVertical />
        </Button>
      </div>
    </div>
  );
}
