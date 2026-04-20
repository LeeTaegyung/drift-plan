import { PATH } from '@/shared/constants/path';

export const getSafeRedirect = (redirect: string | null): string => {
  if (!redirect) return PATH.global.main;

  // 상대 경로만 허용 + 프로토콜 속임 차단
  if (!redirect.startsWith('/') || redirect.startsWith('//')) {
    return PATH.global.main;
  }

  return redirect;
};
