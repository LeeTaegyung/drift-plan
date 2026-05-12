import { Database } from '@/shared/lib/supabase/database.types';

// status 포함되어 있는 View 테이블
export type TripsViewType =
  Database['public']['Views']['trips_with_status']['Row'];

// status 없는 DB 테이블
export type TripsType = Database['public']['Tables']['trips']['Row'];

export type TripsStatusType = 'before' | 'during' | 'after';

// trips ui용 타입(status 포함)
export type TripsUiType = Required<
  Pick<
    TripsViewType,
    | 'id'
    | 'user_id'
    | 'is_domestic'
    | 'start_date'
    | 'end_date'
    | 'participants_count'
    | 'status'
  >
> & {
  title: string | null;
  region: string | null;
  countries: string[] | null;
  continent: string[] | null;
  background_color: string | null;
  background_image_url: string | null;
};

export type TripValuesType = Omit<
  TripsType,
  'id' | 'user_id' | 'updated_at' | 'created_at'
>;

export interface GetTripsResponse {
  data: TripsViewType[];
  total: number;
  totalPages: number;
}
