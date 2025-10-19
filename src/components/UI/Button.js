import React from 'react';
import clsx from 'clsx';

export default function Button({ as: Comp = 'button', className, variant = 'primary', size = 'md', ...props }) {
  const base = 'inline-flex items-center justify-center font-medium rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };
  const variants = {
    primary: 'bg-primary text-white hover:opacity-90 focus-visible:ring-primary',
    secondary: 'bg-gray-900 text-white hover:opacity-90 focus-visible:ring-gray-900',
    outline: 'border border-gray-300 text-gray-900 hover:border-primary focus-visible:ring-primary',
    ghost: 'text-gray-900 hover:bg-gray-100 focus-visible:ring-primary',
  };
  return (
    <Comp className={clsx(base, sizes[size], variants[variant], className)} {...props} />
  );
}
