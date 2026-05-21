import { format } from 'date-fns';

import { DAY_NUMBER_MATCH } from '@/shared/constants/date';

export const formatTripDate = (date: Date) => {
  return format(date, 'yyyy.MM.dd');
};

export const getDayByStringDate = (date: string) => {
  const d = new Date(date);
  const day = d.getDay();
  return DAY_NUMBER_MATCH[day];
};
