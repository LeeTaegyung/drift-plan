import { XIcon } from 'lucide-react';

import { Button } from '@/shared/shadcn/components/ui/button';
import { CountryItemType, CountryListType } from '@/shared/types/countries';

interface Props {
  countries: CountryListType;
  onDelete: (value: CountryItemType) => void;
}

export default function CountriesSelects({ countries, onDelete }: Props) {
  return (
    <div className='mt-2 flex flex-wrap gap-1'>
      {countries.map((contry) => (
        // 삭제 기능 추가
        <Button
          key={contry.name}
          size={'xs'}
          variant={'outline'}
          onClick={() => onDelete(contry)}
        >
          {contry.name}
          <XIcon />
        </Button>
      ))}
    </div>
  );
}
