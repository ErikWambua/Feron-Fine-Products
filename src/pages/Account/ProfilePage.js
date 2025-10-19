import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useUI } from '../../context/UIContext';

export default function ProfilePage() {
  const { user, updateProfile, fetchProfile } = useAuth();
  const { addToast } = useUI();
  const [form, setForm] = useState({ name: '', email: '' });

  useEffect(() => {
    if (user) setForm({ name: user.name || '', email: user.email || '' });
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await updateProfile(form);
    if (res.success) {
      addToast('Profile updated', 'success');
      await fetchProfile();
    } else {
      addToast(res.error || 'Update failed', 'error');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Profile</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700">Name</label>
          <input className="mt-1 w-full border border-gray-300 rounded px-3 py-2" value={form.name} onChange={(e) => setForm(f => ({...f, name: e.target.value}))} />
        </div>
        <div>
          <label className="block text-sm text-gray-700">Email</label>
          <input type="email" className="mt-1 w-full border border-gray-300 rounded px-3 py-2" value={form.email} onChange={(e) => setForm(f => ({...f, email: e.target.value}))} />
        </div>
        <button type="submit" className="w-full bg-primary text-white rounded px-4 py-2">Save Changes</button>
      </form>
    </div>
  );
}
