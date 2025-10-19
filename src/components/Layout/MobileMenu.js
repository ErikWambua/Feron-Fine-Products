import React from 'react';
import { Link } from 'react-router-dom';
import { useUI } from '../../context/UIContext';

export default function MobileMenu() {
  const { isMobileMenuOpen, closeMobileMenu } = useUI();
  return (
    <div
      className={`fixed inset-0 z-50 md:hidden ${isMobileMenuOpen ? '' : 'pointer-events-none'}`}
      aria-hidden={!isMobileMenuOpen}
    >
      <div className={`absolute inset-0 bg-black/30 transition-opacity ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={closeMobileMenu} />
      <aside className={`absolute left-0 top-0 h-full w-72 bg-white border-r border-gray-200 shadow-lg p-4 transition-transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="font-semibold">Menu</div>
          <button onClick={closeMobileMenu} aria-label="Close menu" className="p-2">✕</button>
        </div>
        <nav className="flex flex-col gap-2" onClick={closeMobileMenu}>
          <Link to="/" className="px-3 py-2 rounded hover:bg-gray-100">Home</Link>
          <Link to="/products" className="px-3 py-2 rounded hover:bg-gray-100">Products</Link>
          <Link to="/about" className="px-3 py-2 rounded hover:bg-gray-100">About</Link>
          <Link to="/contact" className="px-3 py-2 rounded hover:bg-gray-100">Contact</Link>
        </nav>
      </aside>
    </div>
  );
}
