import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { addToast } = useUI();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState({ name: '', phone: '', address: '', city: '' });
  const [payment, setPayment] = useState('mpesa');

  const canContinue = step === 1 ? (shipping.name && shipping.phone && shipping.address && shipping.city) : true;

  const placeOrder = () => {
    // In a full integration, we'd call backend to create order/payment
    addToast('Order placed successfully', 'success');
    clearCart();
    navigate('/account/orders');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-6">
          <section className="border border-gray-200 rounded p-4">
            <h2 className="font-semibold mb-3">1. Shipping Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700">Full Name</label>
                <input className="mt-1 w-full border border-gray-300 rounded px-3 py-2" value={shipping.name} onChange={(e) => setShipping(s => ({...s, name: e.target.value}))} />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Phone</label>
                <input className="mt-1 w-full border border-gray-300 rounded px-3 py-2" value={shipping.phone} onChange={(e) => setShipping(s => ({...s, phone: e.target.value}))} placeholder="e.g. 07XXXXXXXX" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm text-gray-700">Address</label>
                <input className="mt-1 w-full border border-gray-300 rounded px-3 py-2" value={shipping.address} onChange={(e) => setShipping(s => ({...s, address: e.target.value}))} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm text-gray-700">City</label>
                <input className="mt-1 w-full border border-gray-300 rounded px-3 py-2" value={shipping.city} onChange={(e) => setShipping(s => ({...s, city: e.target.value}))} />
              </div>
            </div>
          </section>

          <section className="border border-gray-200 rounded p-4">
            <h2 className="font-semibold mb-3">2. Payment Method</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input type="radio" name="payment" checked={payment === 'mpesa'} onChange={() => setPayment('mpesa')} />
                <span>M-Pesa</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="radio" name="payment" checked={payment === 'cod'} onChange={() => setPayment('cod')} />
                <span>Cash on Delivery</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="radio" name="payment" checked={payment === 'bank'} onChange={() => setPayment('bank')} />
                <span>Bank Transfer</span>
              </label>
            </div>
          </section>

          <div className="flex items-center gap-3">
            <button disabled={!canContinue} onClick={() => setStep(2)} className={`px-4 py-2 rounded text-white ${canContinue ? 'bg-primary' : 'bg-gray-400 cursor-not-allowed'}`}>Continue</button>
            <button onClick={placeOrder} className="px-4 py-2 rounded border border-gray-300 hover:border-primary">Place Order</button>
          </div>
        </div>

        <aside className="border border-gray-200 rounded p-4 h-fit">
          <div className="font-semibold mb-3">Order Summary</div>
          <div className="flex items-center justify-between mb-1">
            <div>Items</div>
            <div>{items.length}</div>
          </div>
          <div className="flex items-center justify-between mb-3">
            <div>Subtotal</div>
            <div>${subtotal.toFixed(2)}</div>
          </div>
          <div className="text-sm text-gray-600">Shipping calculated at next step.</div>
        </aside>
      </div>
    </div>
  );
}
