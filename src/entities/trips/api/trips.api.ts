import {
  CountryResponseItemType,
  GetTripsResponse,
  TripScheduleCardFormType,
  TripScheduleCardType,
  TripValuesType,
} from '@/entities/trips/type';
import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_PAGE_SIZE,
} from '@/shared/constants/pagination';
import { createClient } from '@/shared/lib/supabase/client';

const supabase = createClient();

export const getTrips = async (id: string) => {
  const { data, error } = await supabase.from('trips').select('*').eq('id', id);

  if (error) throw error;

  return data;
};

export const getTrip = async (id: string) => {
  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;

  return data;
};

export const getTripsWithStatus = async ({
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
    .order('start_date', { ascending: false });

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

export const getTripWithStatus = async (tripId: string) => {
  const { data, error } = await supabase
    .from('trips_with_status')
    .select('*')
    .eq('id', tripId)
    .single();

  if (error) throw error;

  return data;
};

export const createTrip = async (formValues: TripValuesType) => {
  return await supabase.from('trips').insert(formValues).select().single();
};

export const updateTrip = async ({
  tripId,
  formData,
}: {
  tripId: string;
  formData: Partial<TripValuesType>;
}) => {
  return await supabase.from('trips').update(formData).eq('id', tripId);
};

export const deleteTrip = async (tripId: string) => {
  const { data, error } = await supabase
    .from('trips')
    .delete()
    .eq('id', tripId);

  if (error) throw error;

  return data;
};

// 해외여행시 해당 나라의 정보 불러오기(공공데이터)
export const fetchDataGoCountries = async (
  code: string
): Promise<{ item: CountryResponseItemType[] }> => {
  const res = await fetch(`/api/countries?code=${code}`);
  const { data } = await res.json();

  return data;
};

export const getTripSchedulesByDateId = async (
  tripId: string,
  dateId: string
): Promise<TripScheduleCardType[]> => {
  const { data, error } = await supabase
    .from('trip_schedule_cards')
    .select('*')
    .eq('trip_id', tripId)
    .eq('date', dateId)
    .order('order_index', { ascending: true })
    .select();

  if (error) throw error;

  return data;
};

export const createTripSchedule = async (
  formValues: TripScheduleCardFormType
) => {
  return await supabase
    .from('trip_schedule_cards')
    .insert(formValues)
    .select()
    .single();
};

export const updateTripSchedule = async ({
  formData,
  id,
}: {
  formData: Partial<TripScheduleCardFormType>;
  id: string;
}) => {
  return await supabase
    .from('trip_schedule_cards')
    .update(formData)
    .eq('id', id);
};

export const deleteTripSchedule = async (id: string) => {
  return await supabase
    .from('trip_schedule_cards')
    .delete()
    .eq('id', id)
    .select()
    .single();
};

export const updateTripScheduleOrderIdx = async (
  cards: TripScheduleCardType[]
) => {
  return await supabase.from('trip_schedule_cards').upsert(cards);
};
