# Production Checklist

- Security
  - HTTPS enforced at CDN/host
  - JWT stored in `localStorage` (consider HttpOnly cookies for higher security)
  - CORS configured on backend
- Performance
  - Build with minification and code splitting (Vite default)
  - Use caching headers on CDN
- Monitoring
  - Set up error logging (Sentry/LogRocket)
  - Uptime monitoring for backend API
- Environment
  - Verify `VITE_API_BASE_URL`
  - Disable `VITE_SHOW_EMERGENCY_LOGIN` in production
- QA
  - Verify auth, product CRUD, orders list, users list
  - Responsive layout
