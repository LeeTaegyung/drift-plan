'use server';

import { revalidateTag } from 'next/cache';

import { CheckListFormValues } from '@/features/trips/checkList/model/checklistForm.schema';
import { createClient } from '@/shared/lib/supabase/server';

export const updateCheckItemAction = async ({
  formData,
  id,
  tripId,
}: {
  formData: Partial<CheckListFormValues>;
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
