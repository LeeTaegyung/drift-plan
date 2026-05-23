import { TripsViewType } from '@/entities/trips/type';
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

export const getTripWithStatusServer = async (
  tripId: string
): Promise<TripsViewType> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/trips_with_status?id=eq.${tripId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY}`,
        apikey: `${process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY}`,
      },
      next: {
        revalidate: 3600,
        tags: [`trip-${tripId}`],
      },
    }
  );

  if (!res.ok) throw new Error(`${res.status} : 에러 발생!`);

  const tripData = await res.json();

  return tripData[0];
};
