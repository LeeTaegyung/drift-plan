import ThemeToggle from '@/shared/ui/ThemeToggle';
import ColorItem from '@/widgets/colorGuide/ui/ColorItem';
import ColorPalette from '@/widgets/colorGuide/ui/ColorPalette';
import ColorSection from '@/widgets/colorGuide/ui/ColorSection';

const COLOR_PALETTE = [
  {
    name: 'ocean',
    colors: [
      'bg-ocean-50',
      'bg-ocean-100',
      'bg-ocean-200',
      'bg-ocean-400',
      'bg-ocean-500',
      'bg-ocean-600',
      'bg-ocean-800',
      'bg-ocean-900',
    ],
  },
  {
    name: 'wind',
    colors: [
      'bg-wind-50',
      'bg-wind-100',
      'bg-wind-300',
      'bg-wind-400',
      'bg-wind-500',
      'bg-wind-600',
      'bg-wind-800',
    ],
  },
  {
    name: 'sand',
    colors: [
      'bg-sand-50',
      'bg-sand-100',
      'bg-sand-200',
      'bg-sand-400',
      'bg-sand-600',
      'bg-sand-800',
    ],
  },
];

const COLOR_CHIPS = [
  { name: 'color-bg', className: 'bg-bg', description: '앱 전체 페이지 배경' },
  {
    name: 'color-surface',
    className: 'bg-surface',
    description: '카드, 모달, 드로어 등 컨텐츠를 담는 컴포넌트 배경',
  },
  {
    name: 'color-surface-alt',
    className: 'bg-surface-alt',
    description:
      'bg 위에 살짝 구분이 필요한 영역 — 사이드바, 입력 필드 배경, 테이블 헤더 등',
  },
  {
    name: 'color-border',
    className: 'bg-border',
    description: '카드 테두리, 인풋 테두리 등 컴포넌트 외곽선',
  },
  {
    name: 'color-divider',
    className: 'bg-divider',
    description: '섹션 구분선 (hr, 리스트 사이 선 등) — border보다 옅게',
  },
  {
    name: 'color-text-primary',
    className: 'bg-text-primary',
    description: '제목, 본문 핵심 텍스트 — 가장 강한 강조',
  },
  {
    name: 'color-text-secondary',
    className: 'bg-text-secondary',
    description: '부제목, 레이블, 설명 텍스트',
  },
  {
    name: 'color-text-muted',
    className: 'bg-text-muted',
    description: 'placeholder, 비활성 텍스트, 메타 정보 (날짜, 태그 수 등)',
  },
  {
    name: 'color-dp-accent',
    className: 'bg-dp-accent',
    description: '주요 버튼 배경, 링크, 포커스 링 등 핵심 인터랙션 색상',
  },
  {
    name: 'color-dp-accent-soft',
    className: 'bg-dp-accent-soft',
    description: '뱃지 배경, 선택된 항목 하이라이트 등 accent의 연한 버전',
  },
  {
    name: 'color-wind',
    className: 'bg-wind',
    description: '강조 태그, 아이콘 포인트 컬러 — 메인 wind 색상',
  },
  {
    name: 'color-wind-soft',
    className: 'bg-wind-soft',
    description: 'wind 색상 배경이 필요할 때 — 토스트, 알림 배경 등',
  },
  {
    name: 'color-wind-strong',
    className: 'bg-wind-strong',
    description: '호버 시 wind 강조, CTA 보조 버튼 등',
  },
  {
    name: 'color-hover',
    className: 'bg-hover',
    description: '버튼/리스트 아이템 호버 배경',
  },
  {
    name: 'color-active',
    className: 'bg-active',
    description: '클릭/선택된 상태 배경',
  },
];
const SEMANTIC_CHIPS = [
  {
    name: 'error',
    className: 'bg-error-bg border border-error-border text-error-text',
    description: '에러 메시지 배경 / 인풋 에러 테두리 / 에러 아이콘',
  },
  {
    name: 'success',
    className: 'bg-success-bg border border-success-border text-success-text',
    description: '토스트 메시지 / 완료 뱃지 / 체크리스트 완료',
  },
  {
    name: 'warning',
    className: 'bg-warning-bg border border-warning-border text-warning-text',
    description: '여행 상태 뱃지 / 주의 배너 / 미완료 알림',
  },
  {
    name: 'info',
    className: 'bg-info-bg border border-info-border text-info-text',
    description: '안내 배너 / 툴팁 배경 / 링크 텍스트',
  },
  {
    name: 'inactive',
    className:
      'bg-inactive-bg border border-inactive-border text-inactive-text',
    description: '여행 전 뱃지 / 비활성 버튼 / 플레이스홀더',
  },
  {
    name: 'completed',
    className:
      'bg-completed-bg border border-completed-border text-completed-text',
    description: '여행 완료 뱃지 / 완료된 체크리스트',
  },
];

export default function ColorGuidePage() {
  return (
    <main className='bg-bg text-text-primary min-h-screen space-y-12 p-8 pb-20'>
      <h1 className='text-3xl font-bold'>Color Guide</h1>
      <ThemeToggle />
      <ColorSection title='Color Palette'>
        <div className='flex flex-col gap-2'>
          {COLOR_PALETTE.map((item) => (
            <ColorPalette {...item} key={item.name} />
          ))}
        </div>
      </ColorSection>
      <ColorSection title='Color Chips'>
        <div className='grid grid-cols-3 gap-2'>
          {COLOR_CHIPS.map((chip) => (
            <ColorItem {...chip} key={chip.name} />
          ))}
        </div>
      </ColorSection>
      <ColorSection title='Semantic'>
        <div className='grid grid-cols-3 gap-2'>
          {SEMANTIC_CHIPS.map((chip) => (
            <ColorItem {...chip} key={chip.name} />
          ))}
        </div>
      </ColorSection>
    </main>
  );
}
