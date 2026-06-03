import { useMemo, useState } from 'react';

import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { CHECKLIST_QUERIES } from '@/entities/checklist/query/checklist.queries';
import {
  CheckListCategoryType,
  TripCheckListType,
} from '@/entities/checklist/type';
import { CheckListFormValues } from '@/features/trips/checkList/model/checklistForm.schema';
import { useCheckListDelete } from '@/features/trips/checkList/mutation/useCheckListDelete';
import {
  useCheckListUpdateAll,
  useCheckListUpdateCheck,
} from '@/features/trips/checkList/mutation/useCheckListUpdate';
import { useAlertModalStore } from '@/shared/store/alertModalStore';

export const useCheckListArea = (tripId: string) => {
  const [isEdit, setIsEdit] = useState(false);
  const [deleteList, setDeleteList] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const openAlertModal = useAlertModalStore((state) => state.openAlertModal);

  const { data: checkList } = useSuspenseQuery(
    CHECKLIST_QUERIES.detail.queryOptions(tripId)
  );
  const { mutateAsync: updateCheckItemMutate } = useCheckListUpdateAll();
  const { mutate: updateCheckItemOnlyCheckMutate } =
    useCheckListUpdateCheck(tripId);
  const { mutateAsync: deleteCheckItemMutate } = useCheckListDelete(tripId);

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
      { formData, id },
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

    await deleteCheckItemMutate(deleteList, {
      onSuccess: () => {
        setDeleteList([]);
      },
    });
  };
  const handleSubmitUpdateCheck = (id: string, done: boolean) => {
    updateCheckItemOnlyCheckMutate({ formData: { done: !done }, id });
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
