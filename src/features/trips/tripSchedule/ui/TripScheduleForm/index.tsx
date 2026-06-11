import { useEffect } from 'react';
import { Control, Controller, useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';

import { uploadImage } from '@/entities/image/api/image.api';
import {
  TripScheduleCardFormType,
  TripScheduleCardType,
} from '@/entities/trips/type';
import { useCurrentUser } from '@/entities/user/query/useCurrentUser';
import { CARD_TYPES } from '@/features/trips/tripSchedule/constants';
import {
  AccommodationCardFormValues,
  AttractionCardFormValues,
  EtcCardFormValues,
  FlightCardFormValues,
  ScheduleCardFormValues,
  scheduleCardSchema,
  TourCardFormValues,
  TransportCardFormValues,
} from '@/features/trips/tripSchedule/model/scheduleForm.schema';
import AccommodationDetailForm from '@/features/trips/tripSchedule/ui/TripScheduleForm/AccommodationDetailForm';
import AttractionDetailForm from '@/features/trips/tripSchedule/ui/TripScheduleForm/AttractionDetailForm';
import EtcDetailForm from '@/features/trips/tripSchedule/ui/TripScheduleForm/EtcDetailForm';
import FlightDetailForm from '@/features/trips/tripSchedule/ui/TripScheduleForm/FlightDetailForm';
import ScheduleInputWrapper from '@/features/trips/tripSchedule/ui/TripScheduleForm/ScheduleInputWrapper';
import TourDetailForm from '@/features/trips/tripSchedule/ui/TripScheduleForm/TourDetailForm';
import TransportDetailForm from '@/features/trips/tripSchedule/ui/TripScheduleForm/TransportDetailForm';
import {
  getScheduleDetailValuesDefault,
  getScheduleValuesDefault,
} from '@/features/trips/tripSchedule/utils/getScheduleDetailValuesDefault';
import { transformTripScheduleData } from '@/features/trips/tripSchedule/utils/transformTripScheduleData';
import { Button } from '@/shared/shadcn/components/ui/button';
import { Textarea } from '@/shared/shadcn/components/ui/textarea';
import { LabelInputField } from '@/shared/ui/form';
import NumberOnlyInput from '@/shared/ui/form/NumberOnlyInput';
import Select from '@/shared/ui/form/Select';

interface Props {
  onSubmit: (
    formData: Partial<TripScheduleCardFormType>
  ) => Promise<void> | void;
  onCancel: () => void;
  initValue?: TripScheduleCardType;
}

export default function TripScheduleForm({
  onSubmit,
  onCancel,
  initValue,
}: Props) {
  const { data: currentUser } = useCurrentUser();
  const tripId = useParams().tripId as string;
  const {
    handleSubmit,
    reset,
    getValues,
    control,
    watch,
    formState: { isValid, isSubmitting, isDirty, errors, dirtyFields },
  } = useForm<ScheduleCardFormValues>({
    resolver: zodResolver(scheduleCardSchema),
    defaultValues: getScheduleValuesDefault(initValue),
    mode: 'onChange',
  });
  const cardType = watch('card_type');
  const isEditMode = !!initValue;

  useEffect(() => {
    reset({
      ...getValues(),
      ...getScheduleDetailValuesDefault(cardType),
    });
  }, [cardType, getValues, reset]);

  const onSubmitForm = handleSubmit(async (formData) => {
    const originData: Partial<ScheduleCardFormValues> = isEditMode
      ? Object.fromEntries(
          Object.keys(dirtyFields).map((key) => [
            key,
            formData[key as keyof ScheduleCardFormValues],
          ])
        )
      : formData;

    // time 관련 필드는 하나라도 dirty하면 둘 다 포함
    if ('time_hour' in originData || 'time_minute' in originData) {
      originData.time_hour = formData.time_hour;
      originData.time_minute = formData.time_minute;
    }
    if ('time_taken_hour' in originData || 'time_taken_minute' in originData) {
      originData.time_taken_hour = formData.time_taken_hour;
      originData.time_taken_minute = formData.time_taken_minute;
    }

    const {
      card_type,
      detail,
      time_hour,
      time_minute,
      time_taken_hour,
      time_taken_minute,
      ...data // title, memo
    } = originData;

    const transformData = await transformTripScheduleData(
      {
        card_type,
        detail,
        time_hour,
        time_minute,
        time_taken_hour,
        time_taken_minute,
      },
      currentUser!.id,
      tripId
    );

    const submitData: Partial<TripScheduleCardFormType> = {
      ...data,
      ...transformData,
    };

    await onSubmit(submitData);
  });

  return (
    <form
      className='bg-surface border-border flex max-w-150 flex-col gap-3 rounded-lg border-2 p-3 md:p-5'
      onSubmit={onSubmitForm}
    >
      <Controller
        name='card_type'
        control={control}
        render={({ field }) => (
          <LabelInputField inputSize='sm' title='카드 타입' required>
            <Select
              inputSize='sm'
              value={field.value}
              onChange={field.onChange}
            >
              <option value=''>카드 타입을 선택해주세요.</option>
              {CARD_TYPES.map((type) => (
                <option value={type.value} key={type.value}>
                  {type.name}
                </option>
              ))}
            </Select>
          </LabelInputField>
        )}
      />

      <Controller
        name='title'
        control={control}
        render={({ field }) => (
          <LabelInputField
            inputSize='sm'
            title='제목'
            required
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <ScheduleInputWrapper>
        <LabelInputField inputSize='sm' title='일정 시간' className='w-auto'>
          <div className='flex max-w-40 items-center gap-1'>
            <Controller
              name='time_hour'
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
              name='time_minute'
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

        <LabelInputField inputSize='sm' title='소요 시간' className='w-auto'>
          <div className='flex max-w-40 items-center gap-1'>
            <Controller
              name='time_taken_hour'
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
              name='time_taken_minute'
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

      {/* 항공권 :: S */}
      {cardType === 'flight' && (
        <FlightDetailForm control={control as Control<FlightCardFormValues>} />
      )}
      {/* 항공권 :: E */}

      {/* 숙소 :: S */}
      {cardType === 'accommodation' && (
        <AccommodationDetailForm
          control={control as Control<AccommodationCardFormValues>}
        />
      )}
      {/* 숙소 :: E */}

      {/* 교통 :: S */}
      {cardType === 'transport' && (
        <TransportDetailForm
          control={control as Control<TransportCardFormValues>}
        />
      )}
      {/* 교통 :: E */}

      {/* 관광지 :: S */}
      {cardType === 'attraction' && (
        <AttractionDetailForm
          control={control as Control<AttractionCardFormValues>}
        />
      )}
      {/* 관광지 :: E */}

      {/* 투어 :: S */}
      {cardType === 'tour' && (
        <TourDetailForm control={control as Control<TourCardFormValues>} />
      )}
      {/* 투어 :: E */}

      {/* 기타 :: S */}
      {cardType === 'etc' && (
        <EtcDetailForm control={control as Control<EtcCardFormValues>} />
      )}
      {/* 기타 :: E */}

      <LabelInputField inputSize='sm' title='메모(최대 200자)'>
        <Textarea
          className='bg-surface h-20 resize-none rounded-sm text-sm md:rounded-lg'
          placeholder='- 로 시작하면, - 기호와 함께 줄바꿈되어 표시됩니다.'
        />
      </LabelInputField>

      <div className='flex gap-2'>
        <Button
          className='flex-1'
          disabled={!isValid || isSubmitting || !isDirty}
        >
          등록
        </Button>
        <Button
          type='button'
          variant={'outline'}
          className='flex-1'
          disabled={isSubmitting}
          onClick={onCancel}
        >
          취소
        </Button>
      </div>
    </form>
  );
}
