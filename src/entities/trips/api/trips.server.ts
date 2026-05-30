import { TripsViewType, TripValuesType } from '@/entities/trips/type';
import {
  createClient as createServerClient,
  supabaseFetch,
} from '@/shared/lib/supabase/server';

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
