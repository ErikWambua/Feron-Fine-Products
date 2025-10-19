import React from 'react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import useAuth from '../../hooks/useAuth'

export default function Header() {
  const { user, logout } = useAuth()
  return (
    <header className="border-b bg-white">
      <div className="container-app h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="md:hidden p-2 rounded hover:bg-gray-100" aria-label="Open sidebar">
            <Bars3Icon className="w-6 h-6" />
          </button>
          <span className="font-semibold text-gray-800">Feron Admin</span>
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <span className="text-sm text-gray-600 hidden sm:block">{user.email || user.name}</span>
          )}
          <button onClick={logout} className="text-sm text-gray-700 hover:text-gray-900">Logout</button>
        </div>
      </div>
    </header>
  )
}
