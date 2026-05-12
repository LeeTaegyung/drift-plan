import { TripValuesType } from '@/entities/trips/type';
import { createClient } from '@/shared/lib/supabase/client';

const supabase = createClient();

export const getTrips = async (filters?: {
  is_domestic?: boolean;
  start_date?: string;
  end_date?: string;
}) => {
  let query = supabase
    .from('trips_with_status')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters?.is_domestic !== undefined) {
    query = query.eq('is_domestic', filters.is_domestic);
  }

  if (filters?.start_date !== undefined) {
    query = query.gte('start_date', filters.start_date);
  }

  if (filters?.end_date !== undefined) {
    query = query.lte('end_date', filters.end_date);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data;
};

export const createTrip = async (formValues: TripValuesType) => {
  const { data, error } = await supabase
    .from('trips')
    .insert(formValues)
    .select()
    .single();

  if (error) throw error;

  return data;
};
