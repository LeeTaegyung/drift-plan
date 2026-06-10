import { AttractionCardFormValues } from '@/features/trips/tripSchedule/model/scheduleForm.schema';

interface Props {
  detail: AttractionCardFormValues['detail'];
}

export default function AttractionDetailCard({ detail }: Props) {
  return <div>관광지 카드</div>;
}
