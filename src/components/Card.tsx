import { ReactNode } from 'react';
import { Tone, toneClasses } from './tones';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return <div className={`card ${hover ? 'card-hover' : ''} ${className}`}>{children}</div>;
}

interface CardHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  icon?: string;
  tone?: Tone;
  action?: ReactNode;
  className?: string;
}

export function CardHeader({ title, subtitle, icon, tone = 'navy', action, className = '' }: CardHeaderProps) {
  return (
    <div className={`flex items-start justify-between gap-3 px-5 pt-5 pb-3 ${className}`}>
      <div className="flex items-center gap-3 min-w-0">
        {icon && (
          <span className={`icon-box h-10 w-10 text-sm ${toneClasses[tone]}`}>
            <i className={icon} />
          </span>
        )}
        <div className="min-w-0">
          <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100 truncate">{title}</h3>
          {subtitle && <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 truncate">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="shrink-0 flex items-center gap-2">{action}</div>}
    </div>
  );
}

export function CardBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`px-5 pb-5 ${className}`}>{children}</div>;
}
