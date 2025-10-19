import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, ArcElement, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { CurrencyDollarIcon, ShoppingCartIcon, UsersIcon } from '@heroicons/react/24/outline'
import StatCard from '../../components/UI/StatCard'
import api from '../../utils/api'

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, ArcElement, Tooltip, Legend)

export default function Dashboard() {
  const [metrics, setMetrics] = useState({ revenue: 0, orders: 0, customers: 0 })
  const [series, setSeries] = useState({ labels: [], data: [] })

  useEffect(() => {
    async function fetchMetrics() {
      try {
        // If backend lacks metrics endpoint, these will remain 0s and empty chart
        const { data } = await api.get('/admin/metrics')
        setMetrics({
          revenue: data?.revenue || 0,
          orders: data?.orders || 0,
          customers: data?.customers || 0,
        })
        setSeries({ labels: data?.sales?.labels || [], data: data?.sales?.values || [] })
      } catch {
        // ignore gracefully
      }
    }
    fetchMetrics()
  }, [])

  const chartData = {
    labels: series.labels,
    datasets: [
      {
        label: 'Sales',
        data: series.data,
        borderColor: '#6366F1',
        backgroundColor: 'rgba(99, 102, 241, 0.15)'
      },
    ]
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Revenue" value={`$${metrics.revenue}`} icon={CurrencyDollarIcon} delta={'+5%'} deltaType="up" />
        <StatCard title="Orders" value={metrics.orders} icon={ShoppingCartIcon} delta={'-2%'} deltaType="down" />
        <StatCard title="Customers" value={metrics.customers} icon={UsersIcon} delta={'+1%'} deltaType="up" />
      </div>
      <div className="bg-white border rounded-lg p-4">
        <div className="text-sm font-medium mb-3">Sales Over Time</div>
        <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} height={280} />
      </div>
    </div>
  )
}
