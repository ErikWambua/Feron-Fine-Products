# Troubleshooting

## Build fails: Cannot find module 'tailwindcss'
Run `npm ci` to install dependencies.

## API requests return 404/500
- Confirm `VITE_API_BASE_URL` is correct
- Check network tab for full error

## Login redirects back to /login
- Your token may be invalid or missing; verify credentials
- Check backend `/auth/login` response includes `token`

## Styles not applied
- Ensure `index.css` is imported in `src/index.js`
- Confirm `tailwind.config.js` `content` paths include `src/**/*.{js,jsx}`
