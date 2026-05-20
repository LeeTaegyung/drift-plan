import { createDefaultChecklist } from '@/entities/checklist/api/checklist.api';
import { createTrip, deleteTrip } from '@/entities/trips/api/trips.api';
import { TripValuesType } from '@/entities/trips/type';

export const createTripWithDefaultChecklist = async (
  formData: TripValuesType
) => {
  const { data: trip, error: tripError } = await createTrip(formData);

  if (tripError) throw tripError;
  if (!trip) throw new Error('여행 등록 실패하였습니다.');

  const { error: checklistError } = await createDefaultChecklist(
    trip.id,
    formData.is_domestic
  );

  if (checklistError) {
    // 기본 체크리스트 생성 실패시 생성된 여행 삭제
    await deleteTrip(trip.id);
    throw checklistError;
  }

  return trip;
};
