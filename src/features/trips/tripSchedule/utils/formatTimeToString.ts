export const formatTimeToString = (hour: number | null, min: number | null) => {
  if (hour === null && min === null) return '-';

  return `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
};
