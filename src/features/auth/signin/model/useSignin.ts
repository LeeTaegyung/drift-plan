import { useMutation } from '@tanstack/react-query';

import { signIn } from '@/features/auth/signin/api/signin.api';

export const useSignin = () => {
  return useMutation({
    mutationFn: signIn,
  });
};
