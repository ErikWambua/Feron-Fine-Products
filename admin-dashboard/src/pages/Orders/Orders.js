import React, { useEffect, useState } from 'react'
import Loader from '../../components/UI/Loader'
import api from '../../utils/api'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    try {
      const { data } = await api.get('/orders')
      setOrders(data || [])
    } catch {
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Orders</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white border rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Order #</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Customer</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id} className="border-t">
                  <td className="px-4 py-2 text-sm">{o.orderNumber || o._id}</td>
                  <td className="px-4 py-2 text-sm">{o.customer?.name || o.customerEmail}</td>
                  <td className="px-4 py-2 text-sm">{o.status}</td>
                  <td className="px-4 py-2 text-sm">${o.total?.toFixed(2) || '0.00'}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan="4" className="px-4 py-6 text-center text-sm text-gray-600">No orders</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
