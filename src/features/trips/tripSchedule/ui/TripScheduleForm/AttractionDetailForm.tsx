import { Control, Controller } from 'react-hook-form';

import { AttractionCardFormValues } from '@/features/trips/tripSchedule/model/scheduleForm.schema';
import CurrencySelect from '@/features/trips/tripSchedule/ui/TripScheduleForm/CurrencySelect';
import ScheduleInputWrapper from '@/features/trips/tripSchedule/ui/TripScheduleForm/ScheduleInputWrapper';
import { Switch } from '@/shared/shadcn/components/ui/switch';
import { LabelInputField } from '@/shared/ui/form';
import CostInput from '@/shared/ui/form/CostInput';
import ImageUploadOnlyOne from '@/shared/ui/form/ImageUploadOnlyOne';
import NumberOnlyInput from '@/shared/ui/form/NumberOnlyInput';

interface Props {
  control: Control<AttractionCardFormValues>;
}

export default function AttractionDetailForm({ control }: Props) {
  return (
    <>
      <Controller
        name='detail.place_name'
        control={control}
        render={({ field }) => (
          <LabelInputField
            inputSize='sm'
            title='관광지명'
            required
            value={field.value ?? ''}
            onChange={field.onChange}
          />
        )}
      />

      <ScheduleInputWrapper>
        <LabelInputField inputSize='sm' title='영업 시간'>
          <div className='flex w-full items-center gap-1'>
            <Controller
              name={`detail.business_open_hour`}
              control={control}
              render={({ field }) => (
                <NumberOnlyInput
                  maxLength={2}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <span className='shrink-0'>:</span>
            <Controller
              name={`detail.business_open_min`}
              control={control}
              render={({ field }) => (
                <NumberOnlyInput
                  maxLength={2}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <span className='shrink-0 text-center'>~</span>
            <Controller
              name={`detail.business_close_hour`}
              control={control}
              render={({ field }) => (
                <NumberOnlyInput
                  maxLength={2}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <span className='shrink-0'>:</span>
            <Controller
              name={`detail.business_close_min`}
              control={control}
              render={({ field }) => (
                <NumberOnlyInput
                  maxLength={2}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </LabelInputField>
        <LabelInputField inputSize='sm' title='입장료'>
          <div className='flex items-center gap-1'>
            <Controller
              name='detail.entrance_fee_currency'
              control={control}
              render={({ field }) => (
                <CurrencySelect
                  value={field.value ?? ''}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              name='detail.entrance_fee'
              control={control}
              render={({ field }) => (
                <CostInput
                  inputSize='sm'
                  value={field.value}
                  onChange={field.onChange}
                  className='flex-2'
                />
              )}
            />
          </div>
        </LabelInputField>
      </ScheduleInputWrapper>

      <ScheduleInputWrapper>
        <Controller
          name='detail.has_reservation'
          control={control}
          render={({ field }) => (
            <LabelInputField inputSize='sm' title='예약 여부'>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </LabelInputField>
          )}
        />
        <Controller
          name='detail.has_audio_guide'
          control={control}
          render={({ field }) => (
            <LabelInputField inputSize='sm' title='오디오 가이드 제공 여부'>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </LabelInputField>
          )}
        />
      </ScheduleInputWrapper>

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
