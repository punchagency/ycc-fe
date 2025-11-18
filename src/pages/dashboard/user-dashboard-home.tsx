import React from 'react';

const UserDashboardHome: React.FC = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold text-slate-900">Crew overview</h1>
      <p className="mt-2 text-sm text-slate-600">
        This is a placeholder dashboard surface. Use this space to track your vessel tasks, AI requests,
        and vendor updates once the backend data is connected.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Open tasks</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">4</p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Vendors engaged</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">2</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHome;

