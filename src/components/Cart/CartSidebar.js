import React from 'react';
import { useUI } from '../../context/UIContext';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartSidebar() {
  const { isCartOpen, closeCart } = useUI();
  const { items, subtotal } = useCart();

  return (
    <div className={`fixed inset-0 z-40 ${isCartOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isCartOpen}>
      <div className={`absolute inset-0 bg-black/30 transition-opacity ${isCartOpen ? 'opacity-100' : 'opacity-0'}`} onClick={closeCart} />
      <aside className={`absolute right-0 top-0 h-full w-[400px] max-w-[88vw] bg-white border-l border-gray-200 shadow-xl p-4 transition-transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="font-semibold text-lg">Your Cart</div>
          <button onClick={closeCart} aria-label="Close cart" className="p-2">✕</button>
        </div>
        <div className="divide-y divide-gray-200 max-h-[70vh] overflow-auto">
          {items.length === 0 ? (
            <div className="py-10 text-center text-gray-600">Your cart is empty.</div>
          ) : (
            items.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center gap-4 py-4">
                <img src={product.image || product.thumbnail || 'https://via.placeholder.com/80'} alt={product.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-gray-600">Qty: {quantity}</div>
                </div>
                <div className="font-medium">${(product.price || 0).toFixed(2)}</div>
              </div>
            ))
          )}
        </div>
        <div className="mt-4 flex items-center justify-between text-lg font-semibold">
          <div>Subtotal</div>
          <div>${subtotal.toFixed(2)}</div>
        </div>
        <Link to="/checkout" onClick={closeCart} className="mt-4 block text-center bg-primary text-white rounded px-4 py-2 hover:opacity-90">Checkout</Link>
      </aside>
    </div>
  );
}
