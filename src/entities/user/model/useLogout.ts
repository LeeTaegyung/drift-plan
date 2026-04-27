import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { logout } from '@/entities/user/api/user.api';
import { userQueries } from '@/entities/user/api/user.query';

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueries.all });
    },
    onError: () => {
      toast.error('로그아웃 실패. 다시 시도해주세요.');
    },
  });
};
