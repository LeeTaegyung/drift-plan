'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/shared/shadcn/components/ui/button';
import { cn } from '@/shared/shadcn/lib/utils';

interface Props {
  className?: string;
  currentPage: number;
  totalPage: number;
  onChangePage: (currentPage: number) => void;
  groupSize?: number;
}

const DEFAULT_GROUP_SIZE = 5;

export default function Pagination({
  currentPage,
  totalPage,
  onChangePage,
  groupSize = DEFAULT_GROUP_SIZE,
  className,
}: Props) {
  const groupFirstPage =
    Math.floor((currentPage - 1) / groupSize) * groupSize + 1;
  const groupLastPage = Math.min(groupFirstPage + groupSize - 1, totalPage);

  const handlePrevPage = () => {
    onChangePage(currentPage - 1);
  };
  const handleNextPage = () => {
    onChangePage(currentPage + 1);
  };
  const handleChangeNumb = (num: number) => {
    onChangePage(num);
  };

  return (
    <div
      className={cn('mt-10 flex items-center justify-center gap-3', className)}
    >
      <Button
        variant='ghost'
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className='h-8 w-8 p-0'
      >
        <ChevronLeft />
      </Button>
      <ul className='flex justify-center gap-2'>
        {Array.from({ length: groupLastPage - groupFirstPage + 1 }).map(
          (_, idx) => {
            const num = groupFirstPage + idx;
            return (
              <li key={num}>
                <Button
                  className={cn(
                    `border-dp-accent text-dp-accent hover:text-dp-accent hover:border-dp-accent h-8 w-8 rounded-sm p-0 text-sm font-normal hover:bg-transparent`,
                    num === currentPage &&
                      'bg-dp-accent! font-semibold text-white!'
                  )}
                  variant='outline'
                  onClick={() => handleChangeNumb(num)}
                >
                  {num}
                </Button>
              </li>
            );
          }
        )}
      </ul>
      <Button
        variant='ghost'
        onClick={handleNextPage}
        disabled={currentPage === totalPage}
        className='h-8 w-8 p-0'
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
