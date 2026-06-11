import { Control, Controller } from 'react-hook-form';

import { EtcCardFormValues } from '@/features/trips/tripSchedule/model/scheduleForm.schema';
import { LabelInputField } from '@/shared/ui/form';
import ImageUploadOnlyOne from '@/shared/ui/form/ImageUploadOnlyOne';

interface Props {
  control: Control<EtcCardFormValues>;
}

export default function EtcDetailForm({ control }: Props) {
  return (
    <>
      <Controller
        name='detail.place_name'
        control={control}
        render={({ field }) => (
          <LabelInputField
            inputSize='sm'
            title='방문지명'
            value={field.value ?? ''}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        name='detail.photo_url'
        control={control}
        render={({ field }) => (
          <LabelInputField
            inputSize='sm'
            desc='JPEG, PNG, WEBP 파일만 업로드 가능하며, 최대 용량은 3MB입니다.'
            title='사진'
          >
            <ImageUploadOnlyOne value={field.value} onChange={field.onChange} />
          </LabelInputField>
        )}
      />
    </>
  );
}
