import { createClient } from '@/shared/lib/supabase/server';

export const getTrip = async (tripId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .eq('id', tripId)
    .single();

  if (error) throw error;

  return data;
};
