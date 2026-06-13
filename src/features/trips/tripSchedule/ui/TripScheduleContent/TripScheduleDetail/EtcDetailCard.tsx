import Image from 'next/image';

import { EtcCardFormValues } from '@/features/trips/tripSchedule/model/scheduleForm.schema';

interface Props {
  detail: EtcCardFormValues['detail'];
}

export default function EtcDetailCard({ detail }: Props) {
  return (
    <>
      {detail.photo_url && (
        <Image
          src={detail.photo_url as string}
          alt={'사진'}
          width={500}
          height={500}
          style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
          className='mt-1'
        />
      )}
    </>
  );
}
