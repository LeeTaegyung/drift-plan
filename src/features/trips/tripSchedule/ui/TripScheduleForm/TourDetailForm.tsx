import { Control, Controller } from 'react-hook-form';

import { TourCardFormValues } from '@/features/trips/tripSchedule/model/scheduleForm.schema';
import CurrencySelect from '@/features/trips/tripSchedule/ui/TripScheduleForm/CurrencySelect';
import ScheduleInputWrapper from '@/features/trips/tripSchedule/ui/TripScheduleForm/ScheduleInputWrapper';
import { LabelInputField } from '@/shared/ui/form';
import CostInput from '@/shared/ui/form/CostInput';
import ImageUploadOnlyOne from '@/shared/ui/form/ImageUploadOnlyOne';
import NumberOnlyInput from '@/shared/ui/form/NumberOnlyInput';

interface Props {
  control: Control<TourCardFormValues>;
}
export default function TourDetailForm({ control }: Props) {
  return (
    <>
      <Controller
        name='detail.tour_name'
        control={control}
        render={({ field }) => (
          <LabelInputField
            inputSize='sm'
            title='투어명'
            value={field.value ?? ''}
            onChange={field.onChange}
            required
          />
        )}
      />
      <Controller
        name='detail.meeting_place'
        control={control}
        render={({ field }) => (
          <LabelInputField
            inputSize='sm'
            title='미팅 장소'
            value={field.value ?? ''}
            onChange={field.onChange}
          />
        )}
      />

      <ScheduleInputWrapper>
        <LabelInputField inputSize='sm' title='투어 시간'>
          <div className='flex w-full items-center gap-1'>
            <Controller
              name={`detail.tour_start_hour`}
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
              name={`detail.tour_start_min`}
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
              name={`detail.tour_end_hour`}
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
              name={`detail.tour_end_min`}
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

        <LabelInputField inputSize='sm' title='추가 비용'>
          <div className='flex items-center gap-1'>
            <Controller
              name='detail.extra_cost_currency'
              control={control}
              render={({ field }) => (
                <CurrencySelect
                  value={field.value ?? ''}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              name='detail.extra_cost'
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

      <Controller
        name='detail.items_to_prepare'
        control={control}
        render={({ field }) => (
          <LabelInputField
            inputSize='sm'
            title='준비물'
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
