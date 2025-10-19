import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const { toggleMobileMenu, openCart } = useUI();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <button aria-label="Open menu" className="md:hidden p-2" onClick={toggleMobileMenu}>
              <span className="i-ph-list text-2xl">≡</span>
            </button>
            <Link to="/" className="text-xl font-semibold text-primary">Feron Fine Products</Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/products" className={({isActive}) => isActive ? 'text-primary font-medium' : 'text-gray-700 hover:text-primary'}>Products</NavLink>
            <NavLink to="/about" className={({isActive}) => isActive ? 'text-primary font-medium' : 'text-gray-700 hover:text-primary'}>About</NavLink>
            <NavLink to="/contact" className={({isActive}) => isActive ? 'text-primary font-medium' : 'text-gray-700 hover:text-primary'}>Contact</NavLink>
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={openCart} className="relative px-3 py-2 rounded hover:bg-gray-100" aria-label="Open cart">
              <span>🛒</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full px-1.5 py-0.5">{totalItems}</span>
              )}
            </button>

            {!isAuthenticated ? (
              <div className="flex items-center gap-2">
                <button onClick={() => navigate('/login')} className="px-3 py-2 rounded border border-gray-300 hover:border-primary">Login</button>
                <button onClick={() => navigate('/register')} className="px-3 py-2 rounded bg-primary text-white hover:opacity-90">Sign Up</button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="hidden sm:block text-sm text-gray-700">Hi, {user?.name || user?.email}</div>
                <Link to="/account" className="px-3 py-2 rounded border border-gray-300 hover:border-primary">Account</Link>
                <button onClick={() => { logout(); navigate('/'); }} className="px-3 py-2 rounded bg-gray-900 text-white hover:opacity-90">Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
