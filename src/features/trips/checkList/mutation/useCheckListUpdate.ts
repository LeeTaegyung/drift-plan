import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateCheckItem } from '@/entities/checklist/api/checklist.api';
import { CHECKLIST_QUERIES } from '@/entities/checklist/query/checklist.queries';
import { TripCheckListType } from '@/entities/checklist/type';

export const useCheckListUpdateAll = () => {
  return useMutation({
    mutationFn: updateCheckItem,
    onError: () => {
      toast.error('체크리스트 수정에 실패하였습니다.');
    },
  });
};

export const useCheckListUpdateCheck = (tripId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['checklist', 'update', tripId],
    mutationFn: updateCheckItem,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: CHECKLIST_QUERIES.detail.queryKey(tripId),
      });

      const prevSnapshot = queryClient.getQueryData(
        CHECKLIST_QUERIES.detail.queryKey(tripId)
      );

      queryClient.setQueryData(
        CHECKLIST_QUERIES.detail.queryKey(tripId),
        (prev: TripCheckListType[]) => {
          const id = variables.id;
          return prev.map((c) => (c.id === id ? { ...c, done: !c.done } : c));
        }
      );

      return { prevSnapshot };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        CHECKLIST_QUERIES.detail.queryKey(tripId),
        context?.prevSnapshot
      );
      toast.error('체크리스트 수정에 실패하였습니다.');
    },
    onSettled: () => {
      if (
        queryClient.isMutating({
          mutationKey: ['checklist', 'update', tripId],
        }) === 0
      ) {
        queryClient.invalidateQueries({
          queryKey: CHECKLIST_QUERIES.detail.queryKey(tripId),
        });
      }
    },
  });
};
