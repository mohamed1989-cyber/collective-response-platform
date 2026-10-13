import { Tone, toneClasses } from './tones';

export interface TimelineItem {
  id: string;
  time: string;
  title: string;
  description?: string;
  /** Font Awesome class */
  icon?: string;
  tone?: Tone;
  actor?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
  compact?: boolean;
}

export function Timeline({ items, className = '', compact = false }: TimelineProps) {
  return (
    <ol className={`relative ${className}`}>
      {items.map((item, idx) => (
        <li key={item.id} className={`relative flex gap-4 ${compact ? 'pb-4' : 'pb-6'} last:pb-0`}>
          {idx < items.length - 1 && (
            <span className="absolute top-10 bottom-0 start-[19px] w-px bg-slate-200 dark:bg-slate-700/70" aria-hidden />
          )}
          <span
            className={`icon-box h-10 w-10 text-sm shrink-0 z-10 ring-4 ring-white dark:ring-slate-900 ${toneClasses[item.tone ?? 'navy']}`}
          >
            <i className={item.icon ?? 'fa-solid fa-circle'} />
          </span>
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <p className="text-sm font-extrabold text-slate-700 dark:text-slate-200">{item.title}</p>
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 whitespace-nowrap">{item.time}</span>
            </div>
            {item.description && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{item.description}</p>}
            {item.actor && (
              <p className="text-[11px] text-navy-700 dark:text-navy-300 mt-1.5 font-bold">
                <i className="fa-solid fa-user-shield ms-1" /> {item.actor}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
