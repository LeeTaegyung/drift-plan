import { AccommodationCardFormValues } from '@/features/trips/tripSchedule/model/scheduleForm.schema';

interface Props {
  detail: AccommodationCardFormValues['detail'];
}

export default function AccommodationDetailCard({ detail }: Props) {
  return <div>숙소 카드</div>;
}
