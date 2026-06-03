import TripScheduleArea from '@/features/trips/tripSchedule/ui/TripScheduleArea';

interface Props {
  params: Promise<{ tripId: string; dateId: string }>;
}

export default async function TripScheduleDetailPage({ params }: Props) {
  const { tripId, dateId } = await params;

  if (!tripId || !dateId) {
    throw new Error('잘못된 페이지입니다.');
  }

  return <TripScheduleArea tripId={tripId} dateId={dateId} />;
}
