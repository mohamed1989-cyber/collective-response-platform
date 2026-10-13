import { Tone } from './tones';

const barTones: Record<Tone, string> = {
  navy: 'bg-navy-800 dark:bg-navy-500',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500',
  red: 'bg-red-500',
  sky: 'bg-sky-500',
  violet: 'bg-violet-500',
  slate: 'bg-slate-500',
  rose: 'bg-rose-500',
  teal: 'bg-teal-500',
};

interface ProgressProps {
  value: number;
  tone?: Tone;
  size?: 'xs' | 'sm' | 'md';
  label?: string;
  showValue?: boolean;
  className?: string;
}

export function Progress({ value, tone = 'emerald', size = 'sm', label, showValue = false, className = '' }: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const heights = { xs: 'h-1', sm: 'h-2', md: 'h-3' };
  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{label}</span>}
          {showValue && <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200">{clamped}%</span>}
        </div>
      )}
      <div className={`w-full rounded-full bg-slate-200 dark:bg-slate-700/70 overflow-hidden ${heights[size]}`}>
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${barTones[tone]}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
