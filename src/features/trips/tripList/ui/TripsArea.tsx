'use client';

import { useState } from 'react';
import { type DateRange } from 'react-day-picker';

import { PlusIcon } from 'lucide-react';

import RangeDate from '@/features/trips/tripList/ui/RangeDate';
import ScopFilter from '@/features/trips/tripList/ui/ScopFilter';
import TripItem from '@/features/trips/tripList/ui/TripItem';
import { Button } from '@/shared/shadcn/components/ui/button';
import Pagination from '@/shared/ui/Pagination';

const tripsData = [
  {
    id: '123',
    user_id: '12312',
    title: null,
    is_domestic: false,
    start_date: '2025-04-05',
    end_date: '2025-04-09',
    participants_count: 2,
    status: 'before',
    region: null,
    countries: ['홍콩'],
    continent: ['아시아'],
    background_color: '#4fc3e8',
    background_image_url: null,
    created_at: '',
    updated_at: null,
  },
  {
    id: '345',
    user_id: '43523',
    title: '행복했던 인생 첫 유럽여행',
    is_domestic: false,
    start_date: '2025-05-11',
    end_date: '2025-05-30',
    participants_count: 1,
    status: 'during',
    region: null,
    countries: ['프랑스', '스위스', '이탈리아', '스페인'],
    continent: ['유럽'],
    background_color: null,
    background_image_url:
      'https://dimgcdn.ybtour.co.kr/TN/cd/cd0c00f55bc491018ea419249fc70f36.tn.630x410.jpg',
    created_at: '',
    updated_at: null,
  },
  {
    id: '980',
    user_id: '77896',
    title: null,
    is_domestic: true,
    start_date: '2024-05-11',
    end_date: '2024-05-15',
    participants_count: 1,
    status: 'after',
    region: '제주도',
    countries: null,
    continent: null,
    background_color: '#ffb347',
    background_image_url: null,
    created_at: '',
    updated_at: null,
  },
];

export default function TripsArea() {
  const [selectScope, setSelectScope] = useState('all');
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  return (
    <div className='inner flex flex-col gap-5 py-6 md:gap-8 md:py-12 lg:py-20'>
      {/* 여행 등록 버튼 */}
      <div className='flex justify-end'>
        <Button
          className='bg-surface gap-1 rounded-md text-sm'
          variant='outline'
        >
          <PlusIcon className='size-4 md:size-5' />
          여행 등록
        </Button>
      </div>

      {/* 필터링 영역 */}
      <div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
        {/* 국내/해외 */}
        <ScopFilter selectScope={selectScope} setSelectScope={setSelectScope} />
        {/* 기간 */}
        <RangeDate selectDate={date} setSelectDate={setDate} />
      </div>

      {/* 리스트 */}
      <div>
        <ul className='grid grid-cols-1 items-stretch gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4'>
          {tripsData.map((trip) => (
            <li key={trip.id}>
              <TripItem trip={trip} />
            </li>
          ))}
        </ul>
      </div>

      {/* 페이지네이션 */}
      <Pagination currentPage={1} totalPage={2} onChangePage={() => {}} />
    </div>
  );
}
