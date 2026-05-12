'use client';

import { useState } from 'react';
import { type DateRange } from 'react-day-picker';
import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';
import { ArrowRight, PlusIcon } from 'lucide-react';

import { TRIPS_QUERIES } from '@/entities/trips/api/trips.queries';
import { formatTripDate } from '@/entities/trips/lib/dateFormatter';
import ScopFilter from '@/features/trips/tripList/ui/ScopFilter';
import TripItem from '@/features/trips/tripList/ui/TripItem';
import { PATH } from '@/shared/constants/path';
import { Button } from '@/shared/shadcn/components/ui/button';
import { NoData } from '@/shared/ui/empty';
import RangeDate from '@/shared/ui/form/RangeDate';
import Pagination from '@/shared/ui/Pagination';
import { useCurrentPage } from '@/shared/utils/hooks/useCurrentPage';

export default function TripListArea() {
  const { currentPage, setCurrentPage } = useCurrentPage();
  const [selectScope, setSelectScope] = useState<undefined | boolean>(
    undefined
  );
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  const tripListFilter = {
    currentPage,
    is_domestic: selectScope,
    start_date: date?.from ? formatTripDate(date.from) : undefined,
    end_date: date?.to ? formatTripDate(date.to) : undefined,
  };

  const { data: tripsData } = useQuery(
    TRIPS_QUERIES.list.queryOptions(tripListFilter)
  );

  console.log(tripsData);

  if (!tripsData || tripsData.data?.length === 0)
    return (
      <NoData title='아직 계획한 여행이 없어요.'>
        <Button
          className='bg-surface gap-1 rounded-md text-sm'
          variant='outline'
          asChild
        >
          <Link
            href={PATH.global.trips.create}
            className='flex items-center gap-1'
          >
            첫 여행 만들기 <ArrowRight />
          </Link>
        </Button>
      </NoData>
    );

  return (
    <div className='inner flex flex-col gap-5 py-6 md:gap-8 md:py-12 lg:py-20'>
      {/* 여행 등록 버튼 */}
      <div className='flex justify-end'>
        <Button
          className='bg-surface gap-1 rounded-md text-sm'
          variant='outline'
          asChild
        >
          <Link
            href={PATH.global.trips.create}
            className='flex items-center gap-1'
          >
            <PlusIcon className='size-4 md:size-5' />
            여행 등록
          </Link>
        </Button>
      </div>

      {/* 필터링 영역 */}
      <div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
        {/* 국내/해외 */}
        <ScopFilter selectScope={selectScope} setSelectScope={setSelectScope} />
        {/* 기간 */}
        <RangeDate
          selectDate={date}
          setSelectDate={setDate}
          btnText='기간 조회'
        />
      </div>

      {/* 리스트 */}
      <div>
        <ul className='grid grid-cols-1 items-stretch gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4'>
          {tripsData.data.map((trip) => (
            <li key={trip.id}>
              <TripItem trip={trip} />
            </li>
          ))}
        </ul>
      </div>

      {/* 페이지네이션 */}
      <Pagination
        currentPage={Number(currentPage)}
        totalPage={tripsData.totalPages}
        onChangePage={(currentPage: number) => setCurrentPage(currentPage)}
      />
    </div>
  );
}
