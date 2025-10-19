import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../utils/api';

const TOKEN_KEY = 'ffp_token';
const USER_KEY = 'ffp_user';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || null);
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token && !user) {
      // attempt to fetch profile lazily
      fetchProfile().catch(() => {});
    }
  }, [token]);

  const saveSession = useCallback((nextToken, nextUser) => {
    setToken(nextToken);
    localStorage.setItem(TOKEN_KEY, nextToken || '');
    if (!nextToken) localStorage.removeItem(TOKEN_KEY);

    if (nextUser) {
      setUser(nextUser);
      localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    }
  }, []);

  const clearSession = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      const receivedToken = data?.token || data?.accessToken || data?.jwt || null;
      const receivedUser = data?.user || null;
      if (receivedToken) {
        saveSession(receivedToken, receivedUser);
      }
      if (!receivedUser) {
        // try fetch profile if token exists
        if (receivedToken) await fetchProfile();
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: error?.response?.data?.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  }, [saveSession]);

  const register = useCallback(async (payload) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', payload);
      const receivedToken = data?.token || data?.accessToken || data?.jwt || null;
      const receivedUser = data?.user || null;
      if (receivedToken) {
        saveSession(receivedToken, receivedUser);
      }
      if (!receivedUser) {
        if (receivedToken) await fetchProfile();
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: error?.response?.data?.message || 'Registration failed' };
    } finally {
      setLoading(false);
    }
  }, [saveSession]);

  const fetchProfile = useCallback(async () => {
    try {
      const { data } = await api.get('/auth/me');
      if (data) {
        setUser(data);
        localStorage.setItem(USER_KEY, JSON.stringify(data));
      }
      return data;
    } catch (error) {
      // fallback alternate endpoint
      try {
        const { data } = await api.get('/users/me');
        if (data) {
          setUser(data);
          localStorage.setItem(USER_KEY, JSON.stringify(data));
          return data;
        }
      } catch (_) {}
      return null;
    }
  }, []);

  const updateProfile = useCallback(async (updates) => {
    try {
      const { data } = await api.put('/users/me', updates);
      if (data) {
        setUser(data);
        localStorage.setItem(USER_KEY, JSON.stringify(data));
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: error?.response?.data?.message || 'Update failed' };
    }
  }, []);

  const logout = useCallback(() => {
    clearSession();
  }, [clearSession]);

  const value = useMemo(() => ({
    user,
    token,
    loading,
    login,
    register,
    logout,
    fetchProfile,
    updateProfile,
    isAuthenticated: Boolean(token && user),
  }), [user, token, loading, login, register, logout, fetchProfile, updateProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
