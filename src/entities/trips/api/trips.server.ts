import { TripsViewType, TripValuesType } from '@/entities/trips/type';
import { createClient as createServerClient } from '@/shared/lib/supabase/server';

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

export const getTripWithStatusServer = async (
  tripId: string
): Promise<TripsViewType> => {
  const supabase = await createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error('인증 토큰을 찾을 수 없습니다.');
  }

  const accessToken = session.access_token;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/trips_with_status?id=eq.${tripId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
