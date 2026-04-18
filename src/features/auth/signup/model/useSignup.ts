import { useMutation } from '@tanstack/react-query';

import { signUp } from '@/features/auth/signup/api/signup.api';

export const useSignup = () => {
  return useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log(data);
    },
  });
};
