import { TripScheduleCardType } from '@/entities/trips/type';

export const reorderCards = (cards: TripScheduleCardType[], order: number) => {
  return cards.map((c, idx) => ({
    ...c,
    order_index: order + idx,
  }));
};
