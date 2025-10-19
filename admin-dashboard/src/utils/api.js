import axios from 'axios'
import { BACKEND_API_BASE_URL } from '../config/backend'
import { getStoredToken, removeStoredToken } from './helpers'

const api = axios.create({
  baseURL: BACKEND_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
})

api.interceptors.request.use((config) => {
  const token = getStoredToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      removeStoredToken()
      // allow app to redirect by itself on protected routes
    }
    return Promise.reject(error)
  }
)

export default api
