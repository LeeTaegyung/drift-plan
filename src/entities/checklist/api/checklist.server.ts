import { TripCheckListType } from '@/entities/checklist/type';
import {
  DOMESTIC_CHECKLIST,
  INTERNATIONAL_CHECKLIST,
} from '@/shared/config/checklists';
import { createClient as createServerClient } from '@/shared/lib/supabase/server';

export const getDefaultChecklistByTripIdServer = async (tripId: string) => {
  const supabase = await createServerClient();
  return await supabase
    .from('trip_checklist')
    .select('*')
    .eq('trip_id', tripId);
};

export const createDefaultChecklistServer = async (
  tripId: string,
  isDomestic: boolean
) => {
  const supabase = await createServerClient();
  const defaultChecklist = isDomestic
    ? DOMESTIC_CHECKLIST
    : INTERNATIONAL_CHECKLIST;

  const checklistRows = defaultChecklist.flatMap((category) =>
    category.items.map((item) => ({
      trip_id: tripId,
      category: category.category,
      name: item.name,
      quantity: item.quantity,
      memo: item.memo,
      done: false,
    }))
  );

  return await supabase.from('trip_checklist').insert(checklistRows);
};

export const deleteDefaultChecklistServer = async (tripId: string) => {
  const supabase = await createServerClient();
  return await supabase.from('trip_checklist').delete().eq('trip_id', tripId);
};

export const createDefaultChecklistWithDataServer = async (
  previousChecklist: TripCheckListType[]
) => {
  const supabase = await createServerClient();
  return await supabase.from('trip_checklist').insert(previousChecklist);
};
