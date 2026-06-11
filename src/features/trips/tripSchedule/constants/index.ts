export const CARD_TYPES = [
  { value: 'flight', name: '항공권' },
  { value: 'accommodation', name: '숙소' },
  { value: 'transport', name: '교통' },
  { value: 'attraction', name: '관광지' },
  { value: 'tour', name: '투어' },
  { value: 'etc', name: '기타' },
] as const;

export type CardType = (typeof CARD_TYPES)[number]['value'];

export const TRANSPORT_TYPE = [
  // 지상
  '버스',
  '기차',
  '택시',
  '지하철',
  '트램',
  '렌터카',
  '자동차',
  // 수상
  '페리',
  '크루즈',
  // 기타
  '자전거',
  '도보',
];
