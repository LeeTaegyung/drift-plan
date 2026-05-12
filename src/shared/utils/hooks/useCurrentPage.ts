import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useCurrentPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('currentPage') || String(1);

  const setCurrentPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('currentPage', String(page));

    router.push(pathname + '?' + params.toString());
  };

  return { currentPage, setCurrentPage };
};
