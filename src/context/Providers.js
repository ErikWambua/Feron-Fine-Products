import React from 'react';
import { UIProvider } from './UIContext';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';

export function Providers({ children }) {
  return (
    <UIProvider>
      <AuthProvider>
        <CartProvider>{children}</CartProvider>
      </AuthProvider>
    </UIProvider>
  );
}
