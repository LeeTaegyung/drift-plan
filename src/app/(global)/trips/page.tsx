import { Suspense } from 'react';

import TripListArea from '@/features/trips/tripList/ui/TripListArea';
import LoadingArea from '@/shared/ui/loading/LoadingArea';

export default function TripsPage() {
  return (
    <Suspense fallback={<LoadingArea />}>
      <TripListArea />
    </Suspense>
  );
}
