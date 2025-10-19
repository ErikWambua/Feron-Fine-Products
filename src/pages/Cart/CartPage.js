import React from 'react';
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/Cart/CartItem';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { items, subtotal, clearCart } = useCart();
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-gray-600">Your cart is empty. <Link to="/products" className="text-primary hover:underline">Browse products</Link></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-8">
          <div>
            {items.map((it) => <CartItem key={it.product.id} item={it} />)}
          </div>
          <aside className="border border-gray-200 rounded p-4 h-fit">
            <div className="flex items-center justify-between text-lg font-semibold">
              <div>Subtotal</div>
              <div>${subtotal.toFixed(2)}</div>
            </div>
            <Link to="/checkout" className="mt-4 block text-center bg-primary text-white rounded px-4 py-2 hover:opacity-90">Proceed to Checkout</Link>
            <button onClick={clearCart} className="mt-2 w-full border border-gray-300 rounded px-4 py-2 hover:border-primary">Clear Cart</button>
          </aside>
        </div>
      )}
    </div>
  );
}
