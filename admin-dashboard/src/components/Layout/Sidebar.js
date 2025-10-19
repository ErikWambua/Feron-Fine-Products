import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  HomeIcon,
  CubeIcon,
  ShoppingCartIcon,
  UsersIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: HomeIcon },
  { to: '/products', label: 'Products', icon: CubeIcon },
  { to: '/orders', label: 'Orders', icon: ShoppingCartIcon },
  { to: '/customers', label: 'Customers', icon: UsersIcon },
  { to: '/settings', label: 'Settings', icon: Cog6ToothIcon },
]

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-64 border-r bg-white">
      <div className="h-16 border-b flex items-center px-4 font-semibold">Feron</div>
      <nav className="p-3 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
