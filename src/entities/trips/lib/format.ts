import {
  TripsStatusType,
  TripsUiType,
  TripsViewType,
} from '@/entities/trips/type';

export const getTripStatus = (value: string): TripsStatusType => {
  if (value === 'before' || value === 'during' || value === 'after') {
    return value;
  }
  return 'before';
};

export const getTripLocationLabel = ({
  is_domestic,
  continent,
  countries,
  region,
}: Pick<TripsUiType, 'is_domestic' | 'continent' | 'countries' | 'region'>) => {
  if (is_domestic) {
    // 국내인 경우, ㅇㅇ 여행 표시
    return region || '';
  }

  if (!countries) return null;

  // 해외인 경우,
  // 나라가 2개 이상이면,
  if (countries.length >= 2) {
    if (!continent) return null;

    const altText = continent.length >= 2 ? '전세계' : continent[0];

    return altText;
  } else {
    return countries[0];
  }
};

export const getTripTitleLabel = ({
  title,
  is_domestic,
  continent,
  countries,
  region,
}: Pick<
  TripsUiType,
  'title' | 'is_domestic' | 'continent' | 'countries' | 'region'
>) => {
  if (title) return title;

  const altText = getTripLocationLabel({
    is_domestic,
    continent,
    countries,
    region,
  });

  return `${altText} 여행`;
};

export const getParticipantsLabel = (count: number) => {
  return count === 1 ? '나혼자' : `${count}명`;
};

// view table의 trips 타입을 UI용으로 변환
export const generateTrip = (trip: TripsViewType): TripsUiType => {
  return {
    id: trip.id || '',
    user_id: trip.user_id || '',
    is_domestic: trip.is_domestic ?? false,
    start_date: trip.start_date || '',
    end_date: trip.end_date || '',
    participants_count: trip.participants_count ?? 1,
    status: trip.status ?? 'before',

    title: trip.title,
    region: trip.region,
    countries: trip.countries,
    continent: trip.continent,
    background_color: trip.background_color,
    background_image_url: trip.background_image_url,
  };
};
