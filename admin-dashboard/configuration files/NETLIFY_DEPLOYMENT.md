# Netlify Deployment

1. Install dependencies
```bash
npm ci
```

2. Build
```bash
npm run build
```

3. Deploy
- Connect the repo to Netlify
- Build command: `npm run build`
- Publish directory: `dist`

4. Environment
- Set `VITE_API_BASE_URL` to the backend API base URL
- Optionally set `VITE_SHOW_EMERGENCY_LOGIN=true` for debug only
