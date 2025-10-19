import React from 'react'

export default function StatCard({ title, value, icon: Icon, delta, deltaType }) {
  const deltaColor = deltaType === 'up' ? 'text-green-600' : deltaType === 'down' ? 'text-red-600' : 'text-gray-600'
  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-600">{title}</div>
          <div className="text-2xl font-semibold">{value}</div>
          {delta !== undefined && (
            <div className={`text-xs ${deltaColor}`}>{deltaType === 'up' ? '▲' : deltaType === 'down' ? '▼' : '•'} {delta}</div>
          )}
        </div>
        {Icon && <Icon className="w-10 h-10 text-primary-500" />}
      </div>
    </div>
  )
}
