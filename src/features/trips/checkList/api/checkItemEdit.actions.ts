'use server';

import { revalidateTag } from 'next/cache';

import { TripCheckListType } from '@/entities/checklist/type';
import { createClient } from '@/shared/lib/supabase/server';

export const updateCheckItemAction = async ({
  formData,
  id,
  tripId,
}: {
  formData: Partial<TripCheckListType>;
  id: string;
  tripId: string;
}) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from('trip_checklist')
    .update(formData)
    .eq('id', id);

  if (error) throw error;

  revalidateTag(`checklist-${tripId}`, 'max');
};
