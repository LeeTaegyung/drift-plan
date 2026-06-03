'use client';

import { UseFormReset } from 'react-hook-form';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createCheckItem } from '@/entities/checklist/api/checklist.api';
import { CHECKLIST_QUERIES } from '@/entities/checklist/query/checklist.queries';
import { CheckListFormValues } from '@/features/trips/checkList/model/checklistForm.schema';
import CheckItemForm from '@/features/trips/checkList/ui/CheckItemForm';
import { useModalStore } from '@/shared/store/modalStore';

interface Props {
  tripId: string;
  total: number;
}

export default function CheckItemCreateForm({ tripId, total }: Props) {
  const queryClient = useQueryClient();
  const closeModal = useModalStore((state) => state.closeModal);
  const { mutateAsync: createCheckItemMutate } = useMutation({
    mutationFn: createCheckItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CHECKLIST_QUERIES.detail.queryKey(tripId),
      });
      toast.success('체크 리스트에 추가하였습니다.');
    },
    onError: () => {
      toast.error('체크 리스트 추가하지 못하였습니다.');
    },
  });

  const handleSubmit = async (
    formData: Partial<CheckListFormValues>,
    reset: UseFormReset<CheckListFormValues>
  ) => {
    const submitData = {
      ...(formData as CheckListFormValues),
      done: false,
      order: total,
      trip_id: tripId,
    };
    await createCheckItemMutate(submitData, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return <CheckItemForm onCancel={closeModal} onSubmit={handleSubmit} />;
}
