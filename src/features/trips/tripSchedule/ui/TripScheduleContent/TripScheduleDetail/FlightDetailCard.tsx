import { FlightCardFormValues } from '@/features/trips/tripSchedule/model/scheduleForm.schema';

interface Props {
  detail: FlightCardFormValues['detail'];
}

export default function FlightDetailCard({ detail }: Props) {
  return <div>항공권 카드</div>;
}
