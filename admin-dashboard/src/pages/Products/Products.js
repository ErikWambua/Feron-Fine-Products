import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/UI/Button'
import Loader from '../../components/UI/Loader'
import { formatCurrency } from '../../utils/helpers'
import api from '../../utils/api'

export default function Products() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    try {
      const { data } = await api.get('/products')
      setItems(data || [])
    } catch {
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Products</h1>
        <Link to="/products/new"><Button>Add Product</Button></Link>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white border rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Price</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Stock</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p._id} className="border-t">
                  <td className="px-4 py-2 text-sm">{p.name}</td>
                  <td className="px-4 py-2 text-sm">{formatCurrency(p.price)}</td>
                  <td className="px-4 py-2 text-sm">{p.stock}</td>
                  <td className="px-4 py-2 text-right text-sm">
                    <Link className="text-primary-700 hover:text-primary-900" to={`/products/${p._id}`}>Edit</Link>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan="4" className="px-4 py-6 text-center text-sm text-gray-600">No products</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
