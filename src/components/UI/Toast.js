import React from 'react';
import { useUI } from '../../context/UIContext';

export default function Toast() {
  const { toasts, removeToast } = useUI();
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map(t => (
        <div key={t.id} className={`rounded shadow-lg px-4 py-3 text-white ${
          t.type === 'error' ? 'bg-red-600' : t.type === 'success' ? 'bg-emerald-600' : 'bg-gray-900'
        }`} role="status">
          <div className="flex items-start gap-3">
            <div>{t.message}</div>
            <button className="ml-4 text-white/80 hover:text-white" onClick={() => removeToast(t.id)} aria-label="Dismiss">
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
