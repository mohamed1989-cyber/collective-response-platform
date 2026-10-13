import { ReactNode } from 'react';
import { Tone, toneClasses, toneGradient } from './tones';

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  /** Font Awesome class, e.g. "fa-solid fa-inbox" */
  icon: string;
  tone?: Tone;
  delta?: { value: string; positive?: boolean };
  className?: string;
  onClick?: () => void;
}

export function StatCard({ label, value, sub, icon, tone = 'navy', delta, className = '', onClick }: StatCardProps) {
  const Wrapper = onClick ? 'button' : 'div';
  return (
    <Wrapper
      onClick={onClick}
      className={`card card-hover w-full text-right p-4 sm:p-5 flex items-center gap-4 animate-slide-up ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <span className={`icon-box h-12 w-12 text-lg shrink-0 ${toneGradient[tone]}`}>
        <i className={icon} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] sm:text-xs font-bold text-slate-400 dark:text-slate-500 truncate">{label}</p>
        <div className="flex items-baseline gap-2 flex-wrap">
          <p className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-slate-100 font-display leading-tight">{value}</p>
          {delta && (
            <span
              className={`text-[10px] font-bold inline-flex items-center gap-1 ${
                delta.positive === false ? 'text-red-500' : 'text-emerald-600 dark:text-emerald-400'
              }`}
            >
              <i className={`fa-solid ${delta.positive === false ? 'fa-arrow-down' : 'fa-arrow-up'}`} />
              {delta.value}
            </span>
          )}
        </div>
        {sub && <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 truncate">{sub}</p>}
      </div>
    </Wrapper>
  );
}
