import { getTripsServer } from '@/entities/trips/api/trips.server';
import TripListArea from '@/features/trips/tripList/ui/TripListArea';
import { DEFAULT_PAGE_SIZE } from '@/shared/constants/pagination';

export default async function TripsPage() {
  const data = await getTripsServer();

  return (
    <TripListArea
      initData={{
        data: data,
        total: data.length,
        totalPages: Math.ceil(data.length / DEFAULT_PAGE_SIZE),
      }}
    />
  );
}
