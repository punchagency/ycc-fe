import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import type { RegisterInput } from '../../types/auth.type';
import logo from '../../assets/images/YCC-home-banner-new.png';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

type FormState = RegisterInput;

type FeedbackState = { type: 'success' | 'error'; message: string } | null;

const initialFormState: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: 'user',
  phone: '',
  nationality: '',
  address: {
    street: '',
    zipcode: '',
    city: '',
    state: '',
    country: '',
  },
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
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const { register } = useAuth();

  const isBusinessRole = useMemo(
    () => formState.role === 'distributor' || formState.role === 'manufacturer',
    [formState.role]
  );

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

    if (!formState.firstName || !formState.lastName || !formState.email || !formState.password) {
      toast.error('Please fill required fields: first name, last name, email, password.');
      return;
    }
    if (!formState.address.street || !formState.address.zipcode || !formState.address.city || !formState.address.state || !formState.address.country) {
      toast.error('Please provide your full address details.');
      return;
    }

    if (isBusinessRole && currentStep === 1) {
      setCurrentStep(2);
      return;
    }

    try {
      const fd = new FormData();
      fd.append('firstName', formState.firstName);
      fd.append('lastName', formState.lastName);
      fd.append('email', formState.email);
      fd.append('password', formState.password);
      if (formState.phone) fd.append('phone', formState.phone);
      if (formState.nationality) fd.append('nationality', formState.nationality);
      fd.append('role', formState.role);
      fd.append('address[street]', formState.address.street);
      fd.append('address[zipcode]', formState.address.zipcode);
      fd.append('address[city]', formState.address.city);
      fd.append('address[state]', formState.address.state);
      fd.append('address[country]', formState.address.country);
      if (formState.profilePicture) fd.append('profilePicture', formState.profilePicture);
      if (isBusinessRole) {
        if (formState.businessName) fd.append('businessName', formState.businessName);
        if (formState.businessType) fd.append('businessType', formState.businessType);
        if (formState.businessEmail) fd.append('businessEmail', formState.businessEmail);
        if (formState.businessPhone) fd.append('businessPhone', formState.businessPhone);
        if (formState.website) fd.append('website', formState.website);
        if (formState.taxId) fd.append('taxId', formState.taxId);
        if (formState.license) fd.append('license', formState.license);
      }

      const response = await register.mutateAsync(fd);
      const successMessage = response?.data?.message || 'Registration successful. Please check your email for activation code.';
      toast.success(successMessage);
      setFeedback({ type: 'success', message: successMessage });
      setTimeout(() => navigate('/login'), 1500);
    } catch (error: any) {
      const message = error?.response?.data?.message || (error instanceof Error ? error.message : 'Unable to register. Please try again.');
      toast.error(message);
      setFeedback({ type: 'error', message });
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
            <div className='flex items-center justify-between text-sm text-slate-600'>
              <div className='flex items-center gap-2'>
                <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${currentStep >= 1 ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-600'}`}>1</span>
                <span>Account details</span>
              </div>
              {isBusinessRole && (
                <div className='flex items-center gap-2'>
                  <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${currentStep === 2 ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-600'}`}>2</span>
                  <span>Business information</span>
                </div>
              )}
            </div>

            {currentStep === 1 && (
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <label
                  className='text-sm font-medium text-slate-700'
                  htmlFor='firstName'
                >
                  First name *
                </label>
                <Input
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
                <Input
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
            )}

            {currentStep === 1 && (
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <label
                  className='text-sm font-medium text-slate-700'
                  htmlFor='email'
                >
                  Email *
                </label>
                <Input
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
                <Input
                  id='phone'
                  type='tel'
                  value={formState.phone ?? ''}
                  onChange={handleInputChange('phone')}
                  className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30'
                  placeholder='+1 (555) 123-4567'
                />
              </div>
            </div>
            )}

            {currentStep === 1 && (
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <label
                  className='text-sm font-medium text-slate-700'
                  htmlFor='password'
                >
                  Password *
                </label>
                <Input
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
                <Select
                  onValueChange={(value) => {
                    setCurrentStep(1);
                    handleInputChange('role')({
                      target: { value },
                    } as React.ChangeEvent<HTMLInputElement>);
                  }}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select a role' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='user'>Crew</SelectItem>
                    <SelectItem value='distributor'>Distributor</SelectItem>
                    <SelectItem value='manufacturer'>Manufacturer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            )}

            {currentStep === 1 && (
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <label
                  className='text-sm font-medium text-slate-700'
                  htmlFor='nationality'
                >
                  Nationality
                </label>
                <Input
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
                <Input
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
            )}

            {currentStep === 1 && (
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <label className='text-sm font-medium text-slate-700' htmlFor='street'>Street *</label>
                <Input id='street' type='text' required value={formState.address.street} onChange={(e) => setFormState((prev) => ({ ...prev, address: { ...prev.address, street: e.target.value } }))} className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30' placeholder='123 Marina Blvd' />
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-medium text-slate-700' htmlFor='zipcode'>Zipcode *</label>
                <Input id='zipcode' type='text' required value={formState.address.zipcode} onChange={(e) => setFormState((prev) => ({ ...prev, address: { ...prev.address, zipcode: e.target.value } }))} className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30' placeholder='90210' />
              </div>
            </div>
            )}

            {currentStep === 1 && (
            <div className='grid gap-4 md:grid-cols-3'>
              <div className='space-y-2'>
                <label className='text-sm font-medium text-slate-700' htmlFor='city'>City *</label>
                <Input id='city' type='text' required value={formState.address.city} onChange={(e) => setFormState((prev) => ({ ...prev, address: { ...prev.address, city: e.target.value } }))} className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30' placeholder='Miami' />
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-medium text-slate-700' htmlFor='state'>State *</label>
                <Input id='state' type='text' required value={formState.address.state} onChange={(e) => setFormState((prev) => ({ ...prev, address: { ...prev.address, state: e.target.value } }))} className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30' placeholder='FL' />
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-medium text-slate-700' htmlFor='country'>Country *</label>
                <Input id='country' type='text' required value={formState.address.country} onChange={(e) => setFormState((prev) => ({ ...prev, address: { ...prev.address, country: e.target.value } }))} className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30' placeholder='United States' />
              </div>
            </div>
            )}

            {currentStep === 2 && isBusinessRole && (
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <label
                  className='text-sm font-medium text-slate-700'
                  htmlFor='businessName'
                >
                  Business name
                </label>
                <Input
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
                <Input
                  id='businessType'
                  type='text'
                  value={formState.businessType ?? ''}
                  onChange={handleInputChange('businessType')}
                  className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30'
                  placeholder='Provisioning, Maintenance, etc.'
                />
              </div>
            </div>
            )}

            {currentStep === 2 && isBusinessRole && (
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <label
                  className='text-sm font-medium text-slate-700'
                  htmlFor='businessEmail'
                >
                  Business email
                </label>
                <Input
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
                <Input
                  id='businessPhone'
                  type='tel'
                  value={formState.businessPhone ?? ''}
                  onChange={handleInputChange('businessPhone')}
                  className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30'
                  placeholder='+44 20 1234 5678'
                />
              </div>
            </div>
            )}

            {currentStep === 2 && isBusinessRole && (
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <label
                  className='text-sm font-medium text-slate-700'
                  htmlFor='website'
                >
                  Website
                </label>
                <Input
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
                <Input
                  id='taxId'
                  type='text'
                  value={formState.taxId ?? ''}
                  onChange={handleInputChange('taxId')}
                  className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30'
                  placeholder='XX-XXXXXXX'
                />
              </div>
            </div>
            )}

            {currentStep === 2 && isBusinessRole && (
            <div className='space-y-2'>
              <label
                className='text-sm font-medium text-slate-700'
                htmlFor='license'
              >
                License
              </label>
              <Input
                id='license'
                type='text'
                value={formState.license ?? ''}
                onChange={handleInputChange('license')}
                className='w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30'
                placeholder='DOC / MLC, etc.'
              />
            </div>
            )}

            {feedback && (
              <p
                className={`text-sm ${feedback.type === 'success'
                    ? 'text-emerald-500'
                    : 'text-rose-500'
                  }`}
              >
                {feedback.message}
              </p>
            )}

            <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
              {!isBusinessRole && (
                <Button
                  type='submit'
                  disabled={register.isPending}
                  className='rounded-lg bg-sky-600 px-6 py-2.5 font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70'
                >
                  {register.isPending ? 'Creating account...' : 'Create account'}
                </Button>
              )}
              {isBusinessRole && currentStep === 1 && (
                <Button
                  type='submit'
                  disabled={register.isPending}
                  className='rounded-lg bg-sky-600 px-6 py-2.5 font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70'
                >
                  Next
                </Button>
              )}
              {isBusinessRole && currentStep === 2 && (
                <Button
                  type='submit'
                  disabled={register.isPending}
                  className='rounded-lg bg-sky-600 px-6 py-2.5 font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70'
                >
                  {register.isPending ? 'Creating account...' : 'Create account'}
                </Button>
              )}

              <Button
                type='button'
                variant="ghost"
                onClick={resetOptionalFields}
                className='text-sm font-medium text-slate-500 underline-offset-4 hover:text-slate-700 hover:underline'
              >
                Clear optional details
              </Button>
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
