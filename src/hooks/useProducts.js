import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { mockProducts } from '../data/mockData';

export function useProducts(filters = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      setError('');
      try {
        const params = { ...filters };
        if (params.q) params.search = params.q; // backend may expect 'search'
        const { data } = await api.get('/products', { params });
        if (active) setProducts(Array.isArray(data) ? data : data?.items || data?.data || []);
      } catch (e) {
        // fallback to mock data
        if (active) {
          setProducts(mockProducts);
          setError('');
        }
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => { active = false; };
  }, [JSON.stringify(filters)]);

  return { products, loading, error };
}
