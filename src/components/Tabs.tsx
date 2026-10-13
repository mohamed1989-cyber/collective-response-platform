export interface TabItem {
  id: string;
  label: string;
  icon?: string;
  count?: number;
}

interface TabsProps {
  tabs: TabItem[];
  active: string;
  onChange: (id: string) => void;
  variant?: 'pill' | 'underline';
  className?: string;
}

export function Tabs({ tabs, active, onChange, variant = 'pill', className = '' }: TabsProps) {
  if (variant === 'underline') {
    return (
      <div className={`flex items-center gap-1 border-b border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none ${className}`}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`relative px-4 py-3 text-sm font-bold whitespace-nowrap transition-colors ${
              active === t.id
                ? 'text-navy-900 dark:text-white'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <span className="inline-flex items-center gap-2">
              {t.icon && <i className={t.icon} />}
              {t.label}
              {t.count !== undefined && (
                <span className="text-[10px] rounded-full bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-slate-500 dark:text-slate-400">
                  {t.count}
                </span>
              )}
            </span>
            {active === t.id && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-navy-800 dark:bg-emerald-400" />}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1 rounded-xl bg-slate-100 dark:bg-slate-800/70 p-1 ${className}`}>
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            active === t.id
              ? 'bg-white dark:bg-slate-900 text-navy-900 dark:text-white shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          }`}
        >
          {t.icon && <i className={t.icon} />}
          {t.label}
          {t.count !== undefined && (
            <span
              className={`text-[10px] rounded-full px-1.5 py-0.5 ${
                active === t.id ? 'bg-navy-100 text-navy-800 dark:bg-navy-800/60 dark:text-navy-200' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
              }`}
            >
              {t.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
