import { Suspense } from 'react';

import TripDetailArea from '@/features/trips/tripDetail/ui/TripDetailArea';
import LoadingArea from '@/shared/ui/loading/LoadingArea';

export default async function TripDetailPage({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;

  return (
    <Suspense fallback={<LoadingArea />}>
      <TripDetailArea tripId={tripId} />
    </Suspense>
  );
}
