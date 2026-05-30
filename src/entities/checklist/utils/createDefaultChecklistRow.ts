import {
  DOMESTIC_CHECKLIST,
  INTERNATIONAL_CHECKLIST,
} from '@/shared/config/checklists';

export const createDefaultChecklistRow = (
  tripId: string,
  isDomestic: boolean
) => {
  const defaultChecklist = isDomestic
    ? DOMESTIC_CHECKLIST
    : INTERNATIONAL_CHECKLIST;

  let i = 0;
  return defaultChecklist.flatMap((category) =>
    category.items.map((item) => ({
      trip_id: tripId,
      category: category.category,
      name: item.name,
      quantity: item.quantity,
      memo: item.memo,
      done: false,
      order: i++,
    }))
  );
};
