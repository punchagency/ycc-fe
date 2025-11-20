import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import logo from '../../assets/images/YCC-home-banner-new.png';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type FormState = {
  email: string;
  password: string;
};

type FeedbackState = { type: 'success' | 'error'; message: string } | null;

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<FormState>({
    email: '',
    password: '',
  });
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const { login } = useAuth();

  const handleChange =
    (field: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);

    try {
      const response = await login.mutateAsync(formState);
      const successMessage = response?.data?.message || 'Signed in successfully.';
      toast.success(successMessage);
      setFeedback({ type: 'success', message: successMessage + ' Redirecting...' });
      setTimeout(() => navigate('/dashboard'), 500);
    } catch (error: any) {
      const message = error?.response?.data?.message || (error instanceof Error ? error.message : 'Unable to sign in. Please try again.');
      toast.error(message);
      setFeedback({ type: 'error', message });
    }
  };

  return (
    <div className='min-h-screen bg-white grid grid-cols-1 lg:grid-cols-2'>
      <div className='relative hidden lg:flex items-center justify-center bg-linear-to-b from-sky-900 to-slate-900 p-12 text-white'>
        <div className='space-y-6 max-w-md relative z-10'>
          <img
            src={logo}
            alt='Yacht Crew Center logo'
            className='h-20 w-20 object-contain rounded-2xl shadow-lg'
          />
          <div>
            <p className='text-sm uppercase tracking-[0.35em] text-white/60'>
              Yacht Crew Center
            </p>
            <h2 className='mt-3 text-4xl font-semibold leading-tight'>
              Every vessel task, AI partner, and supplier in one workspace.
            </h2>
          </div>
          <p className='text-base text-white/80'>
            Sign back in to continue coordinating your crew logistics, vendor
            briefs, and AI-supported requests.
          </p>
        </div>
        <div className='absolute inset-0 bg-black/30 pointer-events-none' />
      </div>

      <div className='flex items-center justify-center px-6 py-10'>
        <div className='w-full max-w-md space-y-6'>
          <div className='flex items-center gap-3'>
            <img
              src={logo}
              alt='Yacht Crew Center logo'
              className='h-12 w-12 object-contain rounded-xl'
            />
            <div>
              <p className='text-sm font-semibold text-slate-500'>
                Yacht Crew Center
              </p>
              <p className='text-lg font-semibold text-slate-900'>
                Welcome back
              </p>
            </div>
          </div>
          <div className='space-y-1'>
            <h1 className='text-2xl font-semibold text-slate-900'>Sign in</h1>
            <p className='text-sm text-slate-500'>
              Enter your email and password to access your dashboard.
            </p>
          </div>

          <form className='space-y-5' onSubmit={handleSubmit}>
            <div className='space-y-2'>
              <label
                className='text-sm font-medium text-slate-700'
                htmlFor='email'
              >
                Email address
              </label>
              <Input
                id='email'
                type='email'
                required
                value={formState.email}
                onChange={handleChange('email')}
                className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30'
                placeholder='you@example.com'
              />
            </div>

            <div className='space-y-2'>
              <label
                className='text-sm font-medium text-slate-700'
                htmlFor='password'
              >
                Password
              </label>
              <Input
                id='password'
                type='password'
                required
                value={formState.password}
                onChange={handleChange('password')}
                className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30'
                placeholder='••••••••'
              />
            </div>

            {feedback && (
              <p
                className={`text-sm ${
                  feedback.type === 'success'
                    ? 'text-emerald-500'
                    : 'text-rose-500'
                }`}
              >
                {feedback.message}
              </p>
            )}

            <Button
              type='submit'
              disabled={login.isPending}
              size="lg"
              className='w-full rounded-lg px-4 py-2.5 text-center font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70'
            >
              {login.isPending ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <p className='text-sm text-slate-500'>
            New to Yacht Crew Center?{' '}
            <Link
              to='/get-started'
              className='font-medium text-sky-600 hover:text-sky-700'
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
