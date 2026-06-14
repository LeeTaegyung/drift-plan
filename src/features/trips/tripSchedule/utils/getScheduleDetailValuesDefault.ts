import { TripScheduleCardType } from '@/entities/trips/type';
import { CardType } from '@/features/trips/tripSchedule/constants';
import {
  AccommodationCardFormValues,
  AttractionCardFormValues,
  EtcCardFormValues,
  FlightCardFormValues,
  TourCardFormValues,
  TransportCardFormValues,
} from '@/features/trips/tripSchedule/model/scheduleForm.schema';
import { convertTimeTaken } from '@/features/trips/tripSchedule/utils/convertTimeTaken';

export const getScheduleValuesDefault = (initValue?: TripScheduleCardType) => {
  if (initValue) {
    const timeTaken = initValue.time_taken
      ? convertTimeTaken(initValue.time_taken)
      : null;

    return {
      title: initValue.title,
      time_hour: initValue.time ? Number(initValue.time.split(':')[0]) : null,
      time_minute: initValue.time ? Number(initValue.time.split(':')[1]) : null,
      time_taken_hour: timeTaken ? Number(timeTaken.hour) : null,
      time_taken_minute: timeTaken ? Number(timeTaken.min) : null,
      memo: initValue.memo,
      ...getScheduleDetailValuesDefault(
        initValue.card_type as CardType,
        initValue
      ),
    };
  } else {
    return {
      title: '',
      time_hour: null,
      time_minute: null,
      time_taken_hour: null,
      time_taken_minute: null,
      memo: null,
      card_type: '' as const,
      detail: null,
    };
  }
};

export const getScheduleDetailValuesDefault = (
  cardType: CardType,
  initValue?: TripScheduleCardType
) => {
  switch (cardType) {
    case 'flight': {
      const detail = initValue?.detail as
        | FlightCardFormValues['detail']
        | undefined;

      return {
        card_type: 'flight' as const,
        detail: {
          flight_type: detail?.flight_type ?? ('outbound' as const),
          platform: detail?.platform ?? null,
          segments: detail?.segments
            ? detail?.segments.map((s) => ({
                ...createDefaultFlightSegment(),
                ...s,
              }))
            : [createDefaultFlightSegment()],
        },
      };
    }
    case 'accommodation': {
      const detail = initValue?.detail as
        | AccommodationCardFormValues['detail']
        | undefined;

      return {
        card_type: 'accommodation' as const,
        detail: {
          accommodation_name: detail?.accommodation_name ?? '',
          address: detail?.address ?? null,
          city: detail?.city ?? null,
          term_date: detail?.term_date ?? undefined,
          platform: detail?.platform ?? null,
          platform_ref: detail?.platform_ref ?? null,
          check_in_hour: detail?.check_in_hour ?? null,
          check_in_min: detail?.check_in_min ?? null,
          check_out_hour: detail?.check_out_hour ?? null,
          check_out_min: detail?.check_out_min ?? null,
          room_type: detail?.room_type ?? null,
          has_towel: detail?.has_towel ?? false,
          has_kitchen: detail?.has_kitchen ?? false,
          has_laundry: detail?.has_laundry ?? false,
          city_tax: detail?.city_tax ?? null,
          city_tax_currency: detail?.city_tax_currency ?? null,
        },
      };
    }
    case 'transport': {
      const detail = initValue?.detail as
        | TransportCardFormValues['detail']
        | undefined;

      return {
        card_type: 'transport' as const,
        detail: {
          transport_type: detail?.transport_type ?? null,
          cost: detail?.cost ?? null,
          cost_currency: detail?.cost_currency ?? null,
        },
      };
    }
    case 'attraction': {
      const detail = initValue?.detail as
        | AttractionCardFormValues['detail']
        | undefined;

      return {
        card_type: 'attraction' as const,
        detail: {
          place_name: detail?.place_name ?? '',
          business_open_hour: detail?.business_open_hour ?? null,
          business_open_min: detail?.business_open_min ?? null,
          business_close_hour: detail?.business_close_hour ?? null,
          business_close_min: detail?.business_close_min ?? null,
          entrance_fee: detail?.entrance_fee ?? null,
          entrance_fee_currency: detail?.entrance_fee_currency ?? null,
          has_reservation: detail?.has_reservation ?? false,
          has_audio_guide: detail?.has_audio_guide ?? false,
          photo_url: detail?.photo_url ?? null,
        },
      };
    }
    case 'tour': {
      const detail = initValue?.detail as
        | TourCardFormValues['detail']
        | undefined;

      return {
        card_type: 'tour' as const,
        detail: {
          tour_name: detail?.tour_name ?? '',
          meeting_place: detail?.meeting_place ?? null,
          tour_start_hour: detail?.tour_start_hour ?? null,
          tour_start_min: detail?.tour_start_min ?? null,
          tour_end_hour: detail?.tour_end_hour ?? null,
          tour_end_min: detail?.tour_end_min ?? null,
          extra_cost: detail?.extra_cost ?? null,
          extra_cost_currency: detail?.extra_cost_currency ?? null,
          items_to_prepare: detail?.items_to_prepare ?? null,
          photo_url: detail?.photo_url ?? null,
        },
      };
    }
    case 'etc': {
      const detail = initValue?.detail as
        | EtcCardFormValues['detail']
        | undefined;

      return {
        card_type: 'etc' as const,
        detail: {
          photo_url: detail?.photo_url ?? null,
        },
      };
    }
    default: {
      return {
        card_type: '' as const,
        detail: null,
      };
    }
  }
};

const createDefaultFlightSegment = () => {
  return {
    departure: '',
    arrival: '',
    departure_time_hour: null,
    departure_time_min: null,
    arrival_time_hour: null,
    arrival_time_min: null,
    flight_time_taken_hour: null,
    flight_time_taken_minute: null,
    airline: null,
    flight_number: null,
    booking_ref: null,
    seat: null,
    carry_on_weight: null,
    checked_bag_weight: null,
  };
};
