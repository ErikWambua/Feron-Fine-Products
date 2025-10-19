import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../utils/api';
import { useCart } from '../../context/CartContext';
import Loader from '../../components/UI/Loader';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addItem } = useCart();

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await api.get(`/products/${id}`);
        if (active) setProduct(data);
      } catch (e) {
        setError(e?.response?.data?.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div className="max-w-3xl mx-auto px-4 py-10 text-red-600">{error}</div>;
  if (!product) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={product.image || product.thumbnail || 'https://via.placeholder.com/800x600'} alt={product.name} className="w-full rounded border border-gray-200" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <div className="mt-2 text-gray-700">{product.description}</div>
          <div className="mt-4 text-2xl font-semibold">${(product.price || 0).toFixed(2)}</div>
          <div className="mt-6">
            <button onClick={() => addItem(product, 1)} className="bg-primary text-white rounded px-5 py-3">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
