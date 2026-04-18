'use client';

import { Button } from '@/shared/shadcn/components/ui/button';

export default function ThemeToggle() {
  return (
    <Button onClick={() => document.documentElement.classList.toggle('dark')}>
      Toggle Dark
    </Button>
  );
}
