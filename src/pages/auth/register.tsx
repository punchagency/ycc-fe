import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRegister } from '../../data/hooks/auth';
import type { RegisterPayload } from '../../data/api/auth';
import type { RegistrationResponse } from '../../types/api';
import { setAuth } from '../../store/slices/authSlice';
import { setUser } from '../../store/slices/userSlice';
import type { IUser } from '../../types/auth.type';
import logo from '../../assets/images/YCC-home-banner-new.png';
import Session from '../../utils/Session';

type FormState = RegisterPayload;

type FeedbackState = { type: 'success' | 'error'; message: string } | null;

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
  const dispatch = useDispatch();
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const { mutateAsync: register, isPending } = useRegister();

  const handleInputChange =
    (field: keyof FormState, transform?: (value: string) => string) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = transform
        ? transform(event.target.value)
        : event.target.value;
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
      const response = (await register(formState)) as RegistrationResponse;
      console.log('Registration response:', response);

      const data = response.data;
      if (data?.token) {
        dispatch(
          setAuth({ token: data.token, refreshToken: data.refreshToken })
        );
        Session.set('token', data.token);
      }

      if (data?.refreshToken) {
        Session.set('refreshToken', data.refreshToken);
      }

      const user = (data?.user ?? null) as IUser | null;
      if (user) {
        dispatch(setUser(user));
        Session.set('user', user);
      }

      setFeedback({
        type: 'success',
        message: 'Registration successful. Redirecting...',
      });
      setTimeout(() => navigate('/dashboard'), 800);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to register. Please try again.';
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
    <div className='min-h-screen bg-white grid grid-cols-1 lg:grid-cols-2'>
      {/* Left Panel - Hero Section */}
      <div className='relative hidden lg:flex items-center justify-center bg-gradient-to-b from-sky-900 to-slate-900 p-12 text-white'>
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
              Join the trusted marketplace for global crew, vendors, and AI
              support.
            </h2>
          </div>
          <p className='text-base text-white/80'>
            Create your account to unlock provisioning support, vendor sourcing,
            and crew workflows tailored to your role.
          </p>
        </div>
        <div className='absolute inset-0 bg-black/30 pointer-events-none' />
      </div>

      {/* Right Panel - Registration Form */}
      <div className='flex items-center justify-center px-6 py-10'>
        <div className='w-full max-w-2xl space-y-6'>
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
                Get started today
              </p>
            </div>
          </div>

          <div className='space-y-1'>
            <h1 className='text-2xl font-semibold text-slate-900'>
              Create your account
            </h1>
            <p className='text-sm text-slate-500'>
              Fill in the details below to unlock the full experience.
            </p>
          </div>

          <form className='space-y-4' onSubmit={handleSubmit}>
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <label
                  className='text-sm font-medium text-slate-700'
                  htmlFor='firstName'
                >
                  First name *
                </label>
                <input
                  id='firstName'
                  type='text'
                  required
                  value={formState.firstName}
                  onChange={handleInputChange('firstName')}
                  className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30'
                  placeholder='Jane'
                />
              </div>

              <div className='space-y-2'>
                <label
                  className='text-sm font-medium text-slate-700'
                  htmlFor='lastName'
                >
                  Last name *
                </label>
                <input
                  id='lastName'
                  type='text'
                  required
                  value={formState.lastName}
                  onChange={handleInputChange('lastName')}
                  className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30'
                  placeholder='Doe'
                />
              </div>
            </div>

            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <label
                  className='text-sm font-medium text-slate-700'
                  htmlFor='email'
                >
                  Email *
                </label>
                <input
                  id='email'
                  type='email'
                  required
                  value={formState.email}
                  onChange={handleInputChange('email')}
                  className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30'
                  placeholder='you@company.com'
                />
              </div>

              <div className='space-y-2'>
                <label
                  className='text-sm font-medium text-slate-700'
                  htmlFor='phone'
                >
                  Phone
                </label>
                <input
                  id='phone'
                  type='tel'
                  value={formState.phone ?? ''}
                  onChange={handleInputChange('phone')}
                  className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30'
                  placeholder='+1 (555) 123-4567'
                />
              </div>
            </div>

            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <label
                  className='text-sm font-medium text-slate-700'
                  htmlFor='password'
                >
                  Password *
                </label>
                <input
                  id='password'
                  type='password'
                  required
                  value={formState.password}
                  onChange={handleInputChange('password')}
                  className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30'
                  placeholder='••••••••'
                />
              </div>

              <div className='space-y-2'>
                <label
                  className='text-sm font-medium text-slate-700'
                  htmlFor='role'
                >
                  Role *
                </label>
                <select
                  id='role'
                  value={formState.role}
                  onChange={handleInputChange('role')}
                  className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30'
                >
                  <option value='crew'>Crew Member</option>
                  <option value='distributor'>Distributor</option>
                  <option value='manufacturer'>Manufacturer</option>
                  <option value='service_provider'>Service Provider</option>
                </select>
              </div>
            </div>

            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <label
                  className='text-sm font-medium text-slate-700'
                  htmlFor='nationality'
                >
                  Nationality
                </label>
                <input
                  id='nationality'
                  type='text'
                  value={formState.nationality ?? ''}
                  onChange={handleInputChange('nationality')}
                  className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30'
                  placeholder='United States'
                />
              </div>

              <div className='space-y-2'>
                <label
                  className='text-sm font-medium text-slate-700'
                  htmlFor='profilePicture'
                >
                  Profile picture
                </label>
                <input
                  id='profilePicture'
                  type='file'
                  accept='image/jpeg,image/png,image/jpg,image/webp'
                  onChange={handleFileChange}
                  className='w-full rounded-lg border border-dashed border-slate-300 bg-white px-4 py-2 text-sm text-slate-600 file:mr-4 file:rounded-md file:border-none file:bg-sky-500/20 file:px-4 file:py-2 file:text-slate-900'
                />
                <p className='text-xs text-slate-500'>
                  JPEG, PNG, JPG, WEBP up to 5MB.
                </p>
              </div>
            </div>

            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <label
                  className='text-sm font-medium text-slate-700'
                  htmlFor='businessName'
                >
                  Business name
                </label>
                <input
                  id='businessName'
                  type='text'
                  value={formState.businessName ?? ''}
                  onChange={handleInputChange('businessName')}
                  className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30'
                  placeholder='Yacht Crew Supply Co.'
                />
              </div>

              <div className='space-y-2'>
                <label
                  className='text-sm font-medium text-slate-700'
                  htmlFor='businessType'
                >
                  Business type
                </label>
                <input
                  id='businessType'
                  type='text'
                  value={formState.businessType ?? ''}
                  onChange={handleInputChange('businessType')}
                  className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30'
                  placeholder='Provisioning, Maintenance, etc.'
                />
              </div>
            </div>

            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <label
                  className='text-sm font-medium text-slate-700'
                  htmlFor='businessEmail'
                >
                  Business email
                </label>
                <input
                  id='businessEmail'
                  type='email'
                  value={formState.businessEmail ?? ''}
                  onChange={handleInputChange('businessEmail')}
                  className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30'
                  placeholder='team@yccompany.com'
                />
              </div>

              <div className='space-y-2'>
                <label
                  className='text-sm font-medium text-slate-700'
                  htmlFor='businessPhone'
                >
                  Business phone
                </label>
                <input
                  id='businessPhone'
                  type='tel'
                  value={formState.businessPhone ?? ''}
                  onChange={handleInputChange('businessPhone')}
                  className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30'
                  placeholder='+44 20 1234 5678'
                />
              </div>
            </div>

            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <label
                  className='text-sm font-medium text-slate-700'
                  htmlFor='website'
                >
                  Website
                </label>
                <input
                  id='website'
                  type='url'
                  value={formState.website ?? ''}
                  onChange={handleInputChange('website')}
                  className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30'
                  placeholder='https://yoursite.com'
                />
              </div>

              <div className='space-y-2'>
                <label
                  className='text-sm font-medium text-slate-700'
                  htmlFor='taxId'
                >
                  Tax ID
                </label>
                <input
                  id='taxId'
                  type='text'
                  value={formState.taxId ?? ''}
                  onChange={handleInputChange('taxId')}
                  className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30'
                  placeholder='XX-XXXXXXX'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <label
                className='text-sm font-medium text-slate-700'
                htmlFor='license'
              >
                License
              </label>
              <input
                id='license'
                type='text'
                value={formState.license ?? ''}
                onChange={handleInputChange('license')}
                className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30'
                placeholder='DOC / MLC, etc.'
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

            <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
              <button
                type='submit'
                disabled={isPending}
                className='rounded-lg bg-sky-600 px-6 py-2.5 font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70'
              >
                {isPending ? 'Creating account...' : 'Create account'}
              </button>

              <button
                type='button'
                onClick={resetOptionalFields}
                className='text-sm font-medium text-slate-500 underline-offset-4 hover:text-slate-700 hover:underline'
              >
                Clear optional details
              </button>
            </div>
          </form>

          <p className='text-sm text-slate-500'>
            Already have an account?{' '}
            <Link
              to='/login'
              className='font-medium text-sky-600 hover:text-sky-700'
            >
              Sign in instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
