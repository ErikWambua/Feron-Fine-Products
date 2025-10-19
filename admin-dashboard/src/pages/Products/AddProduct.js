import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductForm from '../../components/Forms/ProductForm'
import api from '../../utils/api'

export default function AddProduct() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(values) {
    setSubmitting(true)
    try {
      await api.post('/products', values)
      navigate('/products')
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert(e?.response?.data?.message || 'Failed to create product')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className="text-lg font-semibold mb-4">Add Product</h1>
      <ProductForm onSubmit={onSubmit} submitting={submitting} />
    </div>
  )
}
