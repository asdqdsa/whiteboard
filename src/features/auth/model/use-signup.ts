import { rqClient } from '@/shared/api/instance';
import type { ApiSchemas } from '@/shared/api/schema';
import { ROUTES } from '@/shared/model/routes';
import { useNavigate } from 'react-router-dom';

export function useSignup() {
  const navigate = useNavigate();
  const signupMutation = rqClient.useMutation('post', '/auth/signup', {
    onSuccess() {
      navigate(ROUTES.HOME);
    },
  });

  const signup = (data: ApiSchemas['SignupRequest']) => {
    signupMutation.mutate({ body: data });
  };

  const errorMessage = signupMutation.isError
    ? signupMutation.error
    : undefined;

  return {
    signup,
    isPending: signupMutation.isPending,
    errorMessage,
  };
}
