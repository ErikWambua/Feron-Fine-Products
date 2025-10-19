import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Button from './Button';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const price = product.price || 0;
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition">
      <Link to={`/products/${product.id}`} className="block aspect-[4/3] bg-gray-100">
        <img src={product.image || product.thumbnail || 'https://via.placeholder.com/400x300'} alt={product.name} className="w-full h-full object-cover" />
      </Link>
      <div className="p-4">
        <Link to={`/products/${product.id}`} className="font-medium line-clamp-1 hover:text-primary">{product.name}</Link>
        <div className="mt-1 text-gray-600 text-sm line-clamp-2">{product.description || ' '}</div>
        <div className="mt-3 flex items-center justify-between">
          <div className="font-semibold">${price.toFixed(2)}</div>
          <Button onClick={() => addItem(product, 1)} size="sm">Add to Cart</Button>
        </div>
      </div>
    </div>
  );
}
