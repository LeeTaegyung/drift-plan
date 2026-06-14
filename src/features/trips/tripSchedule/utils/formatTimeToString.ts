export const formatTimeToString = (hour: number | null, min: number | null) => {
  if (hour === null && min === null) return '-';

  return `${String(hour ?? '00').padStart(2, '0')}:${String(min ?? '00').padStart(2, '0')}`;
};
