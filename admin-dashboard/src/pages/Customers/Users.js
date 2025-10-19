import React, { useEffect, useState } from 'react'
import Loader from '../../components/UI/Loader'
import api from '../../utils/api'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    try {
      const { data } = await api.get('/users')
      setUsers(data || [])
    } catch {
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Customers</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white border rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Email</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-t">
                  <td className="px-4 py-2 text-sm">{u.name || '-'}</td>
                  <td className="px-4 py-2 text-sm">{u.email}</td>
                  <td className="px-4 py-2 text-sm">{u.role || 'customer'}</td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr><td colSpan="3" className="px-4 py-6 text-center text-sm text-gray-600">No users</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
