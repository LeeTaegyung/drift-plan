import { type CheckListType } from '@/entities/checklist/type';

export const CHECKLIST_CATEGORY = {
  essential: '여행 필수',
  security: '보안 관련',
  electronics: '전자기기',
  toiletries: '샤워용품',
  beauty: '기초케어/메이크업',
  clothing: '의류',
  accessories: '악세서리',
  hygiene: '위생용품',
  travel_gear: '편의용품',
  medicine: '상비약',
  food: '식품',
  etc: '기타',
} as const;

// 해외여행 기본 체크 리스트
export const INTERNATIONAL_CHECKLIST: CheckListType[] = [
  {
    category: 'essential',
    items: [
      { name: '여권', quantity: 1, memo: null },
      { name: '여권 사본', quantity: 1, memo: null },
      { name: '여권 사진', quantity: 1, memo: null },
      {
        name: '이심/로밍/포켓와이파이',
        quantity: 1,
        memo: null,
      },
      {
        name: '트래블월렛/트래블로그',
        quantity: 1,
        memo: null,
      },
      { name: '현금', quantity: 1, memo: null },
      { name: '비상용 신용카드', quantity: 1, memo: null },
      { name: '여행자보험', quantity: 1, memo: null },
      { name: '국제운전면허증', quantity: 1, memo: null },
      { name: '국제 학생증(ISIC)', quantity: 1, memo: null },
    ],
  },
  {
    category: 'security',
    items: [
      { name: '핸드폰 스트랩', quantity: 1, memo: null },
      { name: '자전거 자물쇠', quantity: 1, memo: null },
      { name: '자물쇠', quantity: 1, memo: null },
      {
        name: '카라비너 스프링줄',
        quantity: 1,
        memo: '소매치기 많은 나라에서는 필수에요.',
      },
      {
        name: 'RFID 차단 가방',
        quantity: 1,
        memo: '소매치기 많은 나라에서는 필수에요.',
      },
    ],
  },
  {
    category: 'electronics',
    items: [
      { name: '이어폰', quantity: 1, memo: null },
      {
        name: '보조배터리',
        quantity: 1,
        memo: '20,000mAh 추천드려요. 위탁 수화물로 불가능하고, 기내 반입시 상세 규정 확인이 필요해요. (충전구 절연 테이프로 막기 or 지퍼백에 넣기)',
      },
      { name: '멀티 어댑터', quantity: 1, memo: null },
      { name: '충전기 어댑터', quantity: 1, memo: null },
      { name: '충전기 케이블', quantity: 1, memo: null },
      {
        name: '휴대용 선풍기(손풍기)',
        quantity: 1,
        memo: null,
      },
      {
        name: '전기 방석/전기 장판',
        quantity: 1,
        memo: '전기 장판의 가격이 부담스럽고 부피가 크다면, 전기 방석 추천드려요!',
      },
      { name: '러기지 체커', quantity: 1, memo: null },
      { name: '접이식 커피포트', quantity: 1, memo: null },
    ],
  },
  {
    category: 'toiletries',
    items: [
      { name: '칫솔/치약/치실', quantity: 1, memo: null },
      {
        name: '샴푸/린스/트리트먼트',
        quantity: 1,
        memo: '1회용 여러개 or 공병 소분(100ml 이하 용기, 1L 지퍼백 1개에 다 담겨야해요)',
      },
      {
        name: '바디워시',
        quantity: 1,
        memo: '1회용 여러개 or 공병 소분(100ml 이하 용기, 1L 지퍼백 1개에 다 담겨야해요)',
      },
      { name: '샤워타올', quantity: 1, memo: null },
      {
        name: '헤어오일',
        quantity: 1,
        memo: '공병 소분(100ml 이하 용기, 1L 지퍼백 1개에 다 담겨야해요)',
      },
      {
        name: '클렌징폼/클렌징워터/클렌징오일',
        quantity: 1,
        memo: '공병 소분(100ml 이하 용기, 1L 지퍼백 1개에 다 담겨야해요)',
      },
      { name: '샤워백', quantity: 1, memo: null },
    ],
  },
  {
    category: 'beauty',
    items: [
      { name: '토너패드', quantity: 1, memo: null },
      { name: '마스크팩', quantity: 1, memo: null },
      { name: '수분크림', quantity: 1, memo: null },
      { name: '썬크림', quantity: 1, memo: null },
      { name: '썬스프레이', quantity: 1, memo: null },
      { name: '립밤', quantity: 1, memo: null },
      { name: '핸드크림', quantity: 1, memo: null },
      { name: '바디크림', quantity: 1, memo: null },
    ],
  },
  {
    category: 'clothing',
    items: [
      { name: '바람막이/경량패딩', quantity: 1, memo: null },
      { name: '긴셔츠', quantity: 1, memo: null },
      { name: '원피스', quantity: 1, memo: null },
      { name: '반팔티', quantity: 4, memo: null },
      { name: '바지', quantity: 5, memo: null },
      { name: '내복', quantity: 4, memo: null },
      { name: '잠옷', quantity: 1, memo: null },
      { name: '속옷', quantity: 6, memo: null },
      { name: '양말', quantity: 6, memo: null },
      { name: '수영복', quantity: 1, memo: null },
      { name: '모자', quantity: 2, memo: null },
      { name: '목도리', quantity: 1, memo: null },
      { name: '장갑', quantity: 1, memo: null },
      {
        name: '슬리퍼',
        quantity: 1,
        memo: '양말을 신으면 쪼리 신기 불편하기 때문에 쪼리보다는 일반 슬리퍼를 추천해요.',
      },
      { name: '운동화', quantity: 1, memo: null },
    ],
  },
  {
    category: 'accessories',
    items: [
      { name: '반지', quantity: 2, memo: null },
      { name: '목걸이', quantity: 2, memo: null },
      { name: '팔찌', quantity: 1, memo: null },
      { name: '피어싱', quantity: 6, memo: null },
      { name: '귀걸이', quantity: 1, memo: null },
      {
        name: '선글라스',
        quantity: 1,
        memo: '햇빛이 생각보다 강해요. 눈 보호용으로 챙기는 것이 좋아요.',
      },
    ],
  },
  {
    category: 'hygiene',
    items: [
      { name: '샤워기 필터', quantity: 1, memo: null },
      { name: '손톱깍이', quantity: 1, memo: null },
      { name: '쪽집게', quantity: 1, memo: null },
      { name: '눈썹칼', quantity: 1, memo: null },
      { name: '휴대용 티슈', quantity: 1, memo: null },
      { name: '휴대용 물티슈', quantity: 1, memo: null },
      { name: '휴대용 가글', quantity: 1, memo: null },
      { name: '면도기/제모기', quantity: 1, memo: null },
      { name: '생리대', quantity: 1, memo: null },
      { name: '마스크', quantity: 1, memo: null },
      { name: '면봉', quantity: 1, memo: null },
      { name: '빗', quantity: 1, memo: null },
      { name: '거울', quantity: 1, memo: null },
      { name: '머리끈', quantity: 1, memo: null },
    ],
  },
  {
    category: 'travel_gear',
    items: [
      { name: '세탁물 가방', quantity: 1, memo: null },
      { name: '지퍼백', quantity: 3, memo: null },
      { name: '경량 양우산', quantity: 1, memo: null },
      { name: '휴족시간', quantity: 1, memo: null },
      { name: '종아리 압박 스타킹', quantity: 1, memo: null },
      {
        name: '가습마스크',
        quantity: 2,
        memo: '건조한 기내에서 도움이 되요.',
      },
      {
        name: '목베개',
        quantity: 1,
        memo: '이코노미 필수템!',
      },
      {
        name: '귀마개',
        quantity: 1,
        memo: '귀가 조금이라도 예민하면, 기압감소 이어플러그 필수에요.',
      },
      {
        name: '껌',
        quantity: 1,
        memo: '기압감소 이어플러그가 없을때 기압성 중이염에 도움이 되요.',
      },
      {
        name: '안대',
        quantity: 1,
        memo: '장시간 비행에 챙기면 좋아요.',
      },
      { name: '핫팩', quantity: 1, memo: null },
      { name: '접이식 옷걸이', quantity: 1, memo: null },
    ],
  },
  {
    category: 'medicine',
    items: [
      { name: '종합감기약', quantity: 1, memo: null },
      { name: '지사제', quantity: 1, memo: null },
      { name: '소화제', quantity: 1, memo: null },
      { name: '멀미약', quantity: 1, memo: null },
      { name: '소염진통제', quantity: 1, memo: null },
      { name: '비염약', quantity: 1, memo: null },
      { name: '밴드', quantity: 1, memo: null },
      { name: '마데카솔', quantity: 1, memo: null },
      { name: '후시딘', quantity: 1, memo: null },
      { name: '피로회복제(글루콤)', quantity: 1, memo: null },
      { name: '인공눈물약', quantity: 1, memo: null },
      { name: '베드버그 퇴치제', quantity: 1, memo: null },
      {
        name: '모기 기피제/벌레 퇴치제',
        quantity: 1,
        memo: null,
      },
    ],
  },
  {
    category: 'food',
    items: [
      { name: '볶음고추장/김', quantity: 1, memo: null },
      { name: '컵라면/햇반', quantity: 1, memo: null },
      { name: '나무젓가락/숟가락', quantity: 1, memo: null },
    ],
  },
  {
    category: 'etc',
    items: [
      { name: '압축파우치', quantity: 1, memo: null },
      { name: '볼펜', quantity: 1, memo: null },
      {
        name: '각종 바우처/패스권',
        quantity: 1,
        memo: '인터넷이 잘 안터질 수도 있어요.',
      },
    ],
  },
];

