import React, { useState } from 'react'
import { SHOW_EMERGENCY_LOGIN } from '../../utils/constants'

export default function EmergencyLoginDebug({ onSubmit }) {
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('password')

  if (!SHOW_EMERGENCY_LOGIN) return null

  return (
    <div className="mt-8 border rounded p-4 bg-yellow-50">
      <div className="font-semibold mb-2">Emergency Login (debug)</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input className="border rounded px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
        <input className="border rounded px-3 py-2" value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
      </div>
      <button className="mt-3 text-sm text-primary-700 hover:text-primary-900" onClick={() => onSubmit?.(email, password)}>
        Submit
      </button>
    </div>
  )
}
