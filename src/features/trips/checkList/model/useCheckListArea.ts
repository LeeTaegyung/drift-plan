import { useMemo, useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { CHECKLIST_QUERIES } from '@/entities/checklist/api/checklist.queries';
import {
  CheckListCategoryType,
  TripCheckListType,
} from '@/entities/checklist/type';
import { CHECKLIST_MUTATION } from '@/features/trips/checkList/api/checkItem.mutation';
import { CheckListFormValues } from '@/features/trips/checkList/model/checklistForm.schema';
import { useAlertModalStore } from '@/shared/store/alertModalStore';

export const useCheckListArea = (
  tripId: string,
  initData: TripCheckListType[]
) => {
  const [isEdit, setIsEdit] = useState(false);
  const [deleteList, setDeleteList] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const openAlertModal = useAlertModalStore((state) => state.openAlertModal);

  const { data: checkList } = useQuery(
    CHECKLIST_QUERIES.detail.queryOptions(tripId, initData)
  );
  const { mutateAsync: updateCheckItemMutate } = useMutation(
    CHECKLIST_MUTATION.updateAll()
  );
  const { mutate: updateCheckItemOnlyCheckMutate } = useMutation(
    CHECKLIST_MUTATION.updateCheck(tripId, queryClient)
  );
  const { mutateAsync: deleteCheckItemMutate } = useMutation(
    CHECKLIST_MUTATION.delete(tripId, queryClient)
  );

  const processChecklist = useMemo(() => {
    const newChecklist: Record<CheckListCategoryType, TripCheckListType[]> = {
      essential: [],
      security: [],
      electronics: [],
      toiletries: [],
      beauty: [],
      clothing: [],
      accessories: [],
      hygiene: [],
      travel_gear: [],
      medicine: [],
      food: [],
      etc: [],
    };

    checkList.forEach((checkItem) => {
      const category = checkItem.category as CheckListCategoryType;
      newChecklist[category].push(checkItem);
    });

    return newChecklist;
  }, [checkList]);

  const handleSubmitEdit = async (
    formData: Partial<CheckListFormValues>,
    id: string,
    onSuccessFormClose: () => void
  ) => {
    // 업데이트 서버액션
    await updateCheckItemMutate(
      { formData, tripId, id },
      {
        onSuccess: () => {
          onSuccessFormClose();
          queryClient.invalidateQueries({
            queryKey: CHECKLIST_QUERIES.detail.queryKey(tripId),
          });
        },
      }
    );
  };
  const handleToggleMode = () => {
    setIsEdit((e) => !e);
    setDeleteList([]);
  };
  const handleAddDeleteItem = (id: string) => {
    setDeleteList((prev) => {
      const findItem = prev.includes(id);

      return findItem ? prev.filter((d) => d !== id) : [...prev, id];
    });
  };
  const handleCheckDeleteItem = (id: string) => deleteList.includes(id);
  const handleResetCheckDeleteItem = () => {
    setDeleteList([]);
  };
  const handleSubmitDelete = async () => {
    if (deleteList.length === 0) return;

    const isConfirm = await new Promise<boolean>((resolve) => {
      openAlertModal({
        title: '체크리스트 삭제',
        desc: '정말 삭제하시겠습니까?',
        onAction: () => resolve(true),
        onCancel: () => resolve(false),
      });
    });

    if (!isConfirm) return;

    await deleteCheckItemMutate(
      { ids: deleteList, tripId },
      {
        onSuccess: () => {
          setDeleteList([]);
        },
      }
    );
  };
  const handleSubmitUpdateCheck = (id: string, done: boolean) => {
    updateCheckItemOnlyCheckMutate({ formData: { done: !done }, id, tripId });
  };

  return {
    isEdit,
    checkList,
    processChecklist,
    handleSubmitEdit,
    handleToggleMode,
    handleAddDeleteItem,
    handleCheckDeleteItem,
    handleResetCheckDeleteItem,
    handleSubmitDelete,
    handleSubmitUpdateCheck,
  };
};
