import { mutationOptions, QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { CHECKLIST_QUERIES } from '@/entities/checklist/api/checklist.queries';
import { TripCheckListType } from '@/entities/checklist/type';
import { deleteCheckItemAction } from '@/features/trips/checkList/api/checkItemDelete.actions';
import { updateCheckItemAction } from '@/features/trips/checkList/api/checkItemEdit.actions';

export const CHECKLIST_MUTATION = {
  updateAll: () =>
    mutationOptions({
      mutationFn: updateCheckItemAction,
      onError: () => {
        toast.error('체크리스트 수정에 실패하였습니다.');
      },
    }),
  updateCheck: (tripId: string, queryClient: QueryClient) =>
    mutationOptions({
      mutationKey: ['checklist', 'update', tripId],
      mutationFn: updateCheckItemAction,
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
    }),
  delete: (tripId: string, queryClient: QueryClient) =>
    mutationOptions({
      mutationFn: deleteCheckItemAction,
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
            const ids = variables.ids;
            return prev.filter((c) => !ids.includes(c.id));
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
    }),
};
