import { ReactNode } from 'react';
import { Tone, toneGradient } from './tones';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
  tone?: Tone;
  badge?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({ title, subtitle, icon = 'fa-solid fa-gauge', tone = 'navy', badge, actions, className = '' }: PageHeaderProps) {
  return (
    <div className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-slide-up ${className}`}>
      <div className="flex items-center gap-4 min-w-0">
        <span className={`icon-box h-12 w-12 text-lg shrink-0 ${toneGradient[tone]}`}>
          <i className={icon} />
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-slate-100 truncate">{title}</h1>
            {badge}
          </div>
          {subtitle && <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500 mt-1">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2 flex-wrap shrink-0">{actions}</div>}
    </div>
  );
}
