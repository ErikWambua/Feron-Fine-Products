export function getStoredToken() {
  try {
    return localStorage.getItem('token')
  } catch {
    return null
  }
}

export function setStoredToken(token) {
  try {
    localStorage.setItem('token', token)
  } catch {
    // ignore
  }
}

export function removeStoredToken() {
  try {
    localStorage.removeItem('token')
  } catch {
    // ignore
  }
}

export function formatCurrency(amount, currency = 'USD') {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount || 0)
  } catch {
    return `$${Number(amount || 0).toFixed(2)}`
  }
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
