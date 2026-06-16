import z from 'zod';

// 공통 필드
const scheduleFormCommonField = z.object({
  title: z.string().min(1, '제목을 입력해주세요.'), // 제목
  time_hour: z.number().min(0).max(23).nullable(), // 시간 - 시
  time_minute: z.number().min(0).max(59).nullable(), // 시간 - 분
  time_taken_hour: z.number().min(0).max(24).nullable(), // 소요 시간 - 시
  time_taken_minute: z.number().min(0).max(59).nullable(), // 소요 시간 - 분
  memo: z.string().max(200).nullable(), // - 메모
});

// detail 스키마 - 항공권
const flightSegmentSchema = z.object({
  departure: z.string().min(1), // 출발지 (공항 코드 or 도시명)
  arrival: z.string().min(1), // 도착지 (공항 코드 or 도시명)
  departure_time_hour: z.number().min(0).max(24).nullable(), // 출발 시간 - 시
  departure_time_min: z.number().min(0).max(59).nullable(), // 출발 시간 - 분
  arrival_time_hour: z.number().min(0).max(24).nullable(), // 도착 시간 - 시
  arrival_time_min: z.number().min(0).max(59).nullable(), // 도착 시간 - 분
  flight_time_taken_hour: z.number().min(0).max(24).nullable(), // 소요 시간 - 시
  flight_time_taken_minute: z.number().min(0).max(59).nullable(), // 소요 시간 - 분
  airline: z.string().nullable(), // 항공사명
  flight_number: z.string().nullable(), // 항공기 편명
  booking_ref: z.string().nullable(), // 항공사 예약번호
  seat: z.string().nullable(), // 좌석
  carry_on_weight: z.number().nullable(), // 기내수하물 중량
  checked_bag_weight: z.number().nullable(), // 위탁수하물 중량
});

const flightDetailSchema = z.object({
  flight_type: z.enum(['outbound', 'inbound']), // 출국편 | 귀국편
  platform: z.string().nullable(), // 예약 플랫폼
  segments: z.array(flightSegmentSchema).min(1), // 구간 목록 (경유 시 2개 이상)
});

// detail 스키마 - 숙소
const accommodationDetailSchema = z.object({
  platform: z.string().nullable(), // 예약 플랫폼
  platform_ref: z.string().nullable(), // 예약 번호
  accommodation_name: z.string().min(1), // 숙소명
  city: z.string().nullable(), // 도시
  address: z.string().nullable(), // 주소
  term_date: z
    .union([
      z.undefined(),
      z.object({
        from: z.string(),
        to: z.string().optional(),
      }),
    ])
    .superRefine((data, ctx) => {
      if (typeof data === 'string') return;

      // 한쪽만 있을 때
      if (data?.from && !data.to) {
        ctx.addIssue({
          code: 'custom',
          message: '마지막 날짜를 선택해주세요.',
          path: ['to'],
        });
        return;
      }

      if (!data?.from && data?.to) {
        ctx.addIssue({
          code: 'custom',
          message: '시작 날짜를 선택해주세요.',
          path: ['from'],
        });
        return;
      }

      // from이 to보다 뒤일 때
      if (data?.from && data.to && data.from > data.to) {
        ctx.addIssue({
          code: 'custom',
          message: '마지막 날짜는 시작 날짜 이후여야 합니다.',
          path: ['to'],
        });
      }
    }), // 기간 - 체크인 ~ 체크아웃 => '0000-00-00' 포맷으로 입력됨.
  check_in_hour: z.number().min(0).max(23).nullable(), // 체크인 시간 - 시
  check_in_min: z.number().min(0).max(59).nullable(), // 체크인 시간 - 분
  check_out_hour: z.number().min(0).max(23).nullable(), // 체크아웃 시간 - 시
  check_out_min: z.number().min(0).max(59).nullable(), // 체크아웃 시간 - 분
  city_tax: z.string().nullable(), // 도시세 (해외 숙소만)
  city_tax_currency: z.string().nullable(), // 도시세 통화
  room_type: z.string().nullable(), // 룸타입
  has_towel: z.boolean(), // 수건 제공 여부
  has_kitchen: z.boolean(), // 주방 여부
  has_laundry: z.boolean(), // 세탁실 여부 (해외 숙소만)
});

