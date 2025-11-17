import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LandingPageBanner from '../../components/landing-page/landing-page-banner';
import banner from '../../assets/images/YCC-home-banner-new.png';
import { useRegister } from '../../data/hooks/auth';
import type { RegisterPayload } from '../../data/api/auth';

type FormState = RegisterPayload;

type FeedbackState =
  | { type: 'success' | 'error'; message: string }
  | null;

const initialFormState: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: 'crew',
  phone: '',
  nationality: '',
  businessName: '',
  businessType: '',
  businessEmail: '',
  businessPhone: '',
  website: '',
  taxId: '',
  license: '',
  profilePicture: null,
};

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const { mutateAsync: register, isPending } = useRegister();

  const heroContent = useMemo(
    () => ({
      header: (
        <>
          Join the Yacht Crew Center Network
        </>
      ),
      subtext1:
        'Create a unified profile to access AI-supported sourcing, crew resources, and vendor management tools tailored for maritime teams.',
      subtext2:
        'Complete the quick form below to unlock our marketplace, collaborate with crew worldwide, and streamline operations across every vessel task.',
    }),
    []
  );

  const handleInputChange = (
    field: keyof FormState,
    transform?: (value: string) => string
  ) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = transform ? transform(event.target.value) : event.target.value;
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setFormState((prev) => ({
      ...prev,
      profilePicture: file,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);

    try {
      await register(formState);
      setFeedback({
        type: 'success',
        message: 'Registration successful. Redirecting to sign in...',
      });
      setTimeout(() => navigate('/sign-in'), 1000);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to register. Please try again.';
      setFeedback({
        type: 'error',
        message,
      });
    }
  };

  const resetOptionalFields = () => {
    setFormState((prev) => ({
      ...prev,
      phone: '',
      nationality: '',
      businessName: '',
      businessType: '',
      businessEmail: '',
      businessPhone: '',
      website: '',
      taxId: '',
      license: '',
      profilePicture: null,
    }));
  };

  return (
    <div className="flex flex-col gap-12 pb-20">
      <LandingPageBanner
        backgroundImage={banner}
        header={heroContent.header}
        subtext1={heroContent.subtext1}
        subtext2={heroContent.subtext2}
        button1={{ text: 'Already a member? Sign in', path: '/sign-in' }}
        button2={{ text: 'Return to home', path: '/' }}
      />

      <section className="px-4 sm:px-8">
        <div className="mx-auto w-full max-w-5xl rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
          <div className="mb-6 flex flex-col gap-1 text-white">
            <h2 className="text-2xl font-semibold">Create your account</h2>
            <p className="text-sm text-white/70">
              Complete the details below to unlock the full Yacht Crew Center experience.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white" htmlFor="firstName">
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  required
                  value={formState.firstName}
                  onChange={handleInputChange('firstName')}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/60 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                  placeholder="Jane"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white" htmlFor="lastName">
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  required
                  value={formState.lastName}
                  onChange={handleInputChange('lastName')}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/60 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white" htmlFor="email">
                  Work email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={handleInputChange('email')}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/60 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                  placeholder="you@company.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white" htmlFor="phone">
                  Phone (optional)
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formState.phone ?? ''}
                  onChange={handleInputChange('phone')}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/60 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={formState.password}
                  onChange={handleInputChange('password')}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/60 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white" htmlFor="role">
                  Primary role
                </label>
                <select
                  id="role"
                  value={formState.role}
                  onChange={handleInputChange('role')}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                >
                  <option value="crew">Crew Member</option>
                  <option value="vendor">Vendor / Supplier</option>
                  <option value="service_provider">Service Provider</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white" htmlFor="nationality">
                  Nationality (optional)
                </label>
                <input
                  id="nationality"
                  type="text"
                  value={formState.nationality ?? ''}
                  onChange={handleInputChange('nationality')}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/60 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                  placeholder="United States"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white" htmlFor="profilePicture">
                  Profile photo (optional)
                </label>
                <input
                  id="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full rounded-lg border border-dashed border-white/20 bg-white/5 px-4 py-2 text-sm text-white/70 file:mr-4 file:rounded-md file:border-none file:bg-sky-500/20 file:px-4 file:py-2 file:text-white"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white" htmlFor="businessName">
                  Business name (optional)
                </label>
                <input
                  id="businessName"
                  type="text"
                  value={formState.businessName ?? ''}
                  onChange={handleInputChange('businessName')}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/60 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                  placeholder="Yacht Crew Supply Co."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white" htmlFor="businessType">
                  Business type (optional)
                </label>
                <input
                  id="businessType"
                  type="text"
                  value={formState.businessType ?? ''}
                  onChange={handleInputChange('businessType')}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/60 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                  placeholder="Provisioning, Maintenance, etc."
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white" htmlFor="businessEmail">
                  Business email (optional)
                </label>
                <input
                  id="businessEmail"
                  type="email"
                  value={formState.businessEmail ?? ''}
                  onChange={handleInputChange('businessEmail')}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/60 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                  placeholder="team@yccompany.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white" htmlFor="businessPhone">
                  Business phone (optional)
                </label>
                <input
                  id="businessPhone"
                  type="tel"
                  value={formState.businessPhone ?? ''}
                  onChange={handleInputChange('businessPhone')}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/60 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                  placeholder="+44 20 1234 5678"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white" htmlFor="website">
                  Website (optional)
                </label>
                <input
                  id="website"
                  type="url"
                  value={formState.website ?? ''}
                  onChange={handleInputChange('website')}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/60 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                  placeholder="https://yoursite.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white" htmlFor="taxId">
                  Tax ID (optional)
                </label>
                <input
                  id="taxId"
                  type="text"
                  value={formState.taxId ?? ''}
                  onChange={handleInputChange('taxId')}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/60 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                  placeholder="XX-XXXXXXX"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white" htmlFor="license">
                  License (optional)
                </label>
                <input
                  id="license"
                  type="text"
                  value={formState.license ?? ''}
                  onChange={handleInputChange('license')}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/60 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                  placeholder="DOC / MLC, etc."
                />
              </div>
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

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <button
                type="submit"
                disabled={isPending}
                className="rounded-lg bg-gradient-to-r from-sky-500 to-cyan-400 px-6 py-2.5 font-semibold text-white shadow-lg transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isPending ? 'Creating account...' : 'Create account'}
              </button>

              <button
                type="button"
                onClick={resetOptionalFields}
                className="text-sm font-medium text-white/80 underline-offset-4 hover:text-white hover:underline"
              >
                Clear optional details
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-white/70">
            Already have an account?{' '}
            <Link to="/sign-in" className="font-medium text-sky-300 hover:text-sky-200">
              Sign in instead
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;

