'use server';

import { revalidateTag } from 'next/cache';

import {
  createDefaultChecklistServer,
  createDefaultChecklistWithDataServer,
  deleteDefaultChecklistServer,
  getDefaultChecklistByTripIdServer,
} from '@/entities/checklist/api/checklist.server';
import { updateTripServer } from '@/entities/trips/api/trips.server';
import { TripValuesType } from '@/entities/trips/type';

export const updateTripWithDefaultSettingAction = async ({
  tripId,
  formData,
  backupData,
}: {
  tripId: string;
  formData: Partial<TripValuesType>;
  backupData: TripValuesType;
}) => {
  const { error: tripError } = await updateTripServer({
    tripId,
    formData,
  });

  if (tripError) throw tripError;

  // 국내/해외 변경되었다면,
  if ('is_domestic' in formData && formData.is_domestic !== undefined) {
    // 기존 체크 리스트 백업
    const { data: previousChecklist } =
      await getDefaultChecklistByTripIdServer(tripId);

    // 기존 기본 체크리스트 삭제
    const { error: deleteChecklistError } =
      await deleteDefaultChecklistServer(tripId);

    // 체크리스트 삭제 실패시
    if (deleteChecklistError) {
      // 여행 데이터 원복
      await updateTripServer({
        tripId,
        formData: backupData,
      });
      throw deleteChecklistError;
    }

    // 변경된 데이터를 기반으로 새로 생성
    const { error: checklistError } = await createDefaultChecklistServer(
      tripId,
      formData.is_domestic
    );

    // 체크리스트 재설정 실패시
    if (checklistError) {
      // 기존 체크리스트로 원복
      if (previousChecklist) {
        await createDefaultChecklistWithDataServer(previousChecklist);
      }

      // 여행 데이터 원복
      await updateTripServer({
        tripId,
        formData: backupData,
      });

      throw checklistError;
    }

    // 기존 상제 일정 초기화
  }

  // 여행지나 나라가 변경되었다면 기존 상제 일정 초기화

  // next cache 초기화
  revalidateTag(`trip-${tripId}`, 'max');
};
