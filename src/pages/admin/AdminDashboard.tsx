import { useReduxUser } from '@/hooks/useReduxUser';
import React from 'react'

const AdminDashboard: React.FC = () => {
  const { user } = useReduxUser();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{user?.firstName} {user?.lastName}</h1>
        <p className="text-muted-foreground">Welcome to your dashboard</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Documents</h3>
          <p className="text-sm text-muted-foreground">Manage your documents</p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Bookings</h3>
          <p className="text-sm text-muted-foreground">View your bookings</p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Orders</h3>
          <p className="text-sm text-muted-foreground">Track your orders</p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Reports</h3>
          <p className="text-sm text-muted-foreground">View reports</p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard;
