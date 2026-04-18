import ThemeToggle from '@/shared/ui/ThemeToggle';
import ColorItem from '@/widgets/colorGuide/ui/ColorItem';
import ColorSection from '@/widgets/colorGuide/ui/ColorSection';

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
    name: 'color-accent',
    className: 'bg-accent',
    description: '주요 버튼 배경, 링크, 포커스 링 등 핵심 인터랙션 색상',
  },
  {
    name: 'color-accent-soft',
    className: 'bg-accent-soft',
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

export default function ColorGuidePage() {
  return (
    <main className='bg-bg text-text-primary min-h-screen space-y-12 p-8'>
      <h1 className='text-3xl font-bold'>Color Guide</h1>
      <ThemeToggle />
      <ColorSection title='Color Chips'>
        <div className='grid grid-cols-3 gap-2'>
          {COLOR_CHIPS.map((chip) => (
            <ColorItem {...chip} key={chip.name} />
          ))}
        </div>
      </ColorSection>
    </main>
  );
}
