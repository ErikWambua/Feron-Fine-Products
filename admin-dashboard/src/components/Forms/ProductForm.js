import React, { useEffect, useState } from 'react'
import Button from '../UI/Button'
import ImageUpload from './ImageUpload'

const defaultValues = {
  name: '',
  description: '',
  price: '',
  stock: '',
  category: '',
  imageUrl: '',
}

export default function ProductForm({ initialValues = {}, onSubmit, submitting }) {
  const [values, setValues] = useState({ ...defaultValues, ...initialValues })

  useEffect(() => {
    setValues({ ...defaultValues, ...initialValues })
  }, [initialValues])

  function handleChange(e) {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  async function handleImage(fileOrUrl) {
    if (typeof fileOrUrl === 'string') {
      setValues((prev) => ({ ...prev, imageUrl: fileOrUrl }))
      return
    }
    // Stub: In production, upload to storage and get URL
    const fakeUrl = URL.createObjectURL(fileOrUrl)
    setValues((prev) => ({ ...prev, imageUrl: fakeUrl }))
  }

  function submit(e) {
    e.preventDefault()
    const payload = {
      ...values,
      price: Number(values.price),
      stock: Number(values.stock),
    }
    onSubmit?.(payload)
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input name="name" value={values.name} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input name="category" value={values.category} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input name="price" type="number" step="0.01" value={values.price} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Stock</label>
          <input name="stock" type="number" value={values.stock} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" required />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" value={values.description} onChange={handleChange} rows={4} className="mt-1 w-full border rounded px-3 py-2" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <ImageUpload onSelect={handleImage} imageUrl={values.imageUrl} />
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save Product'}
        </Button>
      </div>
    </form>
  )
}
