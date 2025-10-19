import React, { useState } from 'react';

export default function WishlistPage() {
  const [items] = useState([]);
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold mb-6">Wishlist</h1>
      {items.length === 0 ? (
        <div className="text-gray-600">Your wishlist is empty.</div>
      ) : (
        <div>Wishlist items here</div>
      )}
    </div>
  );
}
