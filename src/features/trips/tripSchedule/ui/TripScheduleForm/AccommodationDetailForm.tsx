import { Control, Controller } from 'react-hook-form';

import { useGetTripDetailData } from '@/entities/trips/hooks/useGetTripDetailData';
import { AccommodationCardFormValues } from '@/features/trips/tripSchedule/model/scheduleForm.schema';
import CurrencySelect from '@/features/trips/tripSchedule/ui/TripScheduleForm/CurrencySelect';
import ScheduleInputWrapper from '@/features/trips/tripSchedule/ui/TripScheduleForm/ScheduleInputWrapper';
import { Switch } from '@/shared/shadcn/components/ui/switch';
import { LabelInputField } from '@/shared/ui/form';
import CostInput from '@/shared/ui/form/CostInput';
import NumberOnlyInput from '@/shared/ui/form/NumberOnlyInput';
import RangeDate from '@/shared/ui/form/RangeDate';

interface Props {
  control: Control<AccommodationCardFormValues>;
}

export default function AccommodationDetailForm({ control }: Props) {
  const { data: tripDetailData } = useGetTripDetailData();
  const isDomestic = tripDetailData.is_domestic;

  return (
    <>
      <ScheduleInputWrapper>
        <Controller
          name='detail.platform'
          control={control}
          render={({ field }) => (
            <LabelInputField
              inputSize='sm'
              title='예약 플랫폼'
              value={field.value ?? ''}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name='detail.platform_ref'
          control={control}
          render={({ field }) => (
            <LabelInputField
              inputSize='sm'
              title='예약 번호'
              value={field.value ?? ''}
              onChange={field.onChange}
            />
          )}
        />
      </ScheduleInputWrapper>
      <ScheduleInputWrapper>
        <Controller
          name='detail.accommodation_name'
          control={control}
          render={({ field }) => (
            <LabelInputField
              inputSize='sm'
              title='숙소명'
              value={field.value ?? ''}
              onChange={field.onChange}
              required
            />
          )}
        />
        <Controller
          name='detail.city'
          control={control}
          render={({ field }) => (
            <LabelInputField
              inputSize='sm'
              title='도시'
              value={field.value ?? ''}
              onChange={field.onChange}
            />
          )}
        />
      </ScheduleInputWrapper>
      <Controller
        name='detail.address'
        control={control}
        render={({ field }) => (
          <LabelInputField
            inputSize='sm'
            title='주소'
            value={field.value ?? ''}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        name='detail.term_date'
        control={control}
        render={({ field }) => (
          <LabelInputField inputSize='sm' title='기간'>
            {/* from => date_term_start, to => date_term_end */}
            <RangeDate
              selectDate={field.value}
              setSelectDate={field.onChange}
              inputSize='sm'
            />
          </LabelInputField>
        )}
      />

      <ScheduleInputWrapper>
        <LabelInputField inputSize='sm' title='체크인 시간'>
          <div className='flex max-w-40 items-center gap-1'>
            <Controller
              name={`detail.check_in_hour`}
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
              name={`detail.check_in_min`}
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
        <LabelInputField inputSize='sm' title='체크아웃 시간'>
          <div className='flex max-w-40 items-center gap-1'>
            <Controller
              name={`detail.check_out_hour`}
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
              name={`detail.check_out_min`}
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
      </ScheduleInputWrapper>
      <ScheduleInputWrapper>
        {!isDomestic && (
          <LabelInputField inputSize='sm' title='도시세'>
            <div className='flex items-center gap-1'>
              <Controller
                name='detail.city_tax_currency'
                control={control}
                render={({ field }) => (
                  <CurrencySelect
                    value={field.value ?? ''}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name='detail.city_tax'
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
        )}

        <Controller
          name='detail.room_type'
          control={control}
          render={({ field }) => (
            <LabelInputField
              inputSize='sm'
              title='룸타입'
              value={field.value ?? ''}
              onChange={field.onChange}
            />
          )}
        />
      </ScheduleInputWrapper>
      <div className='flex gap-3'>
        {!isDomestic && (
          <Controller
            name='detail.has_towel'
            control={control}
            render={({ field }) => (
              <LabelInputField
                inputSize='sm'
                title='수건 제공 여부'
                className='flex-1'
              >
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </LabelInputField>
            )}
          />
        )}
        <Controller
          name='detail.has_kitchen'
          control={control}
          render={({ field }) => (
            <LabelInputField
              inputSize='sm'
              title='주방 여부'
              className='flex-1'
            >
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </LabelInputField>
          )}
        />
        <Controller
          name='detail.has_laundry'
          control={control}
          render={({ field }) => (
            <LabelInputField
              inputSize='sm'
              title='세탁실 여부'
              className='flex-1'
            >
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </LabelInputField>
          )}
        />
      </div>
    </>
  );
}
