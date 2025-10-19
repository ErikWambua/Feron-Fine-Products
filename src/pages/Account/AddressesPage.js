import React, { useState } from 'react';

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([]);
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold mb-6">Addresses</h1>
      {addresses.length === 0 ? (
        <div className="text-gray-600">No addresses added yet.</div>
      ) : (
        <div>Addresses here</div>
      )}
    </div>
  );
}
