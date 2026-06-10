import { EtcCardFormValues } from '@/features/trips/tripSchedule/model/scheduleForm.schema';

interface Props {
  detail: EtcCardFormValues['detail'];
}

export default function EtcDetailCard({ detail }: Props) {
  return <div>기타 카드</div>;
}
