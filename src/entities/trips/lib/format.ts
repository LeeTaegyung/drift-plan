import { TripsStatusType, TripsViewType } from '@/entities/trips/type';

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
}: Pick<
  TripsViewType,
  'is_domestic' | 'continent' | 'countries' | 'region'
>) => {
  // 국내인 경우, ㅇㅇ 여행 표시
  if (is_domestic) return region;

  // 해외인 경우,
  // 나라가 2개 이상이면,
  if (countries!.length >= 2) {
    const altText = continent!.length >= 2 ? '전세계' : continent![0];

    return altText;
  } else {
    return countries![0];
  }
};

export const getTripTitleLabel = ({
  title,
  is_domestic,
  continent,
  countries,
  region,
}: Pick<
  TripsViewType,
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
