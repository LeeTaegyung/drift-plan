import { TripValuesType } from '@/entities/trips/type';
import { TripFormValues } from '@/features/trips/tripForm/model/tripForm.schema';
import { formatTripDate } from '@/shared/utils/dateUtils';

export const transformTripFormData = (
  data: Partial<
    Pick<TripFormValues, 'date' | 'is_domestic' | 'region' | 'countries'>
  >
) => {
  const result: Partial<TripValuesType> = {};

  if ('date' in data && data.date) {
    result.start_date = formatTripDate(data.date.from);
    result.end_date = formatTripDate(data.date.to || data.date.from);
  }

  if ('is_domestic' in data && data.is_domestic !== undefined) {
    result.is_domestic = data.is_domestic;
  }

  if ('region' in data && data.region !== undefined) {
    result.region = data.region;
  }

  if ('countries' in data && data.countries !== undefined) {
    result.countries = data.countries?.map((country) => country.name) ?? null;

    result.continent =
      data.countries === null
        ? null
        : Array.from(
            new Set(data.countries?.map((country) => country.continent))
          );
  }

  return result;
};
