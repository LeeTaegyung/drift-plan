import { getTrip } from '@/entities/trips/api/trips.server';
import TripEditForm from '@/features/trips/tripEdit/ui/TripEditForm';

export default async function TripsEditPage({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;

  const data = await getTrip(tripId);

  return <TripEditForm tripId={tripId} initData={data} />;
}
