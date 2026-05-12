import { format } from 'date-fns';

export const formatTripDate = (date: Date) => {
  return format(date, 'yyyy-MM-DD');
};
