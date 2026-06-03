import { Suspense } from 'react';

import CheckListArea from '@/features/trips/checkList/ui/CheckListArea';
import LoadingArea from '@/shared/ui/loading/LoadingArea';

export default async function TripChecklistPage({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;

  return (
    <Suspense fallback={<LoadingArea />}>
      <CheckListArea tripId={tripId} />
    </Suspense>
  );
}
