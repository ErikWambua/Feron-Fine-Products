import React, { useState } from 'react'
import Button from '../../components/UI/Button'

export default function Settings() {
  const [storeName, setStoreName] = useState('Feron Fine Products')
  const [currency, setCurrency] = useState('USD')

  function save(e) {
    e.preventDefault()
    // eslint-disable-next-line no-alert
    alert('Settings saved (demo)')
  }

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Settings</h1>
      <form onSubmit={save} className="space-y-4 bg-white p-4 border rounded">
        <div>
          <label className="block text-sm font-medium text-gray-700">Store name</label>
          <input className="mt-1 w-full border rounded px-3 py-2" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Default currency</label>
          <select className="mt-1 w-full border rounded px-3 py-2" value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
        <Button type="submit">Save</Button>
      </form>
    </div>
  )
}
