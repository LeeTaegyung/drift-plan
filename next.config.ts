import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // SVGR 사용시 활성화
  // webpack: (config) => {
  //   const fileLoaderRule = config.module.rules.find((rule: any) =>
  //     rule.test?.test?.('.svg')
  //   );
  //   config.module.rules.push(
  //     {
  //       ...fileLoaderRule,
  //       test: /\.svg$/i,
  //       resourceQuery: /url/,
  //     },
  //     {
  //       test: /\.svg$/i,
  //       issuer: fileLoaderRule.issuer,
  //       resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
  //       use: [
  //         {
  //           loader: '@svgr/webpack',
  //           options: {
  //             typescript: true,
  //             ext: 'tsx',
  //           },
  //         },
  //       ],
  //     }
  //   );
  //   fileLoaderRule.exclude = /\.svg$/i;
  //   return config;
  // },

  images: {
    // 외부 이미지 사용시 아래 설정 활성화
    //   remotePatterns: [
    //     {
    //       protocol: 'https',
    //       hostname: 'example.com',
    //       port: '',
    //       pathname: '/**', // 경로 패턴, 모든 이미지 허용
    //     },
    //   ],
  },
};

export default nextConfig;
