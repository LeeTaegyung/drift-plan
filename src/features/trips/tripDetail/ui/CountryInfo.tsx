'use client';

import Image from 'next/image';

import { useSuspenseQueries } from '@tanstack/react-query';

import { fetchDataGoCountries } from '@/entities/trips/api/trips.api';
import RenderingConvertHtmlString from '@/features/trips/tripDetail/ui/RenderingConvertHtmlString';
import { COUNTRIES } from '@/shared/config/countries';
import { Button } from '@/shared/shadcn/components/ui/button';
import { useModalStore } from '@/shared/store/modalStore';

interface Props {
  countries: string[];
}

export default function CountryInfo({ countries }: Props) {
  const openModal = useModalStore((state) => state.openModal);
  const countriesCode = countries
    .map((country) => COUNTRIES.find((c) => c.name === country)?.alpha2)
    .filter((c): c is string => Boolean(c));

  const queries = useSuspenseQueries({
    queries: countriesCode.map((c) => ({
      queryKey: ['trips', 'countries', c],
      queryFn: () => fetchDataGoCountries(c),
    })),
  });
  const isLoading = queries.some((q) => q.isLoading);

  if (isLoading) return null;

  const countryDatas = queries.flatMap((q) => q.data?.item);

  const handleCountry = (country: string, htmlString: string) => {
    openModal(
      `${country} 정보`,
      <div className='max-h-[65vh] overflow-auto'>
        <RenderingConvertHtmlString htmlString={htmlString} />
      </div>
    );
  };

  return (
    <div className='w-full'>
      <h3 className='bg-dp-accent mb-2 rounded-xs px-2 py-1 text-sm font-medium text-white'>
        나라 정보
      </h3>
      <div className='bg-surface border-border mb-2 rounded-sm border p-2'>
        <p className='text-[13px]'>
          여권 분실 등{' '}
          <strong className='text-text-primary font-medium'>
            해외 여행 중 도움이 필요한 경우(여권 분실 등),{' '}
          </strong>
          <br className='hidden md:block' />
          <strong className='text-text-primary font-medium'>
            연락처 목록(현지 대사관 연락처 등) 및 상세정보를 제공
          </strong>
          합니다.
        </p>
        <p className='mt-0.5 text-right text-xs'>제공기간 : 외교부</p>
      </div>
      <ul>
        {countryDatas.map((country) => (
          <li key={country.country_nm} className='py-0.5'>
            <Button
              className='hover:bg-wind-soft flex w-full items-center justify-start gap-1 text-sm'
              variant={'ghost'}
              onClick={() =>
                handleCountry(country.country_nm, country.contact_remark)
              }
            >
              {country.flag_download_url && (
                <Image
                  src={country.flag_download_url}
                  alt={`${country.country_nm} 국기`}
                  width={30}
                  height={20}
                  className='h-auto shrink-0'
                />
              )}
              {country.country_nm}
              <span className='text-xs opacity-70'>
                ({country.continent_nm})
              </span>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
