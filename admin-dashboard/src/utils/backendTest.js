import api from './api'

export async function testBackendHealth() {
  try {
    const { status } = await api.get('/')
    return status >= 200 && status < 300
  } catch (e) {
    return false
  }
}
