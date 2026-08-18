import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'purple' | 'pink' | 'orange' | 'blue';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
  dot = false
}) => {
  const variantStyles = {
    primary: 'bg-blue-50 text-blue-700 border-blue-200/80 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/60',
    blue: 'bg-blue-100 text-blue-700 border-blue-200/80 dark:bg-blue-950/80 dark:text-blue-300 dark:border-blue-800/80',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200/80 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/60',
    warning: 'bg-amber-50 text-amber-800 border-amber-200/80 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/60',
    danger: 'bg-rose-50 text-rose-700 border-rose-200/80 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800/60',
    info: 'bg-sky-50 text-sky-700 border-sky-200/80 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800/60',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    purple: 'bg-purple-100 text-purple-700 border-purple-200/80 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/60',
    pink: 'bg-pink-100 text-pink-700 border-pink-200/80 dark:bg-pink-950/60 dark:text-pink-300 dark:border-pink-800/60',
    orange: 'bg-orange-100 text-orange-700 border-orange-200/80 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800/60'
  };

  const dotStyles = {
    primary: 'bg-blue-600',
    blue: 'bg-blue-600',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    info: 'bg-sky-500',
    neutral: 'bg-slate-400',
    purple: 'bg-purple-600',
    pink: 'bg-pink-500',
    orange: 'bg-orange-500'
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-bold gap-1',
    md: 'text-xs px-2.5 py-1 font-bold gap-1.5',
    lg: 'text-sm px-3 py-1.5 font-bold gap-2'
  };

  return (
    <span
      className={`inline-flex items-center rounded-xl border whitespace-nowrap tracking-tight transition-colors font-medium ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[variant]}`} />}
      {children}
    </span>
  );
};
