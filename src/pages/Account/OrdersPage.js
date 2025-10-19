import React from 'react';

export default function OrdersPage() {
  // For brevity, using placeholder UI. Real implementation would fetch orders from backend
  const orders = [];
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold mb-6">Your Orders</h1>
      {orders.length === 0 ? (
        <div className="text-gray-600">You have no orders yet.</div>
      ) : (
        <div>Orders list here</div>
      )}
    </div>
  );
}
