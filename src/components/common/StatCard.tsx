import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  variant?: 'default' | 'indigo' | 'emerald' | 'amber' | 'purple';
  onClick?: () => void;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  subtitle,
  trend,
  variant = 'default',
  onClick,
  className = ''
}) => {
  const iconBackgrounds = {
    default: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    indigo: 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400',
    emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400',
    amber: 'bg-orange-50 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400'
  };

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {label}
        </span>
        <div className={`p-2.5 rounded-xl ${iconBackgrounds[variant]}`}>
          {icon}
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-2">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-heading tracking-tight">
          {value}
        </h3>

        {trend && (
          <div
            className={`inline-flex items-center text-xs font-bold px-2 py-0.5 rounded-full ${
              trend.isPositive
                ? 'text-emerald-700 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-950/60'
                : 'text-rose-700 bg-rose-50 dark:text-rose-300 dark:bg-rose-950/60'
            }`}
          >
            {trend.isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
            )}
            {trend.value}
          </div>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-xs font-medium text-slate-400 dark:text-slate-500">
          {subtitle}
        </p>
      )}
    </div>
  );
};
