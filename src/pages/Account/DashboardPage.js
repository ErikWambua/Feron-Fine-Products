import React from 'react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold mb-6">Account Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/account/profile" className="border border-gray-200 rounded p-4 hover:border-primary">
          <div className="font-semibold mb-2">Profile</div>
          <div className="text-sm text-gray-600">Manage your personal information.</div>
        </Link>
        <Link to="/account/orders" className="border border-gray-200 rounded p-4 hover:border-primary">
          <div className="font-semibold mb-2">Orders</div>
          <div className="text-sm text-gray-600">View and track your orders.</div>
        </Link>
        <Link to="/account/addresses" className="border border-gray-200 rounded p-4 hover:border-primary">
          <div className="font-semibold mb-2">Addresses</div>
          <div className="text-sm text-gray-600">Manage shipping addresses.</div>
        </Link>
        <Link to="/account/wishlist" className="border border-gray-200 rounded p-4 hover:border-primary">
          <div className="font-semibold mb-2">Wishlist</div>
          <div className="text-sm text-gray-600">Products you saved for later.</div>
        </Link>
      </div>
    </div>
  );
}
