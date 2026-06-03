import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteCheckItem } from '@/entities/checklist/api/checklist.api';
import { CHECKLIST_QUERIES } from '@/entities/checklist/query/checklist.queries';
import { TripCheckListType } from '@/entities/checklist/type';

export const useCheckListDelete = (tripId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCheckItem,
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
          return prev.filter((c) => !variables.includes(c.id));
        }
      );

      return { prevSnapshot };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        CHECKLIST_QUERIES.detail.queryKey(tripId),
        context?.prevSnapshot
      );
      toast.error('체크리스트 삭제에 실패하였습니다.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: CHECKLIST_QUERIES.detail.queryKey(tripId),
      });
    },
  });
};