// 국내여행 기본 체크 리스트
export const DOMESTIC_CHECKLIST: CheckListType[] = [
  {
    category: 'essential',
    items: [
      { name: '신용카드', quantity: 1, memo: null },
      { name: '현금', quantity: 1, memo: null },
      { name: '신분증/운전면허증', quantity: 1, memo: null },
    ],
  },
  {
    category: 'electronics',
    items: [
      { name: '이어폰', quantity: 1, memo: null },
      {
        name: '보조배터리',
        quantity: 1,
        memo: '20,000mAh 추천드려요. 위탁 수화물로 불가능하고, 기내 반입시 상세 규정 확인이 필요해요. (충전구 절연 테이프로 막기 or 지퍼백에 넣기)',
      },
      { name: '충전기 어댑터', quantity: 1, memo: null },
      { name: '충전기 케이블', quantity: 1, memo: null },
      {
        name: '휴대용 선풍기(손풍기)',
        quantity: 1,
        memo: null,
      },
      { name: '접이식 커피포트', quantity: 1, memo: null },
      { name: '고데기', quantity: 1, memo: null },
      { name: '드라이기', quantity: 1, memo: null },
    ],
  },
  {
    category: 'toiletries',
    items: [
      {
        name: '칫솔/치약/치실',
        quantity: 1,
        memo: '숙소에서 제공 여부를 확인하면 좋아요.',
      },
      {
        name: '샴푸/린스/트리트먼트',
        quantity: 1,
        memo: '숙소에서 제공 여부를 확인하면 좋아요. 공병(100ml 이하) 소분 추천드려요.',
      },
      {
        name: '바디워시',
        quantity: 1,
        memo: '숙소에서 제공 여부를 확인하면 좋아요. 공병(100ml 이하) 소분 추천드려요.',
      },
      { name: '샤워타올', quantity: 1, memo: null },
      {
        name: '헤어오일',
        quantity: 1,
        memo: '공병 소분(100ml 이하 용기, 1L 지퍼백 1개에 다 담겨야해요)',
      },
      {
        name: '클렌징폼/클렌징워터/클렌징오일',
        quantity: 1,
        memo: '공병 소분(100ml 이하 용기, 1L 지퍼백 1개에 다 담겨야해요)',
      },
      { name: '샤워백', quantity: 1, memo: null },
    ],
  },
  {
    category: 'beauty',
    items: [
      { name: '토너패드', quantity: 1, memo: null },
      { name: '마스크팩', quantity: 1, memo: null },
      { name: '수분크림', quantity: 1, memo: null },
      { name: '썬크림', quantity: 1, memo: null },
      { name: '썬스프레이', quantity: 1, memo: null },
      { name: '립밤', quantity: 1, memo: null },
      { name: '핸드크림', quantity: 1, memo: null },
      { name: '바디크림', quantity: 1, memo: null },
    ],
  },
  {
    category: 'clothing',
    items: [
      { name: '상의', quantity: 4, memo: null },
      { name: '하의', quantity: 4, memo: null },
      { name: '잠옷', quantity: 1, memo: null },
      { name: '속옷', quantity: 6, memo: null },
      { name: '양말', quantity: 6, memo: null },
      { name: '수영복', quantity: 1, memo: null },
      { name: '모자', quantity: 2, memo: null },
      {
        name: '슬리퍼',
        quantity: 1,
        memo: null,
      },
      { name: '운동화', quantity: 1, memo: null },
    ],
  },
  {
    category: 'accessories',
    items: [
      { name: '반지', quantity: 2, memo: null },
      { name: '목걸이', quantity: 2, memo: null },
      { name: '팔찌', quantity: 1, memo: null },
      { name: '피어싱', quantity: 6, memo: null },
      { name: '귀걸이', quantity: 1, memo: null },
      {
        name: '선글라스',
        quantity: 1,
        memo: null,
      },
    ],
  },
  {
    category: 'hygiene',
    items: [
      { name: '휴대용 티슈', quantity: 1, memo: null },
      { name: '휴대용 물티슈', quantity: 1, memo: null },
      { name: '휴대용 가글', quantity: 1, memo: null },
      { name: '면도기/제모기', quantity: 1, memo: null },
      { name: '생리대', quantity: 1, memo: null },
      { name: '마스크', quantity: 1, memo: null },
      { name: '면봉', quantity: 1, memo: null },
      { name: '빗', quantity: 1, memo: null },
      { name: '거울', quantity: 1, memo: null },
      { name: '머리끈', quantity: 1, memo: null },
    ],
  },
  {
    category: 'travel_gear',
    items: [
      { name: '지퍼백', quantity: 3, memo: null },
      { name: '경량 양우산', quantity: 1, memo: null },
      { name: '휴족시간', quantity: 1, memo: null },
      { name: '종아리 압박 스타킹', quantity: 1, memo: null },
      {
        name: '귀마개',
        quantity: 1,
        memo: '비행기 탑승시, 귀가 조금이라도 예민하면 기압감소 이어플러그 필수에요.',
      },
      {
        name: '껌',
        quantity: 1,
        memo: '비행기 탑승시, 기압감소 이어플러그가 없을때 기압성 중이염에 도움이 되요.',
      },
      { name: '핫팩', quantity: 1, memo: null },
    ],
  },
  {
    category: 'medicine',
    items: [
      { name: '종합감기약', quantity: 1, memo: null },
      { name: '소화제', quantity: 1, memo: null },
      { name: '멀미약', quantity: 1, memo: null },
      { name: '비염약', quantity: 1, memo: null },
      { name: '밴드', quantity: 1, memo: null },
      { name: '마데카솔', quantity: 1, memo: null },
      { name: '후시딘', quantity: 1, memo: null },
      { name: '피로회복제(글루콤)', quantity: 1, memo: null },
      { name: '인공눈물약', quantity: 1, memo: null },
      {
        name: '모기 기피제/벌레 퇴치제',
        quantity: 1,
        memo: null,
      },
    ],
  },
];
