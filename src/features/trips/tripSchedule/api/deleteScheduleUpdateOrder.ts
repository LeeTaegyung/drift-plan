import {
  deleteTripSchedule,
  updateTripScheduleOrderIdx,
} from '@/entities/trips/api/trips.api';
import { TripScheduleCardType } from '@/entities/trips/type';

export const deleteScheduleUpdateOrder = async ({
  id,
  cards,
}: {
  id: string;
  cards: TripScheduleCardType[];
}) => {
  const { error: deleteError } = await deleteTripSchedule(id);

  if (deleteError) {
    throw new Error('일정 카드 삭제에 실패하였습니다.');
  }

  const { error: updateOrderIdxError } =
    await updateTripScheduleOrderIdx(cards);

  if (updateOrderIdxError) {
    throw new Error('일정 카드 순서 재정렬를 하지 못하였습니다.');
  }
};
