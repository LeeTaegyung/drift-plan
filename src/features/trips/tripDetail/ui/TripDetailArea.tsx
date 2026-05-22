'use client';

import Link from 'next/link';

import { useSuspenseQuery } from '@tanstack/react-query';
import { ArrowRight, ListCheck, SquarePen } from 'lucide-react';

import { TRIPS_QUERIES } from '@/entities/trips/api/trips.queries';
import { getTripTitleLabel } from '@/entities/trips/lib/format';
import { TripsViewType } from '@/entities/trips/type';
import CountryInfo from '@/features/trips/tripDetail/ui/CountryInfo';
import { PATH } from '@/shared/constants/path';
import { Button } from '@/shared/shadcn/components/ui/button';
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
      <div className='flex w-full justify-end'>
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
              ? data.region && <span>{data.region}</span>
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
            <div className='mb-2 text-center text-sm md:text-[15px]'>10월</div>
            <div className='bg-surface border-dp-accent border text-xs md:text-sm'>
              <div className='border-dp-accent grid grid-cols-7 border-b text-center text-xs last-of-type:border-b-0'>
                <div className='last-of-type:text-ocean-500 border-dp-accent border-r py-0.5 first-of-type:text-red-500 last-of-type:border-r-0'>
                  일
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent border-r py-0.5 first-of-type:text-red-500 last-of-type:border-r-0'>
                  월
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent border-r py-0.5 first-of-type:text-red-500 last-of-type:border-r-0'>
                  화
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent border-r py-0.5 first-of-type:text-red-500 last-of-type:border-r-0'>
                  수
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent border-r py-0.5 first-of-type:text-red-500 last-of-type:border-r-0'>
                  목
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent border-r py-0.5 first-of-type:text-red-500 last-of-type:border-r-0'>
                  금
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent border-r py-0.5 first-of-type:text-red-500 last-of-type:border-r-0'>
                  토
                </div>
              </div>
              <div className='border-dp-accent grid grid-cols-7 border-b last-of-type:border-b-0'>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <div className='mt-1 h-5 px-1 text-right'></div>
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <div className='mt-1 h-5 px-1 text-right'></div>
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <div className='mt-1 h-5 px-1 text-right'>1</div>
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <div className='mt-1 h-5 px-1 text-right'>2</div>
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <div className='mt-1 h-5 px-1 text-right'>3</div>
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <div className='mt-1 h-5 px-1 text-right'>4</div>
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <div className='mt-1 h-5 px-1 text-right'>5</div>
                </div>
              </div>
              <div className='border-dp-accent grid grid-cols-7 border-b last-of-type:border-b-0'>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <div className='mt-1 h-5 px-1 text-right'>6</div>
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <div className='mt-1 h-5 px-1 text-right'>7</div>
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <div className='mt-1 h-5 px-1 text-right'>8</div>
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <Link
                    href={PATH.global.trips.schedule(tripId, '2026-10-09')}
                    className='bg-wind-soft hover:bg-wind/80 block h-full transition-colors'
                  >
                    <div className='h-5 px-1 pt-1 text-right'>9</div>
                  </Link>
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <Link
                    href={PATH.global.trips.schedule(tripId, '2026-10-10')}
                    className='bg-wind-soft hover:bg-wind/80 block h-full transition-colors'
                  >
                    <div className='h-5 px-1 pt-1 text-right'>10</div>
                  </Link>
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <Link
                    href={PATH.global.trips.schedule(tripId, '2026-10-11')}
                    className='bg-wind-soft hover:bg-wind/80 block h-full transition-colors'
                  >
                    <div className='h-5 px-1 pt-1 text-right'>11</div>
                  </Link>
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <Link
                    href={PATH.global.trips.schedule(tripId, '2026-10-12')}
                    className='bg-wind-soft hover:bg-wind/80 block h-full transition-colors'
                  >
                    <div className='h-5 px-1 pt-1 text-right'>12</div>
                  </Link>
                </div>
              </div>
              <div className='border-dp-accent grid grid-cols-7 border-b last-of-type:border-b-0'>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <Link
                    href={PATH.global.trips.schedule(tripId, '2026-10-13')}
                    className='bg-wind-soft hover:bg-wind/80 block h-full transition-colors'
                  >
                    <div className='h-5 px-1 pt-1 text-right'>13</div>
                  </Link>
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <Link
                    href={PATH.global.trips.schedule(tripId, '2026-10-14')}
                    className='bg-wind-soft hover:bg-wind/80 block h-full transition-colors'
                  >
                    <div className='h-5 px-1 pt-1 text-right'>14</div>
                  </Link>
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <Link
                    href={PATH.global.trips.schedule(tripId, '2026-10-15')}
                    className='bg-wind-soft hover:bg-wind/80 block h-full transition-colors'
                  >
                    <div className='h-5 px-1 pt-1 text-right'>15</div>
                  </Link>
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <Link
                    href={PATH.global.trips.schedule(tripId, '2026-10-16')}
                    className='bg-wind-soft hover:bg-wind/80 block h-full transition-colors'
                  >
                    <div className='h-5 px-1 pt-1 text-right'>16</div>
                  </Link>
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <Link
                    href={PATH.global.trips.schedule(tripId, '2026-10-17')}
                    className='bg-wind-soft hover:bg-wind/80 block h-full transition-colors'
                  >
                    <div className='h-5 px-1 pt-1 text-right'>17</div>
                  </Link>
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <Link
                    href={PATH.global.trips.schedule(tripId, '2026-10-18')}
                    className='bg-wind-soft hover:bg-wind/80 block h-full transition-colors'
                  >
                    <div className='h-5 px-1 pt-1 text-right'>18</div>
                  </Link>
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <Link
                    href={PATH.global.trips.schedule(tripId, '2026-10-19')}
                    className='bg-wind-soft hover:bg-wind/80 block h-full transition-colors'
                  >
                    <div className='h-5 px-1 pt-1 text-right'>19</div>
                  </Link>
                </div>
              </div>
              <div className='border-dp-accent grid grid-cols-7 border-b last-of-type:border-b-0'>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <Link
                    href={PATH.global.trips.schedule(tripId, '2026-10-20')}
                    className='bg-wind-soft hover:bg-wind/80 block h-full transition-colors'
                  >
                    <div className='h-5 px-1 pt-1 text-right'>20</div>
                  </Link>
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <Link
                    href={PATH.global.trips.schedule(tripId, '2026-10-21')}
                    className='bg-wind-soft hover:bg-wind/80 block h-full transition-colors'
                  >
                    <div className='h-5 px-1 pt-1 text-right'>21</div>
                  </Link>
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <Link
                    href={PATH.global.trips.schedule(tripId, '2026-10-22')}
                    className='bg-wind-soft hover:bg-wind/80 block h-full transition-colors'
                  >
                    <div className='h-5 px-1 pt-1 text-right'>22</div>
                  </Link>
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <Link
                    href={PATH.global.trips.schedule(tripId, '2026-10-23')}
                    className='bg-wind-soft hover:bg-wind/80 block h-full transition-colors'
                  >
                    <div className='h-5 px-1 pt-1 text-right'>23</div>
                  </Link>
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <Link
                    href={PATH.global.trips.schedule(tripId, '2026-10-24')}
                    className='bg-wind-soft hover:bg-wind/80 block h-full transition-colors'
                  >
                    <div className='h-5 px-1 pt-1 text-right'>24</div>
                  </Link>
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <Link
                    href={PATH.global.trips.schedule(tripId, '2026-10-25')}
                    className='bg-wind-soft hover:bg-wind/80 block h-full transition-colors'
                  >
                    <div className='h-5 px-1 pt-1 text-right'>25</div>
                  </Link>
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <Link
                    href={PATH.global.trips.schedule(tripId, '2026-10-26')}
                    className='bg-wind-soft hover:bg-wind/80 block h-full transition-colors'
                  >
                    <div className='h-5 px-1 pt-1 text-right'>26</div>
                  </Link>
                </div>
              </div>
              <div className='border-dp-accent grid grid-cols-7 border-b last-of-type:border-b-0'>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <Link
                    href={PATH.global.trips.schedule(tripId, '2026-10-27')}
                    className='bg-wind-soft hover:bg-wind/80 block h-full transition-colors'
                  >
                    <div className='h-5 px-1 pt-1 text-right'>27</div>
                  </Link>
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <Link
                    href={PATH.global.trips.schedule(tripId, '2026-10-28')}
                    className='bg-wind-soft hover:bg-wind/80 block h-full transition-colors'
                  >
                    <div className='h-5 px-1 pt-1 text-right'>28</div>
                  </Link>
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <div className='mt-1 h-5 px-1 text-right'>29</div>
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <div className='mt-1 h-5 px-1 text-right'>30</div>
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <div className='mt-1 h-5 px-1 text-right'>31</div>
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <div className='mt-1 h-5 px-1 text-right'></div>
                </div>
                <div className='last-of-type:text-ocean-500 border-dp-accent min-h-10 border-r first-of-type:text-red-500 last-of-type:border-r-0 md:min-h-13'>
                  <div className='mt-1 h-5 px-1 text-right'></div>
                </div>
              </div>
            </div>
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
