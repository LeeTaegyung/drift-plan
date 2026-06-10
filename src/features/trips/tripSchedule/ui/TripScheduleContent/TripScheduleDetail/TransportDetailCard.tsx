import { TransportCardFormValues } from '@/features/trips/tripSchedule/model/scheduleForm.schema';

interface Props {
  detail: TransportCardFormValues['detail'];
}

export default function TransportDetailCard({ detail }: Props) {
  return <div>교통 카드</div>;
}
