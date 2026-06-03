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

// 국가/지역별 현지연락처 공공데이터 Response Data
export interface CountryResponse {
  response: {
    body: {
      dataType: string;
      items: CountryResponseItemType[];
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
    header: { resultCode: string; resultMsg: string };
  };
}

// 국가/지역별 현지연락처 공공데이터 items
export interface CountryResponseItemType {
  contact_remark: string;
  continent_cd: string;
  continent_eng_nm: string;
  continent_nm: string;
  country_eng_nm: string;
  country_iso_alp2: string;
  country_nm: string;
  dang_map_download_url: string | null;
  flag_download_url: string | null;
  map_download_url: string | null;
  wrt_dt: string | null;
}

export type TripScheduleCardType =
  Database['public']['Tables']['trip_schedule_cards']['Row'];

export type TripScheduleCardFormType = Omit<
  TripScheduleCardType,
  'id' | 'create_at' | 'updated_at'
>;
