export function convertTimeTaken(value: string): number;
export function convertTimeTaken(value: number): string;

export function convertTimeTaken(value: string | number) {
  if (typeof value === 'string') {
    const [hour, min] = value.split(':').map(Number);
    return hour * 60 + min;
  }

  const hour = Math.floor(value / 60);
  const hourText = hour === 0 ? '' : `${hour}시간`;
  const min = value % 60;
  const minText = min === 0 ? '' : `${min.toString().padStart(2, '0')}분`;

  if (hourText === '' && minText === '') return null;

  return `약 ${hourText} ${minText} 소요`;
}
