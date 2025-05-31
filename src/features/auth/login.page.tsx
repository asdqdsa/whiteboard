// import { rqClient } from '@/shared/api/instance';
import { ROUTES } from '@/shared/model/routes';
import { Link } from 'react-router-dom';
import { AuthLayout } from './ui/auth-layout';
import { LoginForm } from './ui/login-form';

export function LoginPage() {
  // const loginMutation = rqClient.useMutation('post', '/auth/login');
  // loginMutation.mutate({
  //   body: { email: 'testemail', password: 'testpassword' },
  // });

  return (
    <AuthLayout
      title={'Welcome back'}
      description="Enter your email and password"
      footerText={
        <>
          Don't have an account?{' '}
          <Link className="text-primary underline" to={ROUTES.SIGNUP}>
            Sign Up
          </Link>
        </>
      }
      form={<LoginForm submitText="Log In" />}
    />
  );
}

export const Component = LoginPage;
