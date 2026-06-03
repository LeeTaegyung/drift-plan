'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { TRIPS_QUERIES } from '@/entities/trips/query/trips.queries';
import { TripValuesType } from '@/entities/trips/type';
import { useUpdateTrip } from '@/features/trips/tripEdit/mutation/useUpdateTrip';
import TripForm from '@/features/trips/tripForm/ui/TripForm';
import { useAlertModalStore } from '@/shared/store/alertModalStore';

interface Props {
  tripId: string;
}

export default function TripEditForm({ tripId }: Props) {
  const openAlertModal = useAlertModalStore((state) => state.openAlertModal);
  const { data: initData } = useSuspenseQuery(
    TRIPS_QUERIES.detail.default.queryOptions(tripId)
  );
  const { mutateAsync: updateTripMutate } = useUpdateTrip(tripId);

  const onSubmit = async (formData: Partial<TripValuesType>) => {
    const isDomesticChanged = 'is_domestic' in formData;
    const isDateChanged = 'start_date' in formData || 'end_date' in formData;
    const isRegionChanged = 'region' in formData;
    const isCountriesChanged = 'countries' in formData;

    if (
      isDomesticChanged ||
      isDateChanged ||
      isRegionChanged ||
      isCountriesChanged
    ) {
      let desc = '일부 데이터가 손상될 수 있습니다.\n\n';

      if (isDomesticChanged) {
        // 국내/해외 변경 => 일정 + 체크리스트 초기화
        desc += '국내/해외 변경 : 기존 일정과 체크리스트 초기화';
      } else if (isRegionChanged || isCountriesChanged) {
        // 여행지/나라만 변경 => 일정만 초기화
        desc += '여행지 변경 : 기존 일정 초기화';
      } else if (isDateChanged) {
        // 날짜만 변경 => 유지
        desc += '여행 기간 변경 : 기간 외 일정 유지';
      }

      desc += '\n\n계속하시겠습니까?';

      const isConfirm = await new Promise<boolean>((resolve) => {
        openAlertModal({
          title: '여행 정보 수정',
          desc,
          onAction: () => resolve(true),
          onCancel: () => resolve(false),
        });
      });

      if (!isConfirm) return;
    }

    const { id, user_id, updated_at, created_at, ...backupData } = initData;

    await updateTripMutate({ tripId, formData, backupData });
  };

  return <TripForm onSubmit={onSubmit} initValues={initData} />;
}
