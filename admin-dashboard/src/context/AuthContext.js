import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getStoredToken, removeStoredToken, setStoredToken } from '../utils/helpers'
import api from '../utils/api'

export const AuthContext = createContext({
  isAuthenticated: false,
  token: null,
  user: null,
  login: async () => {},
  logout: () => {},
})

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [token, setToken] = useState(getStoredToken())
  const [user, setUser] = useState(null)

  const isAuthenticated = Boolean(token)

  const login = useCallback(async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    if (data?.token) {
      setStoredToken(data.token)
      setToken(data.token)
      setUser(data.user ?? null)
      navigate('/')
    }
    return data
  }, [navigate])

  const logout = useCallback(() => {
    removeStoredToken()
    setToken(null)
    setUser(null)
    navigate('/login')
  }, [navigate])

  useEffect(() => {
    if (!token) return
    // set header for future requests
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  }, [token])

  const value = useMemo(() => ({ isAuthenticated, token, user, login, logout }), [isAuthenticated, token, user, login, logout])

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export default AuthContext
