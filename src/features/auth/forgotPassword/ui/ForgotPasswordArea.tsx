import { AuthWrapper, BottomLinkList } from '@/features/auth/_common/ui';
import ForgotPasswordForm from '@/features/auth/forgotPassword/ui/ForgotPasswordForm';
import { PATH } from '@/shared/constants/path';

const linkList = [
  { name: '로그인', url: PATH.auth.signIn },
  { name: '회원가입', url: PATH.auth.signUp },
];

export default function ForgotPasswordArea() {
  return (
    <AuthWrapper>
      <ForgotPasswordForm />
      <BottomLinkList linkList={linkList} />
    </AuthWrapper>
  );
}
