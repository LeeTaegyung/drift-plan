import { AuthWrapper, BottomLinkList } from '@/features/auth/_common/ui';
import SigninForm from '@/features/auth/signin/ui/SigninForm';
import { PATH } from '@/shared/constants/path';

const linkList = [
  { name: '회원가입', url: PATH.auth.signUp },
  { name: '비밀번호 재설정', url: PATH.auth.forgotPassword },
];

export default function SigninArea() {
  return (
    <AuthWrapper>
      <SigninForm />
      <BottomLinkList linkList={linkList} />
    </AuthWrapper>
  );
}
