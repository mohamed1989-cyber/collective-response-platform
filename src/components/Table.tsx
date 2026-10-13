import { ReactNode } from 'react';

export function Table({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="gov-table">{children}</table>
    </div>
  );
}

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon = 'fa-solid fa-inbox', title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4 animate-fade-in">
      <span className="icon-box h-16 w-16 text-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 mb-4">
        <i className={icon} />
      </span>
      <h3 className="text-sm font-extrabold text-slate-600 dark:text-slate-300">{title}</h3>
      {description && <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5 max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  total?: number;
}

export function Pagination({ page, totalPages, onChange, total }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visible = pages.filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1);
  return (
    <div className="flex items-center justify-between gap-3 flex-wrap px-5 py-4 border-t border-slate-200 dark:border-slate-800">
      {total !== undefined && (
        <span className="text-xs text-slate-400 dark:text-slate-500 font-bold">إجمالي السجلات: {total}</span>
      )}
      <div className="flex items-center gap-1 ms-auto">
        <button
          onClick={() => onChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="h-8 w-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors"
        >
          <i className="fa-solid fa-chevron-right text-[10px]" />
        </button>
        {visible.map((p, i) => (
          <span key={p} className="flex items-center gap-1">
            {i > 0 && visible[i - 1] !== p - 1 && <span className="text-slate-400 text-xs px-0.5">…</span>}
            <button
              onClick={() => onChange(p)}
              className={`h-8 min-w-8 px-2 rounded-lg text-xs font-bold transition-colors ${
                p === page
                  ? 'bg-navy-950 text-white'
                  : 'border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {p}
            </button>
          </span>
        ))}
        <button
          onClick={() => onChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="h-8 w-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors"
        >
          <i className="fa-solid fa-chevron-left text-[10px]" />
        </button>
      </div>
    </div>
  );
}
