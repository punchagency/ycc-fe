import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LandingPageBanner from '../../components/landing-page/landing-page-banner';
import banner from '../../assets/images/YCC-home-banner-new.png';
import { useLogin } from '../../data/hooks/auth';

type FormState = {
  email: string;
  password: string;
};

type FeedbackState =
  | { type: 'success' | 'error'; message: string }
  | null;

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<FormState>({ email: '', password: '' });
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const { mutateAsync: login, isPending } = useLogin();

  const heroContent = useMemo(
    () => ({
      header: (
        <>
          Welcome back to Yacht Crew Center
        </>
      ),
      subtext1:
        'Access your personalized dashboard, manage vessel workflows, and stay connected with your trusted service network.',
      subtext2:
        'Need an account? Join our global network of crew members, suppliers, and maritime partners to unlock premium tooling and AI support.',
    }),
    []
  );

  const handleChange = (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);

    try {
      await login(formState);
      setFeedback({
        type: 'success',
        message: 'Signed in successfully. Redirecting...',
      });
      setTimeout(() => navigate('/'), 800);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to sign in. Please try again.';
      setFeedback({
        type: 'error',
        message,
      });
    }
  };

  return (
    <div className="flex flex-col gap-12 pb-20">
      <LandingPageBanner
        backgroundImage={banner}
        header={heroContent.header}
        subtext1={heroContent.subtext1}
        subtext2={heroContent.subtext2}
        button1={{ text: 'Join Yacht Crew Center', path: '/register' }}
        button2={{ text: 'Explore the public site', path: '/' }}
      />

      <section className="px-4 sm:px-8">
        <div className="mx-auto w-full max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
          <div className="mb-6 space-y-1">
            <h2 className="text-2xl font-semibold text-white">Sign in</h2>
            <p className="text-sm text-white/70">
              Enter your credentials to access your workspace.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={formState.email}
                onChange={handleChange('email')}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/60 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={formState.password}
                onChange={handleChange('password')}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/60 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                placeholder="••••••••"
              />
            </div>

            {feedback && (
              <p
                className={`text-sm ${
                  feedback.type === 'success' ? 'text-emerald-300' : 'text-rose-300'
                }`}
              >
                {feedback.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-lg bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2.5 text-center font-semibold text-white transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPending ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white/70">
            New to Yacht Crew Center?{' '}
            <Link to="/register" className="font-medium text-sky-300 hover:text-sky-200">
              Join the network
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

export default SignInPage;

