import { Control, Controller, useFieldArray } from 'react-hook-form';

import { FlightCardFormValues } from '@/features/trips/tripSchedule/model/scheduleForm.schema';
import ScheduleInputWrapper from '@/features/trips/tripSchedule/ui/TripScheduleForm/ScheduleInputWrapper';
import { getScheduleDetailValuesDefault } from '@/features/trips/tripSchedule/utils/getScheduleDetailValuesDefault';
import { Button } from '@/shared/shadcn/components/ui/button';
import { LabelInputField } from '@/shared/ui/form';
import NumberOnlyInput from '@/shared/ui/form/NumberOnlyInput';
import Select from '@/shared/ui/form/Select';

interface Props {
  control: Control<FlightCardFormValues>;
}

export default function FlightDetailForm({ control }: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'detail.segments',
  });

  const handleClickAppend = () => {
    const defaultValues =
      getScheduleDetailValuesDefault('flight')?.detail?.segments;
    if (!defaultValues) return;

    append(defaultValues[0]);
  };

  const handleClickRemove = (idx: number) => {
    remove(idx);
  };

  return (
    <>
      <ScheduleInputWrapper>
        {/* 여정 구분 */}
        <Controller
          control={control}
          name='detail.flight_type'
          render={({ field }) => (
            <LabelInputField inputSize='sm' title='여정 구분' required>
              <Select
                inputSize='sm'
                value={field.value}
                onChange={field.onChange}
              >
                <option value={'outbound'}>출국편</option>
                <option value={'inbound'}>귀국편</option>
              </Select>
            </LabelInputField>
          )}
        />
        {/* 예약 플랫폼 */}
        <Controller
          name='detail.platform'
          control={control}
          render={({ field }) => (
            <LabelInputField
              inputSize='sm'
              title='예약 플랫폼'
              value={field.value || ''}
              onChange={field.onChange}
            />
          )}
        />
      </ScheduleInputWrapper>

      <div className='border-dp-accent flex flex-col gap-3 border-t border-dashed pt-3'>
        {/* 항공권 Segment :: S */}
        {fields.map((segment, index) => (
          <div
            className='border-dp-accent flex flex-col gap-3 border-b border-dashed pb-3'
            key={segment.id}
          >
            {fields.length > 1 && (
              <div className='text-text-primary text-sm font-semibold'>
                경유{index + 1}
              </div>
            )}
            <ScheduleInputWrapper>
              {/* 출발지 */}
              <Controller
                name={`detail.segments.${index}.departure`}
                control={control}
                render={({ field }) => (
                  <LabelInputField
                    inputSize='sm'
                    title='출발지'
                    required
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {/* 도착지 */}
              <Controller
                name={`detail.segments.${index}.arrival`}
                control={control}
                render={({ field }) => (
                  <LabelInputField
                    inputSize='sm'
                    title='도착지'
                    required
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </ScheduleInputWrapper>
            <ScheduleInputWrapper>
              {/* 출발 시간 */}
              <LabelInputField inputSize='sm' title='출발 시간'>
                <div className='flex max-w-40 items-center gap-1'>
                  {/* 출발 시간 - 시 */}
                  <Controller
                    name={`detail.segments.${index}.departure_time_hour`}
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
                  {/* 출발 시간 - 분 */}
                  <Controller
                    name={`detail.segments.${index}.departure_time_min`}
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
              {/* 도착 시간 */}
              <LabelInputField inputSize='sm' title='도착 시간'>
                <div className='flex max-w-40 items-center gap-1'>
                  {/* 도착 시간 - 시 */}
                  <Controller
                    name={`detail.segments.${index}.arrival_time_hour`}
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
                  {/* 도착 시간 - 분 */}
                  <Controller
                    name={`detail.segments.${index}.arrival_time_min`}
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
              {/* 항공사명 */}
              <Controller
                name={`detail.segments.${index}.airline`}
                control={control}
                render={({ field }) => (
                  <LabelInputField
                    inputSize='sm'
                    title='항공사명'
                    value={field.value ?? ''}
                    onChange={field.onChange}
                  />
                )}
              />
              {/* 항공기 편명 */}
              <Controller
                name={`detail.segments.${index}.flight_number`}
                control={control}
                render={({ field }) => (
                  <LabelInputField
                    inputSize='sm'
                    title='항공기 편명'
                    value={field.value ?? ''}
                    onChange={field.onChange}
                  />
                )}
              />
            </ScheduleInputWrapper>
            <ScheduleInputWrapper>
              {/* 항공사 예약번호 */}
              <Controller
                name={`detail.segments.${index}.booking_ref`}
                control={control}
                render={({ field }) => (
                  <LabelInputField
                    inputSize='sm'
                    title='항공사 예약번호'
                    value={field.value ?? ''}
                    onChange={field.onChange}
                  />
                )}
              />
              {/* 좌석 */}
              <Controller
                name={`detail.segments.${index}.seat`}
                control={control}
                render={({ field }) => (
                  <LabelInputField
                    inputSize='sm'
                    title='좌석'
                    value={field.value ?? ''}
                    onChange={field.onChange}
                  />
                )}
              />
            </ScheduleInputWrapper>
            <ScheduleInputWrapper>
              {/* 기내수하물 중량 */}
              <LabelInputField inputSize='sm' title='기내수하물 중량'>
                <div className='flex max-w-40 items-center gap-1'>
                  <Controller
                    name={`detail.segments.${index}.carry_on_weight`}
                    control={control}
                    render={({ field }) => (
                      <NumberOnlyInput
                        className='text-right'
                        value={field.value}
                        onChange={field.onChange}
                        comma
                      />
                    )}
                  />

                  <span className='text-sm'>kg</span>
                </div>
              </LabelInputField>
              <LabelInputField inputSize='sm' title='위탁수하물 중량'>
                {/* 위탁수하물 중량 */}
                <div className='flex max-w-40 items-center gap-1'>
                  <Controller
                    name={`detail.segments.${index}.checked_bag_weight`}
                    control={control}
                    render={({ field }) => (
                      <NumberOnlyInput
                        className='text-right'
                        value={field.value}
                        onChange={field.onChange}
                        comma
                      />
                    )}
                  />
                  <span className='text-sm'>kg</span>
                </div>
              </LabelInputField>
            </ScheduleInputWrapper>
            {fields.length > 1 && (
              <div className='flex justify-end'>
                <Button
                  type='button'
                  size={'sm'}
                  variant={'destructive'}
                  onClick={() => handleClickRemove(index)}
                >
                  삭제
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className='flex items-center justify-between gap-2'>
        <p className='text-text-muted text-xs break-keep md:text-sm'>
          다구간(경유)인 경우 추가 버튼을 클릭하여 추가해주세요!
        </p>
        <Button type='button' size={'sm'} onClick={handleClickAppend}>
          추가
        </Button>
      </div>
    </>
  );
}
