import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} Feron Fine Products</div>
        <div className="flex items-center gap-4">
          <a href="/about" className="hover:text-primary">About</a>
          <a href="/contact" className="hover:text-primary">Contact</a>
          <a href="/" className="hover:text-primary">Home</a>
        </div>
      </div>
    </footer>
  );
}
