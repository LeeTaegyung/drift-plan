'use client';

import Link from 'next/link';

import { ArrowRight, ListCheck, SquarePen } from 'lucide-react';

import { useGetTripDetailData } from '@/entities/trips/hooks/useGetTripDetailData';
import { getTripTitleLabel } from '@/entities/trips/utils/format';
import AreaTag from '@/features/trips/tripDetail/ui/AreaTag';
import CountryInfo from '@/features/trips/tripDetail/ui/CountryInfo';
import ScheduleCalendar from '@/features/trips/tripDetail/ui/ScheduleCalendar';
import { PATH } from '@/shared/constants/path';
import { Button } from '@/shared/shadcn/components/ui/button';
import BackBtn from '@/shared/ui/BackBtn';
import { formatTripDate, getDayByStringDate } from '@/shared/utils/dateUtils';

interface Props {
  tripId: string;
}

export default function TripDetailArea({ tripId }: Props) {
  const { data: tripDetailData } = useGetTripDetailData();
  const today = new Date();

  const title = getTripTitleLabel({
    title: tripDetailData.title,
    is_domestic: tripDetailData.is_domestic,
    continent: tripDetailData.continent,
    countries: tripDetailData.countries,
    region: tripDetailData.region,
  });

  return (
    <div className='content-inner flex flex-col items-center gap-3 py-5 md:gap-5 md:py-10'>
      <div className='bg-bg sticky top-12 z-1 flex w-full items-center justify-between py-1.5 md:top-14'>
        <BackBtn text='뒤로가기' className='text-xs md:text-sm' />
        <Button
          asChild
          size={'sm'}
          variant={'outline'}
          className='bg-dp-accent hover:bg-dp-accent-soft border-dp-accent hover:text-text-primary hover:border-text-primary inline-flex items-center gap-1 rounded-sm font-normal text-white'
        >
          <Link href={PATH.global.trips.edit(tripId)}>
            <SquarePen className='size-4' />
            편집
          </Link>
        </Button>
      </div>
      <div className='mx-auto flex w-full max-w-100 flex-col gap-5 md:gap-10'>
        {/* 상단 - title, date, 여행 나라 */}
        <div className='flex w-full flex-col items-center gap-2'>
          <h2 className='text-text-primary text-center text-base font-semibold md:text-2xl'>
            {title}
          </h2>
          {tripDetailData.start_date && tripDetailData.end_date && (
            <div className='text-text-secondary text-sm md:text-base'>
              {tripDetailData.start_date}(
              {getDayByStringDate(tripDetailData.start_date)}) ~{' '}
              {tripDetailData.end_date}(
              {getDayByStringDate(tripDetailData.end_date)})
            </div>
          )}
          <div className='flex flex-wrap items-center justify-center gap-1'>
            {tripDetailData.is_domestic
              ? tripDetailData.region && (
                  <AreaTag text={tripDetailData.region} />
                )
              : tripDetailData.countries &&
                tripDetailData.countries.map((country) => (
                  <AreaTag key={country} text={country} />
                ))}
          </div>
        </div>

        <Link
          href={PATH.global.trips.checklist(tripId)}
          className='hover:bg-dp-accent border-dp-accent bg-dp-accent-soft text-dp-accent flex items-center gap-1 rounded-sm border px-2 py-1 text-sm transition-colors hover:text-white'
          aria-label='체크리스트 페이지로 이동'
        >
          <ListCheck className='size-4.5' /> 체크리스트
          <ArrowRight className='ml-auto size-4.5' />
        </Link>

        {/* 중간 - 달력 형태의 일정표 */}
        <div className='flex w-full flex-col items-center gap-5 md:gap-8'>
          {/* 오늘 날짜 표시 */}
          <span className='bg-wind-strong/80 inline-block px-2 py-1 text-sm font-medium text-white italic md:text-base'>
            Today, {today.toLocaleDateString()} (
            {getDayByStringDate(formatTripDate(today))})
          </span>
          {/* 달력 */}
          <div className='w-full'>
            <ScheduleCalendar
              start_date={tripDetailData.start_date || ''}
              end_date={tripDetailData.end_date || ''}
              tripId={tripId}
            />
          </div>
        </div>

        {/* 하단 - 해외의 경우 나라와 비상연락처 정보 */}
        <div className='flex w-full flex-col gap-5'>
          {tripDetailData.countries && (
            <CountryInfo countries={tripDetailData.countries} />
          )}
        </div>
      </div>
    </div>
  );
}
