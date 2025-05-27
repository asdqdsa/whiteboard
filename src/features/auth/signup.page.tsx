import { Link } from 'react-router-dom';
import { AuthLayout } from './auth-layout';
import { ROUTES } from '@/shared/model/routes';
import { SignupForm } from './signup-form';

function SignupPage() {
  return (
    <AuthLayout
      title='Quick Sign Up'
      description='Enter your email and password'
      footerText={
        <>
          Already have an account?{' '}
          <Link className='underline text-primary' to={ROUTES.LOGIN}>
            Log In
          </Link>
        </>
      }
      form={<SignupForm submitText='Sign Up' />}
    />
  );
}

export const Component = SignupPage;
