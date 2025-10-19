import React from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileMenu from './MobileMenu';
import CartSidebar from '../Cart/CartSidebar';
import Toast from '../UI/Toast';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <MobileMenu />
      <CartSidebar />
      <Toast />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
