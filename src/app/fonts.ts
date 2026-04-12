import localFont from 'next/font/local';

// 사용하지 않을 경우 파일 삭제
export const fontName = localFont({
  src: [
    // {
    //   path: '../../public/fonts/Pretendard-Regular.woff2',
    //   weight: '400',
    //   style: 'normal',
    // },
    // {
    //   path: '../../public/fonts/Pretendard-Medium.woff',
    //   weight: '500',
    //   style: 'normal',
    // },
  ],
  variable: '--font-fontName',
  display: 'swap',
});