// detail 스키마 - 교통
const transportDetailSchema = z.object({
  transport_type: z.string().nullable(), // 교통 수단 (버스, 기차, 택시 등)
  cost: z.string().nullable(), // 비용
  cost_currency: z.string().nullable(), // 통화 (나라별 상이)
});

// detail 스키마 - 관광지
const attractionDetailSchema = z.object({
  place_name: z.string().min(1), // 관광지명
  business_open_hour: z.number().min(0).max(23).nullable(), // 오픈 - 시
  business_open_min: z.number().min(0).max(59).nullable(), // 오픈 - 분
  business_close_hour: z.number().min(0).max(23).nullable(), // 클로즈 - 시
  business_close_min: z.number().min(0).max(59).nullable(), // 클로즈 - 분
  entrance_fee: z.string().nullable(), // 입장료
  entrance_fee_currency: z.string().nullable(), // 입장료 통화
  has_reservation: z.boolean(), // 예약 여부
  has_audio_guide: z.boolean(), // 오디오 가이드 제공 여부
  photo_url: z.union([z.instanceof(File), z.string()]).nullable(), // 사진 URL => 서버에 submit 전에 확정된 사진 전송 예정, 폼에서는 bolb로
});

// detail 스키마 - 투어
const tourDetailSchema = z.object({
  tour_name: z.string().min(1), // 투어명
  meeting_place: z.string().nullable(), // 미팅 장소
  tour_start_hour: z.number().min(0).max(23).nullable(), // 투어 시작 시간 - 시
  tour_start_min: z.number().min(0).max(59).nullable(), // 투어 시작 시간 - 분
  tour_end_hour: z.number().min(0).max(23).nullable(), // 투어 종료 시간 - 시
  tour_end_min: z.number().min(0).max(59).nullable(), // 투어 종료 시간 - 분
  extra_cost: z.string().nullable(), // 추가 비용
  extra_cost_currency: z.string().nullable(), // 통화
  items_to_prepare: z.string().nullable(), // 준비물
  photo_url: z.union([z.instanceof(File), z.string()]).nullable(), // 사진 URL => 서버에 submit 전에 확정된 사진 전송 예정, 폼에서는 bolb로
});

// detail 스키마 - 기타 (방문지)
const etcDetailSchema = z.object({
  photo_url: z.union([z.instanceof(File), z.string()]).nullable(), // 사진 URL => 서버에 submit 전에 확정된 사진 전송 예정, 폼에서는 bolb로
});

export const scheduleCardSchema = z
  .discriminatedUnion('card_type', [
    scheduleFormCommonField.extend({
      card_type: z.literal(''),
      detail: z.null(),
    }),
    scheduleFormCommonField.extend({
      card_type: z.literal('flight'),
      detail: flightDetailSchema,
    }),
    scheduleFormCommonField.extend({
      card_type: z.literal('accommodation'),
      detail: accommodationDetailSchema,
    }),
    scheduleFormCommonField.extend({
      card_type: z.literal('transport'),
      detail: transportDetailSchema,
    }),
    scheduleFormCommonField.extend({
      card_type: z.literal('attraction'),
      detail: attractionDetailSchema,
    }),
    scheduleFormCommonField.extend({
      card_type: z.literal('tour'),
      detail: tourDetailSchema,
    }),
    scheduleFormCommonField.extend({
      card_type: z.literal('etc'),
      detail: etcDetailSchema,
    }),
  ])
  .refine((data) => {
    if (data.card_type === '') return false;

    return true;
  });

export type ScheduleCardFormValues = z.infer<typeof scheduleCardSchema>;
export type FlightCardFormValues = Extract<
  ScheduleCardFormValues,
  { card_type: 'flight' }
>;
export type AccommodationCardFormValues = Extract<
  ScheduleCardFormValues,
  { card_type: 'accommodation' }
>;
export type TransportCardFormValues = Extract<
  ScheduleCardFormValues,
  { card_type: 'transport' }
>;
export type AttractionCardFormValues = Extract<
  ScheduleCardFormValues,
  { card_type: 'attraction' }
>;
export type TourCardFormValues = Extract<
  ScheduleCardFormValues,
  { card_type: 'tour' }
>;
export type EtcCardFormValues = Extract<
  ScheduleCardFormValues,
  { card_type: 'etc' }
>;
