'use server';

import { revalidateTag } from 'next/cache';

import { TripCheckListType } from '@/entities/checklist/type';
import { createClient } from '@/shared/lib/supabase/server';

export const createCheckItemAction = async ({
  formData,
  tripId,
}: {
  formData: Omit<TripCheckListType, 'user_id' | 'id' | 'created_at'>;
  tripId: string;
}) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from('trip_checklist')
    .insert(formData)
    .select()
    .single();

  if (error) throw error;

  revalidateTag(`checklist-${tripId}`, 'max');
};
