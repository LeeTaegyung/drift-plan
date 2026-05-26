import { formatTripDate } from '@/shared/utils/dateUtils';

interface CalendarDay {
  day: number | null;
  dateId: string | null;
}

type CalendarWeek = CalendarDay[];

interface CalendarMonth {
  year: number;
  month: number;
  weeks: CalendarWeek[];
}

export function createCalendar(start_date: string, end_date: string) {
  const calendar: CalendarMonth[] = [];

  const startDate = new Date(start_date); // 읽기 전용 여행 시작 날짜
  const endDate = new Date(end_date); // 읽기 전용 여행 마지막 날짜

  // 정확한 비교를 위한 시간 초기화
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();

  const currentYM = new Date(startYear, startMonth, 1); // 년도와 월 비교용

  // 여행 날짜 년도와 월 기준으로 반복문
  while (currentYM <= endDate) {
    const year = currentYM.getFullYear();
    const month = currentYM.getMonth();

    const currentDate = new Date(year, month, 1); // 일자 비교용
    const lastDate = new Date(year, month + 1, 0);
    const startWeekday = currentDate.getDay();
    const lastWeekDay = lastDate.getDay();

    const week: CalendarWeek = [];

    // 월 기준 1일 부터 말일까지 반복문
    while (currentDate <= lastDate) {
      week.push({
        day: currentDate.getDate(),
        dateId:
          startDate <= currentDate && currentDate <= endDate
            ? formatTripDate(currentDate)
            : null,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    // 앞뒤 빈열만큼 null 추가
    const allWeeks = [
      ...Array.from({ length: startWeekday }, () => ({
        day: null,
        dateId: null,
      })),
      ...week,
      ...Array.from({ length: 6 - lastWeekDay }, () => ({
        day: null,
        dateId: null,
      })),
    ];

    // 7일 기준으로 slice
    const weeks: CalendarWeek[] = [];
    for (let i = 0; i < allWeeks.length; i += 7) {
      weeks.push(allWeeks.slice(i, i + 7));
    }

    // 월은 렌더링용으로 보여주도록 미리 계산
    calendar.push({ year, month: month + 1, weeks });

    currentYM.setMonth(currentYM.getMonth() + 1);
  }

  return calendar;
}
