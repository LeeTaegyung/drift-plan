import { Suspense } from 'react';

import TripEditForm from '@/features/trips/tripEdit/ui/TripEditForm';
import LoadingArea from '@/shared/ui/loading/LoadingArea';

export default async function TripsEditPage({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;

  return (
    <Suspense fallback={<LoadingArea />}>
      <TripEditForm tripId={tripId} />
    </Suspense>
  );
}
