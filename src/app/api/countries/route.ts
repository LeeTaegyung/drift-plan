import { NextRequest, NextResponse } from 'next/server';

import { CountryResponse } from '@/entities/trips/type';

export async function GET(request: NextRequest) {
  const originSearchParams = request.nextUrl.searchParams;
  const code = originSearchParams.get('code');

  if (!code) return NextResponse.json({ status: 400 });

  const newSearchParams = new URLSearchParams();
  newSearchParams.append(
    'serviceKey',
    process.env.NEXT_PUBLIC_DATA_GO_KR_API_KEY!
  );
  newSearchParams.append('numOfRows', '10');
  newSearchParams.append('pageNo', '1');
  newSearchParams.append('cond[country_iso_alp2::EQ]', code);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DATA_GO_KR_API_URL}?${newSearchParams.toString()}`
  );

  if (!res.ok)
    return NextResponse.json({
      status: res.status,
      statusText: res.statusText,
    });

  const data: CountryResponse = await res.json();

  if (data.response.header.resultCode !== '0')
    return NextResponse.json({
      status: 500,
      statusText: '에러가 발생하였습니다.',
    });

  return NextResponse.json({ data: data.response.body.items });
}
