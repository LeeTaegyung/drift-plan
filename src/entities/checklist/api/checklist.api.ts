import { TripCheckListType } from '@/entities/checklist/type';
import { createDefaultChecklistRow } from '@/entities/checklist/utils/createDefaultChecklistRow';
import { createClient } from '@/shared/lib/supabase/client';

const supabase = createClient();

export const createDefaultChecklist = async (
  tripId: string,
  isDomestic: boolean
) => {
  const checklistRows = createDefaultChecklistRow(tripId, isDomestic);

  return await supabase.from('trip_checklist').insert(checklistRows);
};

export const deleteDefaultChecklist = async (tripId: string) => {
  return await supabase.from('trip_checklist').delete().eq('trip_id', tripId);
};

export const createCheckItem = async (
  checkItem: Omit<TripCheckListType, 'id' | 'user_id' | 'created_at'>
) => {
  const { data, error } = await supabase
    .from('trip_checklist')
    .insert(checkItem)
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const deleteCheckItem = async (id: string) => {
  const { data, error } = await supabase
    .from('trip_checklist')
    .delete()
    .eq('id', id);

  if (error) throw error;

  return data;
};

export const getDefaultChecklistByTripId = async (tripId: string) => {
  const { data, error } = await supabase
    .from('trip_checklist')
    .select('*')
    .order('order', { ascending: true })
    .eq('trip_id', tripId);

  if (error) throw error;

  return data;
};
