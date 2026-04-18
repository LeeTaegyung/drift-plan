import { AuthWrapper, BottomLinkList } from '@/features/auth/_common/ui';
import SignupForm from '@/features/auth/signup/ui/SignupForm';
import { PATH } from '@/shared/constants/path';

const linkList = [
  { name: '로그인', url: PATH.auth.signIn },
  { name: '비밀번호 재설정', url: PATH.auth.forgotPassword },
];

export default function SignupArea() {
  return (
    <AuthWrapper>
      <SignupForm />
      <BottomLinkList linkList={linkList} />
    </AuthWrapper>
  );
}
