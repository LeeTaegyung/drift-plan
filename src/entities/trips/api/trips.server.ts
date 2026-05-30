import { TripsViewType, TripValuesType } from '@/entities/trips/type';
import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_PAGE_SIZE,
} from '@/shared/constants/pagination';
import {
  createClient as createServerClient,
  supabaseFetch,
} from '@/shared/lib/supabase/server';

export const getTripsServer = async () => {
  const currentPage = DEFAULT_CURRENT_PAGE;
  const pageSize = DEFAULT_PAGE_SIZE;

  const from = (currentPage - 1) * pageSize;

  return supabaseFetch<TripsViewType[]>({
    path: `/trips_with_status?order=created_at.desc&limit=${pageSize}&offset=${from}`,
    tags: ['trip-list'],
  });
};

export const getTrip = async (tripId: string) => {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .eq('id', tripId)
    .single();

  if (error) throw error;

  return data;
};

export const getTripWithStatusServer = async (tripId: string) => {
  return await supabaseFetch<TripsViewType[]>({
    path: `/trips_with_status?id=eq.${tripId}`,
    tags: [`trip-${tripId}`],
  });
};

export const createTripServer = async (formValues: TripValuesType) => {
  const supabase = await createServerClient();
  return await supabase.from('trips').insert(formValues).select().single();
};

export const updateTripServer = async ({
  tripId,
  formData,
}: {
  tripId: string;
  formData: Partial<TripValuesType>;
}) => {
  const supabase = await createServerClient();
  return await supabase.from('trips').update(formData).eq('id', tripId);
};

export const deleteTripServer = async (tripId: string) => {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('trips')
    .delete()
    .eq('id', tripId);

  if (error) throw error;

  return data;
};
