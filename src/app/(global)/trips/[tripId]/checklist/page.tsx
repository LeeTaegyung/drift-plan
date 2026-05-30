import { getDefaultChecklistByTripIdServer } from '@/entities/checklist/api/checklist.server';
import CheckListArea from '@/features/trips/checkList/ui/CheckListArea';

export default async function TripChecklistPage({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;
  const checkListData = await getDefaultChecklistByTripIdServer(tripId);

  if (!checkListData) throw new Error('체크리스트를 가져오지 못하였습니다.');

  return <CheckListArea initData={checkListData} tripId={tripId} />;
}
