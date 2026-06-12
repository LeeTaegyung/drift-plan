import { AccommodationCardFormValues } from '@/features/trips/tripSchedule/model/scheduleForm.schema';
import SDTable from '@/features/trips/tripSchedule/ui/TripScheduleContent/TripScheduleDetail/SDTable';
import { formatTimeToString } from '@/features/trips/tripSchedule/utils/formatTimeToString';
import { getDayByStringDate } from '@/shared/utils/dateUtils';

interface Props {
  detail: AccommodationCardFormValues['detail'];
}

export default function AccommodationDetailCard({ detail }: Props) {
  const term_date = detail.term_date as string | null;

  return (
    <SDTable className='max-w-180'>
      <SDTable.Tbody>
        <SDTable.Tr>
          <SDTable.Th>예약 플랫폼</SDTable.Th>
          <SDTable.Td colSpan={2}>{detail.platform ?? '-'}</SDTable.Td>
          <SDTable.Th>예약 번호</SDTable.Th>
          <SDTable.Td colSpan={2}>{detail.platform_ref ?? '-'}</SDTable.Td>
        </SDTable.Tr>
        <SDTable.Tr>
          <SDTable.Th>숙소명</SDTable.Th>
          <SDTable.Td colSpan={2}>{detail.accommodation_name}</SDTable.Td>
          <SDTable.Th>도시</SDTable.Th>
          <SDTable.Td colSpan={2}>{detail.city ?? '-'}</SDTable.Td>
        </SDTable.Tr>
        <SDTable.Tr>
          <SDTable.Th>주소</SDTable.Th>
          <SDTable.Td colSpan={5}>{detail.address ?? '-'}</SDTable.Td>
        </SDTable.Tr>
        <SDTable.Tr>
          <SDTable.Th>기간</SDTable.Th>
          <SDTable.Td colSpan={2}>
            {term_date
              ? `${term_date.split('~')[0]} (${getDayByStringDate(term_date.split('~')[0])}) ~ ${term_date.split('~')[1]} (${getDayByStringDate(term_date.split('~')[1])})`
              : '-'}
          </SDTable.Td>
          <SDTable.Th>룸타입</SDTable.Th>
          <SDTable.Td colSpan={2}>{detail.room_type ?? '-'}</SDTable.Td>
        </SDTable.Tr>
        <SDTable.Tr>
          <SDTable.Th>체크인</SDTable.Th>
          <SDTable.Td>
            {formatTimeToString(detail.check_in_hour, detail.check_in_min)}
          </SDTable.Td>
          <SDTable.Th>체크아웃</SDTable.Th>
          <SDTable.Td>
            {formatTimeToString(detail.check_out_hour, detail.check_out_min)}
          </SDTable.Td>
          <SDTable.Th>도시세</SDTable.Th>
          <SDTable.Td>
            {detail.city_tax_currency} {detail.city_tax ?? '-'}
          </SDTable.Td>
        </SDTable.Tr>
        <SDTable.Tr>
          <SDTable.Th>수건</SDTable.Th>
          <SDTable.Td>{detail.has_towel ? 'O' : 'X'}</SDTable.Td>
          <SDTable.Th>주방</SDTable.Th>
          <SDTable.Td>{detail.has_kitchen ? 'O' : 'X'}</SDTable.Td>
          <SDTable.Th>세탁실</SDTable.Th>
          <SDTable.Td>{detail.has_laundry ? 'O' : 'X'}</SDTable.Td>
        </SDTable.Tr>
      </SDTable.Tbody>
    </SDTable>
  );
}
