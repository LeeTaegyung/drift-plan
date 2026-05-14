import { GetTripsResponse, TripValuesType } from '@/entities/trips/type';
import { createClient } from '@/shared/lib/supabase/client';

const supabase = createClient();

const DEFAULT_CURRENT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 12;

export const getTrips = async ({
  is_domestic,
  start_date,
  end_date,
  currentPage = DEFAULT_CURRENT_PAGE,
  pageSize = DEFAULT_PAGE_SIZE,
}: {
  is_domestic?: boolean;
  start_date?: string;
  end_date?: string;
  currentPage?: number;
  pageSize?: number;
}): Promise<GetTripsResponse> => {
  let query = supabase
    .from('trips_with_status')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  if (is_domestic !== undefined) {
    query = query.eq('is_domestic', is_domestic);
  }

  if (start_date !== undefined) {
    query = query.gte('start_date', start_date);
  }

  if (end_date !== undefined) {
    query = query.lte('end_date', end_date);
  }

  const from = (currentPage - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, count, error } = await query.range(from, to);

  if (error) throw error;

  return {
    data: data || [],
    total: count || 0,
    totalPages: Math.ceil((count || 0) / pageSize),
  };
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

export const deleteTrip = async (tripId: string) => {
  const { data, error } = await supabase
    .from('trips')
    .delete()
    .eq('id', tripId);

  if (error) throw error;

  return data;
};
