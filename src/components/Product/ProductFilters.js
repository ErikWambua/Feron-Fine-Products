import React from 'react';

export default function ProductFilters({ filters, setFilters }) {
  const update = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));
  return (
    <div className="flex flex-wrap items-end gap-4 border border-gray-200 rounded p-4">
      <div>
        <label className="block text-sm text-gray-700">Search</label>
        <input type="text" value={filters.q || ''} onChange={(e) => update('q', e.target.value)} className="mt-1 w-56 border border-gray-300 rounded px-3 py-2" placeholder="Search products" />
      </div>
      <div>
        <label className="block text-sm text-gray-700">Category</label>
        <input type="text" value={filters.category || ''} onChange={(e) => update('category', e.target.value)} className="mt-1 w-56 border border-gray-300 rounded px-3 py-2" placeholder="e.g. skincare" />
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => setFilters({})} className="px-3 py-2 rounded border border-gray-300 hover:border-primary">Reset</button>
      </div>
    </div>
  );
}
