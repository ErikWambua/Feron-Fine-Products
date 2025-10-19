import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductForm from '../../components/Forms/ProductForm'
import api from '../../utils/api'

export default function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [product, setProduct] = useState(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const { data } = await api.get(`/products/${id}`)
        setProduct(data)
      } catch {
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  async function onSubmit(values) {
    setSubmitting(true)
    try {
      await api.put(`/products/${id}`, values)
      navigate('/products')
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert(e?.response?.data?.message || 'Failed to update product')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div>Loading...</div>
  if (!product) return <div>Product not found</div>

  return (
    <div>
      <h1 className="text-lg font-semibold mb-4">Edit Product</h1>
      <ProductForm initialValues={product} onSubmit={onSubmit} submitting={submitting} />
    </div>
  )
}
