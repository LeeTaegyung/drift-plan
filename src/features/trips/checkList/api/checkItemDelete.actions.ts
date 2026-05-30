'use server';

import { revalidateTag } from 'next/cache';

import { createClient } from '@/shared/lib/supabase/server';

export const deleteCheckItemAction = async ({
  ids,
  tripId,
}: {
  ids: string[];
  tripId: string;
}) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from('trip_checklist')
    .delete()
    .in('id', ids);

  if (error) throw error;

  revalidateTag(`checklist-${tripId}`, 'max');
};
