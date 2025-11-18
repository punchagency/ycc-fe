import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import logo from '../assets/images/YCC-home-banner-new.png';
import { useReduxAuth } from '../hooks/useReduxAuth';

const UserDashboardLayout: React.FC = () => {
  const { user } = useReduxAuth();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-slate-200">
        <div className="px-6 py-5 border-b border-slate-200 flex items-center gap-3">
          <img src={logo} alt="Yacht Crew Center logo" className="h-10 w-10 object-contain rounded-lg" />
          <div>
            <p className="text-sm font-semibold text-slate-900">Yacht Crew Center</p>
            <p className="text-xs text-slate-500">Crew dashboard</p>
          </div>
        </div>
        <nav className="flex-1 px-6 py-6 space-y-4 text-sm text-slate-600">
          <Link to="/dashboard" className="block rounded-lg px-3 py-2 bg-slate-100 text-slate-900 font-medium">
            Overview
          </Link>
          <button type="button" className="block w-full text-left rounded-lg px-3 py-2 hover:bg-slate-100 transition">
            Tasks
          </button>
          <button type="button" className="block w-full text-left rounded-lg px-3 py-2 hover:bg-slate-100 transition">
            Messages
          </button>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Welcome back</p>
            <p className="text-lg font-semibold text-slate-900">
              {user?.firstName ? `${user.firstName} ${user.lastName ?? ''}`.trim() : 'Crew Member'}
            </p>
          </div>
          <img src={logo} alt="Yacht Crew Center mark" className="h-10 w-10 object-contain rounded-lg md:hidden" />
        </header>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default UserDashboardLayout;

