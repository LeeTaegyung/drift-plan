export function convertTimeTaken(value: string): number;
export function convertTimeTaken(value: number): { hour: string; min: string };

export function convertTimeTaken(value: string | number) {
  if (typeof value === 'string') {
    const [hour, min] = value.split(':').map(Number);
    return hour * 60 + min;
  }

  const hour = Math.floor(value / 60);
  const hourText = hour === 0 ? '' : `${hour}`;
  const min = value % 60;
  const minText = min === 0 ? '' : `${min.toString().padStart(2, '0')}`;

  if (hourText === '' && minText === '') return null;

  return { hour: hourText, min: minText };
}

export const timeTakenToString = (hour: number, min: number) => {
  const hourText = ` ${hour}시간`;
  const minText = ` ${min}분`;

  return `약${hour ? hourText : ''}${min ? minText : ''} 소요`;
};
