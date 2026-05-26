'use client';

import Link from 'next/link';

import { useSuspenseQuery } from '@tanstack/react-query';
import { ArrowRight, ListCheck, SquarePen } from 'lucide-react';

import { TRIPS_QUERIES } from '@/entities/trips/api/trips.queries';
import { getTripTitleLabel } from '@/entities/trips/lib/format';
import { TripsViewType } from '@/entities/trips/type';
import CountryInfo from '@/features/trips/tripDetail/ui/CountryInfo';
import ScheduleCalendar from '@/features/trips/tripDetail/ui/ScheduleCalendar';
import { PATH } from '@/shared/constants/path';
import { Button } from '@/shared/shadcn/components/ui/button';
import BackBtn from '@/shared/ui/BackBtn';
import { formatTripDate, getDayByStringDate } from '@/shared/utils/dateUtils';

interface Props {
  tripId: string;
  tripData: TripsViewType;
}

export default function TripDetailArea({ tripId, tripData }: Props) {
  const { data } = useSuspenseQuery(
    TRIPS_QUERIES.detail.queryOptions(tripId, tripData)
  );
  const today = new Date();

  const title = getTripTitleLabel({
    title: data.title,
    is_domestic: data.is_domestic,
    continent: data.continent,
    countries: data.countries,
    region: data.region,
  });

  return (
    <div className='inner flex flex-col items-center gap-3 py-5 md:gap-5 md:py-10'>
      <div className='bg-bg sticky top-12 flex w-full justify-between py-1.5 md:top-14'>
        <BackBtn text='돌아가기' />
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
          <h2 className='text-text-primary text-xl font-semibold md:text-2xl'>
            {title}
          </h2>
          {data.start_date && data.end_date && (
            <div className='text-text-secondary text-sm md:text-base'>
              {data.start_date}({getDayByStringDate(data.start_date)}) ~{' '}
              {data.end_date}({getDayByStringDate(data.end_date)})
            </div>
          )}
          <div className='flex flex-wrap items-center justify-center gap-1'>
            {data.is_domestic
              ? data.region && (
                  <span className='bg-info-bg border-info-border text-info-text rounded-[4px] border px-1 text-sm'>
                    {data.region}
                  </span>
                )
              : data.countries &&
                data.countries.map((country) => (
                  <span
                    key={country}
                    className='bg-info-bg border-info-border text-info-text rounded-[4px] border px-1 text-sm'
                  >
                    {country}
                  </span>
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
              start_date={data.start_date || ''}
              end_date={data.end_date || ''}
              tripId={tripId}
            />
          </div>
        </div>
        {/* 하단 - 해외의 경우 나라와 비상연락처 정보 */}
        <div className='flex w-full flex-col gap-5'>
          {data.countries && <CountryInfo countries={data.countries} />}
        </div>
      </div>
    </div>
  );
}
