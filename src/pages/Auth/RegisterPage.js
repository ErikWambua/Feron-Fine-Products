import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useUI } from '../../context/UIContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const { addToast } = useUI();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await register({ name, email, password });
    if (res.success) {
      addToast('Account created', 'success');
      navigate('/');
    } else {
      addToast(res.error || 'Registration failed', 'error');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Create Account</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-700">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-700">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 w-full border border-gray-300 rounded px-3 py-2" />
        </div>
        <button type="submit" className="w-full bg-primary text-white rounded px-4 py-2">Sign Up</button>
      </form>
      <div className="mt-4 text-sm text-gray-700">Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link></div>
    </div>
  );
}
