import { TripScheduleCardFormType } from '@/entities/trips/type';
import { uploadScheduleImage } from '@/features/trips/tripSchedule/api/uploadScheduleImage.api';
import {
  AccommodationCardFormValues,
  AttractionCardFormValues,
  EtcCardFormValues,
  FlightCardFormValues,
  ScheduleCardFormValues,
  TourCardFormValues,
  TransportCardFormValues,
} from '@/features/trips/tripSchedule/model/scheduleForm.schema';
import { convertTimeTaken } from '@/features/trips/tripSchedule/utils/convertTimeTaken';
import { formatTripDate } from '@/shared/utils/dateUtils';

export const transformTripScheduleData = async (
  formData: Partial<Omit<ScheduleCardFormValues, 'title' | 'memo'>>,
  userId: string,
  tripId: string
) => {
  // detail을 세부적으로 변환해줄 유틸함수
  const result: Partial<TripScheduleCardFormType> = {};

  if (formData.time_hour || formData.time_minute) {
    const hour = formData.time_hour ?? '00';
    const min = formData.time_minute ?? '00';
    const timeText = `${hour}:${min}`;
    result.time = timeText === '00:00' ? null : timeText;
  }

  if (formData.time_taken_hour || formData.time_taken_minute) {
    const hour = formData.time_taken_hour ?? '00';
    const min = formData.time_taken_minute ?? '00';
    const timeTaken = convertTimeTaken(`${hour}:${min}`);
    result.time_taken = timeTaken === 0 ? null : timeTaken;
  }

  if (formData.card_type) {
    result.card_type = formData.card_type;
  }

  if (formData.detail) {
    switch (formData.card_type) {
      case 'flight': {
        result.detail = formData.detail as FlightCardFormValues['detail'];
        break;
      }
      case 'accommodation': {
        result.detail =
          formData.detail as AccommodationCardFormValues['detail'];
        break;
      }
      case 'transport': {
        result.detail = formData.detail as TransportCardFormValues['detail'];
        break;
      }
      case 'attraction': {
        const detail = formData.detail as AttractionCardFormValues['detail'];
        const photoUrl =
          detail.photo_url instanceof File
            ? await uploadScheduleImage(detail.photo_url, userId, tripId)
            : detail.photo_url;

        result.detail = {
          ...detail,
          photo_url: photoUrl,
        };
        break;
      }
      case 'tour': {
        const detail = formData.detail as TourCardFormValues['detail'];
        const photoUrl =
          detail.photo_url instanceof File
            ? await uploadScheduleImage(detail.photo_url, userId, tripId)
            : detail.photo_url;

        result.detail = {
          ...detail,
          photo_url: photoUrl,
        };
        break;
      }
      case 'etc': {
        const detail = formData.detail as EtcCardFormValues['detail'];
        const photoUrl =
          detail.photo_url instanceof File
            ? await uploadScheduleImage(detail.photo_url, userId, tripId)
            : detail.photo_url;

        result.detail = {
          ...detail,
          photo_url: photoUrl,
        };
        break;
      }
    }
  }

  return result;
};
