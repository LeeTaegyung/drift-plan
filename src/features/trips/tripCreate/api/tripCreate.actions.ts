'use server';

import { revalidateTag } from 'next/cache';

import { createDefaultChecklistServer } from '@/entities/checklist/api/checklist.server';
import {
  createTripServer,
  deleteTripServer,
} from '@/entities/trips/api/trips.server';
import { TripValuesType } from '@/entities/trips/type';

export const createTripWithDefaultChecklistAction = async (
  formData: TripValuesType
) => {
  const { data: trip, error: tripError } = await createTripServer(formData);

  if (tripError) throw tripError;
  if (!trip) throw new Error('여행 등록 실패하였습니다.');

  const { error: checklistError } = await createDefaultChecklistServer(
    trip.id,
    formData.is_domestic
  );

  if (checklistError) {
    // 기본 체크리스트 생성 실패시 생성된 여행 삭제
    await deleteTripServer(trip.id);
    throw checklistError;
  }

  revalidateTag('trip-list', 'max');
};
