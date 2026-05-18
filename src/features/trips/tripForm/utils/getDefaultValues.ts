import { TripsType } from '@/entities/trips/type';
import { COUNTRIES } from '@/shared/config/countries';

const createInitDomesticUnion = (initValues: TripsType) => {
  if (initValues.is_domestic) {
    return {
      is_domestic: true as const,
      region: initValues?.region ?? '',
      countries: null,
    };
  }

  return {
    is_domestic: false as const,
    region: null,
    countries: initValues.countries?.map((country) =>
      COUNTRIES.find((c) => c.name === country)
    ),
  };
};

export const getDefaultValues = (initValues?: TripsType) => {
  if (!initValues) {
    return {
      title: null,
      date: undefined,
      participants_count: 1,
      is_domestic: true as const,
      region: '',
      countries: null,
      background_image_url: null,
      background_color: null,
    };
  }

  return {
    title: initValues?.title,
    date: {
      from: new Date(initValues.start_date),
      to: new Date(initValues.end_date),
    },
    participants_count: initValues.participants_count,

    ...createInitDomesticUnion(initValues),

    background_image_url: initValues.background_image_url, // 추후 추가 예정
    background_color: initValues.background_color, // 추후 추가 예정
  };
};
