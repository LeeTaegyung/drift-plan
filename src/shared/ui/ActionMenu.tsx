import { EllipsisVertical } from 'lucide-react';

import { Button } from '@/shared/shadcn/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/shadcn/components/ui/dropdown-menu';

interface Props {
  onClickEdit: () => void;
  onClickDelete: () => void;
}

export default function ActionMenu({ onClickEdit, onClickDelete }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={'ghost'}
          size={'icon'}
          className='border-0! text-white hover:bg-transparent hover:text-white aria-expanded:bg-transparent aria-expanded:text-white'
        >
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={'end'} className='min-w-25'>
        <DropdownMenuGroup>
          <ActionMenuButton name='수정하기' onClick={onClickEdit} />
          <ActionMenuButton name='삭제하기' onClick={onClickDelete} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ActionMenuButton({
  name,
  onClick,
}: {
  name: string;
  onClick: () => void;
}) {
  return (
    <DropdownMenuItem asChild>
      <Button
        variant={'ghost'}
        size={'sm'}
        className='h-auto w-full cursor-pointer text-sm font-normal'
        onClick={onClick}
      >
        {name}
      </Button>
    </DropdownMenuItem>
  );
}
