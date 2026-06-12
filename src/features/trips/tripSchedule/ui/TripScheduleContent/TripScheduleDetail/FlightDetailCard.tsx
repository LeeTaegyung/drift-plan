import { Fragment } from 'react/jsx-runtime';

import { FlightCardFormValues } from '@/features/trips/tripSchedule/model/scheduleForm.schema';
import SDTable from '@/features/trips/tripSchedule/ui/TripScheduleContent/TripScheduleDetail/SDTable';
import { formatTimeToString } from '@/features/trips/tripSchedule/utils/formatTimeToString';

interface Props {
  detail: FlightCardFormValues['detail'];
}

const FLIGHT_TYPE = {
  outbound: '출국편',
  inbound: '귀국편',
};

export default function FlightDetailCard({ detail }: Props) {
  const { flight_type, platform, segments } = detail;

  return (
    <SDTable>
      <SDTable.Tbody>
        <SDTable.Tr>
          <SDTable.Th>여정 구분</SDTable.Th>
          <SDTable.Td colSpan={2}>{FLIGHT_TYPE[flight_type]}</SDTable.Td>
          <SDTable.Th>예약 플랫폼</SDTable.Th>
          <SDTable.Td colSpan={2}>{platform ?? '-'}</SDTable.Td>
        </SDTable.Tr>
        {segments.map((segment, idx) => (
          <Fragment key={`segment-${idx}`}>
            {segments.length > 1 && (
              <SDTable.Tr>
                <SDTable.Th
                  colSpan={6}
                  className='bg-surface text-text-primary text-left'
                >
                  경유{idx + 1}
                </SDTable.Th>
              </SDTable.Tr>
            )}
            <SDTable.Tr>
              <SDTable.Th>출발지</SDTable.Th>
              <SDTable.Td colSpan={2}>{segment.departure}</SDTable.Td>
              <SDTable.Th>도착지</SDTable.Th>
              <SDTable.Td colSpan={2}>{segment.arrival}</SDTable.Td>
            </SDTable.Tr>
            <SDTable.Tr>
              <SDTable.Th>출발 시간</SDTable.Th>
              <SDTable.Td colSpan={2}>
                {formatTimeToString(
                  segment.departure_time_hour,
                  segment.departure_time_min
                )}
              </SDTable.Td>
              <SDTable.Th>도착 시간</SDTable.Th>
              <SDTable.Td colSpan={2}>
                {formatTimeToString(
                  segment.arrival_time_hour,
                  segment.arrival_time_min
                )}
              </SDTable.Td>
            </SDTable.Tr>
            <SDTable.Tr>
              <SDTable.Th>항공사명</SDTable.Th>
              <SDTable.Td>{segment.airline ?? '-'}</SDTable.Td>
              <SDTable.Th>항공기 편명</SDTable.Th>
              <SDTable.Td>{segment.flight_number ?? '-'}</SDTable.Td>
              <SDTable.Th>항공사 예약번호</SDTable.Th>
              <SDTable.Td>{segment.booking_ref ?? '-'}</SDTable.Td>
            </SDTable.Tr>
            <SDTable.Tr>
              <SDTable.Th>좌석</SDTable.Th>
              <SDTable.Td>{segment.seat ?? '-'}</SDTable.Td>
              <SDTable.Th>기내수하물 중량</SDTable.Th>
              <SDTable.Td>
                {segment.carry_on_weight ? `${segment.carry_on_weight}kg` : '-'}
              </SDTable.Td>
              <SDTable.Th>위탁수하물 중량</SDTable.Th>
              <SDTable.Td>
                {segment.checked_bag_weight
                  ? `${segment.carry_on_weight}kg`
                  : '-'}
              </SDTable.Td>
            </SDTable.Tr>
          </Fragment>
        ))}
      </SDTable.Tbody>
    </SDTable>
  );
}
