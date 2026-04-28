import { Database } from '@/shared/lib/supabase/database.types';

// status 포함되어 있는 View 테이블
export type TripsViewType =
  Database['public']['Views']['trips_with_status']['Row'];

// status 없는 DB 테이블
export type TripsType = Database['public']['Tables']['trips']['Row'];

export type TripsStatusType = 'before' | 'during' | 'after';
