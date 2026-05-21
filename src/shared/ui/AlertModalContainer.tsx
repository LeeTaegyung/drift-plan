'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/shadcn/components/ui/alert-dialog';
import { useAlertModalStore } from '@/shared/store/alertModalStore';

export default function AlertModalContainer() {
  const alertModal = useAlertModalStore((state) => state.alertModal);
  const closeAlertModal = useAlertModalStore((state) => state.closeAlertModal);

  const { title, desc, onAction, onCancel, isOpen } = alertModal;

  return (
    <AlertDialog open={isOpen} onOpenChange={closeAlertModal}>
      <AlertDialogContent className='bg-surface'>
        <AlertDialogHeader className='place-items-center! gap-5 text-center'>
          <AlertDialogTitle className='text-lg'>{title}</AlertDialogTitle>
          {desc && (
            <AlertDialogDescription className='text-center! text-sm whitespace-pre-line'>
              {desc}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter className='bg-surface border-0'>
          <AlertDialogCancel className='flex-1' onClick={onCancel}>
            취소
          </AlertDialogCancel>
          <AlertDialogAction className='flex-1' onClick={onAction}>
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
