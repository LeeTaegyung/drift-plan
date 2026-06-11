import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function ScheduleInputWrapper({ children }: Props) {
  return (
    <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>{children}</div>
  );
}
