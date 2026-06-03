import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { logout } from '@/entities/user/api/user.api';
import { USER_QUERIES } from '@/entities/user/query/user.queries';

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERIES.all });
    },
    onError: () => {
      toast.error('로그아웃 실패. 다시 시도해주세요.');
    },
  });
};
