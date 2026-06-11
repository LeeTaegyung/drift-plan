import { Control, Controller } from 'react-hook-form';

import { TRANSPORT_TYPE } from '@/features/trips/tripSchedule/constants';
import { TransportCardFormValues } from '@/features/trips/tripSchedule/model/scheduleForm.schema';
import CurrencySelect from '@/features/trips/tripSchedule/ui/TripScheduleForm/CurrencySelect';
import ScheduleInputWrapper from '@/features/trips/tripSchedule/ui/TripScheduleForm/ScheduleInputWrapper';
import { LabelInputField } from '@/shared/ui/form';
import CostInput from '@/shared/ui/form/CostInput';
import Select from '@/shared/ui/form/Select';

interface Props {
  control: Control<TransportCardFormValues>;
}
export default function TransportDetailForm({ control }: Props) {
  return (
    <ScheduleInputWrapper>
      <Controller
        name='detail.transport_type'
        control={control}
        render={({ field }) => (
          <LabelInputField inputSize='sm' title='교통 수단'>
            <div className='flex items-center gap-1'>
              <Select
                inputSize='sm'
                className='w-full'
                value={field.value ?? ''}
                onChange={field.onChange}
              >
                <option value=''>교통 수단 선택</option>
                {TRANSPORT_TYPE.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Select>
            </div>
          </LabelInputField>
        )}
      />

      <LabelInputField inputSize='sm' title='비용'>
        <div className='flex items-center gap-1'>
          <Controller
            name='detail.cost_currency'
            control={control}
            render={({ field }) => (
              <CurrencySelect
                value={field.value ?? ''}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name='detail.cost'
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
  );
}
