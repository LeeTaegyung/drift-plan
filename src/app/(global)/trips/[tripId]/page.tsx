import { Suspense } from 'react';

import { getTripWithStatusServer } from '@/entities/trips/api/trips.server';
import TripDetailArea from '@/features/trips/tripDetail/ui/TripDetailArea';
import Loading from '@/shared/ui/Loading';

export default async function TripDetailPage({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;
  const tripData = await getTripWithStatusServer(tripId);

  if (!tripData) throw new Error('데이터를 가져올 수 없습니다.');

  return (
    <Suspense
      fallback={
        <div className='flex-full flex flex-1 flex-col items-center'>
          <Loading />
        </div>
      }
    >
      <TripDetailArea tripId={tripId} tripData={tripData} />
    </Suspense>
  );
}
