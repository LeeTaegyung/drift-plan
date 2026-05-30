import { TripCheckListType } from '@/entities/checklist/type';
import { createDefaultChecklistRow } from '@/entities/checklist/utils/createDefaultChecklistRow';
import {
  createClient as createServerClient,
  supabaseFetch,
} from '@/shared/lib/supabase/server';

export const getDefaultChecklistByTripIdServer = async (tripId: string) => {
  return await supabaseFetch<TripCheckListType[]>({
    path: `/trip_checklist?trip_id=eq.${tripId}&order=order.asc`,
    tags: [`checklist-${tripId}`],
  });
};

export const createDefaultChecklistServer = async (
  tripId: string,
  isDomestic: boolean
) => {
  const supabase = await createServerClient();

  const checklistRows = createDefaultChecklistRow(tripId, isDomestic);

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
