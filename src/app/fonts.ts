import localFont from 'next/font/local';

export const sCoreDream = localFont({
  src: [
    {
      path: '../../public/fonts/S-CoreDream-1Thin.woff',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/S-CoreDream-2ExtraLight.woff',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/S-CoreDream-3Light.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/S-CoreDream-4Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/S-CoreDream-5Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/S-CoreDream-6Bold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/S-CoreDream-7ExtraBold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/S-CoreDream-8Heavy.woff',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/S-CoreDream-9Black.woff',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-s-core-dream',
  display: 'swap',
});
