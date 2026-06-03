import Link from 'next/link';

import { CalendarIcon, MapPin, UsersRound } from 'lucide-react';

import { TripsViewType } from '@/entities/trips/type';
import TripScopeTag from '@/entities/trips/ui/TripScopeTag';
import TripStatusChip from '@/entities/trips/ui/TripStatusChip';
import {
  generateTrip,
  getParticipantsLabel,
  getTripLocationLabel,
  getTripStatus,
  getTripTitleLabel,
} from '@/entities/trips/utils/format';
import { PATH } from '@/shared/constants/path';
import ActionMenu from '@/shared/ui/ActionMenu';

interface Props {
  trip: TripsViewType;
  onEdit: (tripId: string) => void;
  onDelete: (tripId: string) => void;
}

export default function TripItem({ trip, onEdit, onDelete }: Props) {
  const {
    background_color,
    background_image_url,
    end_date,
    id,
    is_domestic,
    continent,
    countries,
    participants_count,
    region,
    start_date,
    title,
  } = generateTrip(trip);

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
      className='border-dp-accent-soft bg-dp-accent relative aspect-auto h-full overflow-hidden rounded-lg border-2 bg-cover text-white md:aspect-9/11'
      style={{
        backgroundImage: background_image_url
          ? `url(${background_image_url})`
          : undefined,
        backgroundColor: background_color ?? undefined,
      }}
    >
      <Link
        href={PATH.global.trips.detail(id!)}
        // bg-black/30 text-white
        className='flex h-full flex-col p-3 md:p-5'
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
      <div className='absolute top-3 right-3'>
        <ActionMenu
          onClickEdit={() => onEdit(id || '')}
          onClickDelete={() => onDelete(id || '')}
        />
      </div>
    </div>
  );
}
