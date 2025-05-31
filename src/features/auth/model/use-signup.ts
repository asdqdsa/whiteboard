import { publicRqClient } from '@/shared/api/instance';
import type { ApiSchemas } from '@/shared/api/schema';
import { ROUTES } from '@/shared/model/routes';
import { useSession } from '@/shared/model/session';
import { useNavigate } from 'react-router-dom';

export function useSignup() {
  const navigate = useNavigate();
  const session = useSession();

  const signupMutation = publicRqClient.useMutation('post', '/auth/signup', {
    onSuccess(data) {
      session.login(data.accessToken);
      navigate(ROUTES.HOME);
    },
  });

  const signup = (data: ApiSchemas['SignupRequest']) => {
    signupMutation.mutate({ body: data });
  };

  const errorMessage = signupMutation.isError ? signupMutation.error : undefined;

  return {
    signup,
    isPending: signupMutation.isPending,
    errorMessage,
  };
}
