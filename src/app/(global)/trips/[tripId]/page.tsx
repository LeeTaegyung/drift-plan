import { Suspense } from 'react';

import { getTripWithStatus } from '@/entities/trips/api/trips.server';
import TripDetailArea from '@/features/trips/tripDetail/ui/TripDetailArea';
import Loading from '@/shared/ui/Loading';

export default async function TripDetailPage({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;

  const tripData = await getTripWithStatus(tripId);

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
