import React from 'react';
import { useCart } from '../../context/CartContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;
  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-200">
      <img src={product.image || product.thumbnail || 'https://via.placeholder.com/80'} alt={product.name} className="w-16 h-16 object-cover rounded" />
      <div className="flex-1">
        <div className="font-medium">{product.name}</div>
        <div className="text-sm text-gray-600">${(product.price || 0).toFixed(2)}</div>
        <div className="mt-2 flex items-center gap-2">
          <label htmlFor={`qty-${product.id}`} className="text-sm text-gray-600">Qty</label>
          <input id={`qty-${product.id}`} type="number" min={1} value={quantity} onChange={(e) => updateQuantity(product.id, Number(e.target.value))} className="w-20 border border-gray-300 rounded px-2 py-1" />
          <button onClick={() => removeItem(product.id)} className="text-sm text-red-600 hover:underline">Remove</button>
        </div>
      </div>
    </div>
  );
}
