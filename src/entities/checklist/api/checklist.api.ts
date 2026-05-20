import { TripCheckListType } from '@/entities/checklist/type';
import {
  DOMESTIC_CHECKLIST,
  INTERNATIONAL_CHECKLIST,
} from '@/shared/config/checklists';
import { createClient } from '@/shared/lib/supabase/client';

const supabase = createClient();

export const createDefaultChecklist = async (
  tripId: string,
  isDomestic: boolean
) => {
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
