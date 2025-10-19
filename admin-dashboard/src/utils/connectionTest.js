export async function ping(url, timeoutMs = 5000) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, { method: 'GET', signal: controller.signal })
    clearTimeout(id)
    return res.ok
  } catch (e) {
    clearTimeout(id)
    return false
  }
}
