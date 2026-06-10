import { TourCardFormValues } from '@/features/trips/tripSchedule/model/scheduleForm.schema';

interface Props {
  detail: TourCardFormValues['detail'];
}

export default function TourDetailCard({ detail }: Props) {
  return <div>투어 카드</div>;
}
