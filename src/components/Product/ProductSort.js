import React from 'react';

export default function ProductSort({ sort, setSort }) {
  return (
    <div>
      <label className="block text-sm text-gray-700">Sort by</label>
      <select value={sort} onChange={(e) => setSort(e.target.value)} className="mt-1 border border-gray-300 rounded px-3 py-2">
        <option value="latest">Latest</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A → Z</option>
        <option value="name-desc">Name: Z → A</option>
      </select>
    </div>
  );
}
