import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Providers } from './context/Providers';
import Layout from './components/Layout/Layout';
import { HomePage } from './pages/Home';
import { ProductListPage, ProductDetailPage } from './pages/Products';
import { CartPage } from './pages/Cart';
import { CheckoutPage } from './pages/Checkout';
import { LoginPage, RegisterPage } from './pages/Auth';
import { AboutPage, ContactPage } from './pages/Static';
import { DashboardPage, ProfilePage, OrdersPage, AddressesPage, WishlistPage } from './pages/Account';

export default function App() {
  return (
    <Providers>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Products */}
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          {/* Cart & Checkout */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          {/* Account */}
          <Route path="/account" element={<DashboardPage />} />
          <Route path="/account/profile" element={<ProfilePage />} />
          <Route path="/account/orders" element={<OrdersPage />} />
          <Route path="/account/addresses" element={<AddressesPage />} />
          <Route path="/account/wishlist" element={<WishlistPage />} />
          {/* Static */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Providers>
  );
}
