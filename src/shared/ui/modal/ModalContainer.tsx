'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/shared/shadcn/components/ui/dialog';
import { useModalStore } from '@/shared/store/modalStore';

export default function ModalContainer() {
  const title = useModalStore((state) => state.title);
  const content = useModalStore((state) => state.content);
  const isOpen = useModalStore((state) => state.isOpen);
  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className='w-[calc(100%-32px)] max-w-150! overflow-hidden'>
        <DialogTitle>{title}</DialogTitle>
        {content && content}
      </DialogContent>
    </Dialog>
  );
}
