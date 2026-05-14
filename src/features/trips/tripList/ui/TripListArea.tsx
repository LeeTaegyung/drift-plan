'use client';

import { useState } from 'react';
import { type DateRange } from 'react-day-picker';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowRight, PlusIcon } from 'lucide-react';

import { TRIPS_QUERIES } from '@/entities/trips/api/trips.queries';
import { useTripDelete } from '@/entities/trips/hook/useTripDelete';
import { formatTripDate } from '@/entities/trips/lib/dateFormatter';
import { GetTripsResponse } from '@/entities/trips/type';
import ScopFilter from '@/features/trips/tripList/ui/ScopFilter';
import TripItem from '@/features/trips/tripList/ui/TripItem';
import { PATH } from '@/shared/constants/path';
import { Button } from '@/shared/shadcn/components/ui/button';
import { useAlertModalStore } from '@/shared/store/alertModalStore';
import { NoData } from '@/shared/ui/empty';
import RangeDate from '@/shared/ui/form/RangeDate';
import Loading from '@/shared/ui/Loading';
import Pagination from '@/shared/ui/Pagination';
import { useCurrentPage } from '@/shared/utils/hooks/useCurrentPage';

export default function TripListArea() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { currentPage, setCurrentPage } = useCurrentPage();
  const [selectScope, setSelectScope] = useState<undefined | boolean>(
    undefined
  );
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const openAlertModal = useAlertModalStore((state) => state.openAlertModal);

  const { data: tripsData, isLoading } = useQuery(
    TRIPS_QUERIES.list.queryOptions({
      currentPage,
      is_domestic: selectScope,
      start_date: date?.from ? formatTripDate(date.from) : undefined,
      end_date: date?.to ? formatTripDate(date.to) : undefined,
    })
  );
  const { mutate: deleteMutate } = useTripDelete();

  // 여행 아이템 수정 페이지 이동
  const handleEditPageMove = (tripId: string) => {
    if (tripId === '') {
      return;
    }
    router.push(`${PATH.global.trips.edit(tripId)}`);
  };
  // 여행 아이템 삭제
  const handleDeleteTrip = (tripId: string) => {
    if (tripId === '') {
      return;
    }
    openAlertModal({
      title: '여행 삭제',
      desc: '정말로 삭제하시겠습니까?',
      onAction: () => deleteMutate(tripId),
    });
  };

  // Empty 분기 처리용 초기 데이터 저장
  const initData = queryClient.getQueryData<GetTripsResponse>(
    TRIPS_QUERIES.list.queryKey({
      currentPage: 1,
      is_domestic: undefined,
      start_date: undefined,
      end_date: undefined,
    })
  );

  if (isLoading)
    return (
      <div className='flex items-center justify-center py-10 md:py-20'>
        <Loading />
      </div>
    );

  if (!initData || initData.data?.length === 0)
    return (
      <NoData title='아직 계획한 여행이 없어요.' className='py-10 md:py-15'>
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

      {tripsData && tripsData.total === 0 ? (
        <NoData title='검색 결과가 없어요.' className='py-10 md:py-15'>
          <p className='text-sm text-gray-600'>
            다른 조건으로 다시 검색해보세요.
          </p>
          <Button
            onClick={() => {
              setSelectScope(undefined);
              setDate(undefined);
              setCurrentPage(1);
            }}
          >
            필터 초기화
          </Button>
        </NoData>
      ) : (
        <>
          <div>
            <ul className='grid grid-cols-1 items-stretch gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4'>
              {tripsData!.data.map((trip) => (
                <li key={trip.id}>
                  <TripItem
                    trip={trip}
                    onEdit={handleEditPageMove}
                    onDelete={handleDeleteTrip}
                  />
                </li>
              ))}
            </ul>
          </div>

          <Pagination
            currentPage={Number(currentPage)}
            totalPage={tripsData!.totalPages}
            onChangePage={(currentPage: number) => setCurrentPage(currentPage)}
          />
        </>
      )}
    </div>
  );
}
