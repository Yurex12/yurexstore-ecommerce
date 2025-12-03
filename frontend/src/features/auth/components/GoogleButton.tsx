import { GoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';
import useGoogleLogin from '../hooks/useGoogleLogin';

export default function GoogleAuthButton() {
  const { loginWithGoogle } = useGoogleLogin();

  return (
    <GoogleLogin
      text='continue_with'
      logo_alignment='center'
      onSuccess={(credentialResponse) => {
        const tokenId = credentialResponse.credential;
        if (!tokenId) {
          toast.error('Something went wrong');
          return;
        }

        loginWithGoogle(tokenId);
      }}
      onError={() => {
        toast.error('Google Login Failed');
      }}
    />
  );
}
