import { ReactNode } from 'react';

export type BadgeTone =
  | 'critical'
  | 'high'
  | 'medium'
  | 'low'
  | 'new'
  | 'progress'
  | 'closed'
  | 'pending'
  | 'active'
  | 'success'
  | 'info'
  | 'violet'
  | 'neutral';

const badgeTones: Record<BadgeTone, string> = {
  critical: 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-200 dark:bg-red-500/15 dark:text-red-300 dark:ring-red-500/30',
  high: 'bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-200 dark:bg-orange-500/15 dark:text-orange-300 dark:ring-orange-500/30',
  medium: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-500/30',
  low: 'bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200 dark:bg-sky-500/15 dark:text-sky-300 dark:ring-sky-500/30',
  new: 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200 dark:bg-blue-500/15 dark:text-blue-300 dark:ring-blue-500/30',
  progress: 'bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-200 dark:bg-indigo-500/15 dark:text-indigo-300 dark:ring-indigo-500/30',
  closed: 'bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200 dark:bg-slate-700/50 dark:text-slate-300 dark:ring-slate-600/50',
  pending: 'bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-200 dark:bg-yellow-500/15 dark:text-yellow-300 dark:ring-yellow-500/30',
  active: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/30',
  success: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/30',
  info: 'bg-cyan-50 text-cyan-700 ring-1 ring-inset ring-cyan-200 dark:bg-cyan-500/15 dark:text-cyan-300 dark:ring-cyan-500/30',
  violet: 'bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200 dark:bg-violet-500/15 dark:text-violet-300 dark:ring-violet-500/30',
  neutral: 'bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700',
};

const dotColors: Record<BadgeTone, string> = {
  critical: 'bg-red-500',
  high: 'bg-orange-500',
  medium: 'bg-amber-500',
  low: 'bg-sky-500',
  new: 'bg-blue-500',
  progress: 'bg-indigo-500',
  closed: 'bg-slate-400',
  pending: 'bg-yellow-500',
  active: 'bg-emerald-500',
  success: 'bg-emerald-500',
  info: 'bg-cyan-500',
  violet: 'bg-violet-500',
  neutral: 'bg-slate-400',
};

interface BadgeProps {
  tone?: BadgeTone;
  children: ReactNode;
  dot?: boolean;
  pulse?: boolean;
  className?: string;
}

export function Badge({ tone = 'neutral', children, dot = false, pulse = false, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold leading-none whitespace-nowrap ${badgeTones[tone]} ${className}`}>
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${dotColors[tone]} ${pulse ? 'animate-pulse-soft' : ''}`} />}
      {children}
    </span>
  );
}

/** Maps an Arabic report status string to a badge tone. */
export function reportStatusTone(status: string): BadgeTone {
  if (status.includes('جديد') || status.includes('مستقب')) return 'new';
  if (status.includes('قيد التنفيذ') || status.includes('جارية') || status.includes('منفّذ') || status.includes('تعاين')) return 'progress';
  if (status.includes('مغلق') || status.includes('مكتمل') || status.includes('منج') || status.includes('مُنجز')) return 'closed';
  if (status.includes('معلق') || status.includes('مسودة') || status.includes('انتظار')) return 'pending';
  if (status.includes('ناجز') || status.includes('تعذر')) return 'critical';
  return 'neutral';
}

/** Maps an Arabic severity string to a badge tone. */
export function severityTone(severity: string): BadgeTone {
  if (severity.includes('حرج') || severity.includes('كارث')) return 'critical';
  if (severity.includes('عالي') || severity.includes('مرتفع') || severity.includes('شديد')) return 'high';
  if (severity.includes('متوسط') || severity.includes('متوسطة')) return 'medium';
  if (severity.includes('منخفض') || severity.includes('بسيط') || severity.includes('عاد')) return 'low';
  return 'neutral';
}

/** Maps an Arabic priority string to a badge tone. */
export function priorityTone(priority: string): BadgeTone {
  if (priority.includes('فوري')) return 'critical';
  if (priority.includes('عال')) return 'high';
  if (priority.includes('متوسط') || priority.includes('عادية')) return 'medium';
  if (priority.includes('منخفض')) return 'low';
  return 'neutral';
}
