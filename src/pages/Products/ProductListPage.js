import React, { useMemo, useState } from 'react';
import ProductGrid from '../../components/Product/ProductGrid';
import ProductFilters from '../../components/Product/ProductFilters';
import ProductSort from '../../components/Product/ProductSort';
import { useProducts } from '../../hooks/useProducts';
import Loader from '../../components/UI/Loader';

export default function ProductListPage() {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('latest');
  const { products, loading, error } = useProducts(filters);

  const sorted = useMemo(() => {
    const list = [...products];
    switch (sort) {
      case 'price-asc':
        return list.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price-desc':
        return list.sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'name-asc':
        return list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      case 'name-desc':
        return list.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
      default:
        return list;
    }
  }, [products, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <ProductSort sort={sort} setSort={setSort} />
      </div>
      <ProductFilters filters={filters} setFilters={setFilters} />
      {loading && <Loader />}
      {error && <div className="text-red-600 mt-4">{error}</div>}
      {!loading && !error && <div className="mt-6"><ProductGrid products={sorted} /></div>}
    </div>
  );
}
