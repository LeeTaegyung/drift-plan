import { ReactNode } from 'react';

interface Props {
  category: string;
  children: ReactNode;
}

export default function CheckListWrap({ category, children }: Props) {
  return (
    <div className='py-2 md:py-5'>
      <h3 className='mb-2.5 text-base font-bold md:text-lg'>{category}</h3>
      <div className='flex flex-col gap-1 md:gap-1.5'>{children}</div>
    </div>
  );
}
