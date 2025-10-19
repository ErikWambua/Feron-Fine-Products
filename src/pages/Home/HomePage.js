import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import ProductGrid from '../../components/Product/ProductGrid';

export default function HomePage() {
  const { products } = useProducts({ limit: 8 });
  return (
    <div>
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl sm:text-4xl font-bold">Discover Feron Fine Products</h1>
          <p className="mt-3 text-gray-700 max-w-2xl">Premium selection, seamless checkout, and fast delivery. Explore our latest arrivals.</p>
          <div className="mt-6">
            <Link to="/products" className="inline-block bg-primary text-white rounded px-5 py-3 hover:opacity-90">Shop Now</Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Latest Products</h2>
          <Link to="/products" className="text-primary hover:underline">View all</Link>
        </div>
        <ProductGrid products={products.slice(0, 8)} />
      </section>
    </div>
  );
}
