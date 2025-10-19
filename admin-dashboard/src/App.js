import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout/Layout'
import PrivateRoute from './components/Layout/PrivateRoute'

import Login from './pages/Auth/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Products from './pages/Products/Products'
import AddProduct from './pages/Products/AddProduct'
import EditProduct from './pages/Products/EditProduct'
import Orders from './pages/Orders/Orders'
import Users from './pages/Customers/Users'
import Settings from './pages/Settings/Settings'

import ErrorBoundary from './components/UI/ErrorBoundary'

function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />

            <Route path="products" element={<Products />} />
            <Route path="products/new" element={<AddProduct />} />
            <Route path="products/:id" element={<EditProduct />} />

            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Users />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ErrorBoundary>
    </AuthProvider>
  )
}

export default App
