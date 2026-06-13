import { TripScheduleCardType } from '@/entities/trips/type';
import { CardType } from '@/features/trips/tripSchedule/constants';
import { ScheduleCardFormValues } from '@/features/trips/tripSchedule/model/scheduleForm.schema';
import { convertTimeTaken } from '@/features/trips/tripSchedule/utils/convertTimeTaken';

export const getScheduleValuesDefault = (initValue?: TripScheduleCardType) => {
  if (initValue) {
    return {
      title: initValue.title,
      time_hour: initValue.time ? Number(initValue.time.split(':')[0]) : null,
      time_minute: initValue.time ? Number(initValue.time.split(':')[1]) : null,
      time_taken_hour: initValue.time_taken
        ? Number(convertTimeTaken(initValue.time_taken).split(':')[0])
        : null,
      time_taken_minute: initValue.time_taken
        ? Number(convertTimeTaken(initValue.time_taken).split(':')[1])
        : null,
      memo: initValue.memo,
      card_type: initValue.card_type as CardType,
      detail: {
        ...getScheduleDetailValuesDefault(
          (initValue.card_type as CardType) || ''
        ).detail,
        ...(initValue.detail as ScheduleCardFormValues['detail']),
      },
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

export function getScheduleDetailValuesDefault(cardType: '' | CardType) {
  switch (cardType) {
    case 'flight': {
      return {
        card_type: 'flight' as const,
        detail: {
          flight_type: 'outbound' as const,
          platform: null,
          segments: [
            {
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
            },
          ],
        },
      };
    }
    case 'accommodation': {
      return {
        card_type: 'accommodation' as const,
        detail: {
          accommodation_name: '',
          address: null,
          city: null,
          term_date: undefined,
          platform: null,
          platform_ref: null,
          check_in_hour: null,
          check_in_min: null,
          check_out_hour: null,
          check_out_min: null,
          room_type: null,
          has_towel: false,
          has_kitchen: false,
          has_laundry: false,
          city_tax: null,
          city_tax_currency: null,
        },
      };
    }
    case 'transport': {
      return {
        card_type: 'transport' as const,
        detail: {
          transport_type: null,
          cost: null,
          cost_currency: null,
        },
      };
    }
    case 'attraction': {
      return {
        card_type: 'attraction' as const,
        detail: {
          place_name: '',
          business_open_hour: null,
          business_open_min: null,
          business_close_hour: null,
          business_close_min: null,
          entrance_fee: null,
          entrance_fee_currency: null,
          has_reservation: false,
          has_audio_guide: false,
          photo_url: null,
        },
      };
    }
    case 'tour': {
      return {
        card_type: 'tour' as const,
        detail: {
          tour_name: '',
          meeting_place: null,
          tour_start_hour: null,
          tour_start_min: null,
          tour_end_hour: null,
          tour_end_min: null,
          extra_cost: null,
          extra_cost_currency: null,
          items_to_prepare: null,
          photo_url: null,
        },
      };
    }
    case 'etc': {
      return {
        card_type: 'etc' as const,
        detail: {
          place_name: '',
          photo_url: null,
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
}
