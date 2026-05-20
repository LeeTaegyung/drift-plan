import {
  createDefaultChecklist,
  deleteDefaultChecklist,
} from '@/entities/checklist/api/checklist.api';
import { updateTrip } from '@/entities/trips/api/trips.api';
import { TripValuesType } from '@/entities/trips/type';

export const editTripWithDefaultChecklist = async ({
  tripId,
  formData,
}: {
  tripId: string;
  formData: Partial<TripValuesType>;
}) => {
  const { error: tripError } = await updateTrip({
    tripId,
    formData,
  });

  if (tripError) throw tripError;

  // 국내/해외 변경되었다면,
  if ('is_domestic' in formData && formData.is_domestic !== undefined) {
    // 기존 기본 체크리스트 삭제
    const { error: deleteChecklistError } =
      await deleteDefaultChecklist(tripId);

    if (deleteChecklistError) throw deleteChecklistError;

    // 변경된 데이터를 기반으로 새로 생성
    const { error: checklistError } = await createDefaultChecklist(
      tripId,
      formData.is_domestic
    );

    if (checklistError) throw checklistError;
  }

  // 일정이 변경되었다면, 기존 상세 일정 삭제 되도록 추후 추가
};
