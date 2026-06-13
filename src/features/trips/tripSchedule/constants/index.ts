import {
  Bike,
  Bus,
  Car,
  CarFront,
  CarTaxiFront,
  Footprints,
  LucideIcon,
  Ship,
  SquareM,
  TrainFront,
  TramFront,
} from 'lucide-react';

export const CARD_TYPES = [
  { value: 'flight', name: '항공권' },
  { value: 'accommodation', name: '숙소' },
  { value: 'transport', name: '교통' },
  { value: 'attraction', name: '관광지' },
  { value: 'tour', name: '투어' },
  { value: 'etc', name: '기타' },
] as const;

export type CardType = (typeof CARD_TYPES)[number]['value'];

export const TRANSPORT_TYPE_MAP: Record<string, LucideIcon> = {
  // 지상
  버스: Bus,
  기차: TrainFront,
  택시: CarTaxiFront,
  지하철: SquareM,
  트램: TramFront,
  렌터카: Car,
  자동차: CarFront,
  // 수상
  페리: Ship,
  크루즈: Ship,
  // 기타
  자전거: Bike,
  도보: Footprints,
};
