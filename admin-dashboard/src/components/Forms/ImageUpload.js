import React, { useRef } from 'react'

export default function ImageUpload({ onSelect, imageUrl }) {
  const inputRef = useRef(null)

  function onFileChange(e) {
    const file = e.target.files?.[0]
    if (file) onSelect?.(file)
  }

  return (
    <div className="flex items-center gap-4">
      <div className="w-24 h-24 bg-gray-100 border rounded overflow-hidden flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt="preview" className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-400 text-xs">No image</span>
        )}
      </div>
      <div>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
        <button type="button" className="text-sm text-primary-700 hover:text-primary-900" onClick={() => inputRef.current?.click()}>
          Upload Image
        </button>
        <button type="button" className="ml-3 text-sm text-gray-700 hover:text-gray-900" onClick={() => onSelect?.('')}>
          Remove
        </button>
      </div>
    </div>
  )
}
