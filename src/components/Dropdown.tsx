import { ReactNode, useEffect, useRef, useState } from 'react';

interface DropdownProps {
  /** Element that toggles the dropdown (click anywhere on it opens the menu). */
  trigger: ReactNode;
  children: ReactNode;
  align?: 'start' | 'end';
  width?: string;
  panelClassName?: string;
  className?: string;
}

export function Dropdown({ trigger, children, align = 'end', width = 'w-72', panelClassName = '', className = '' }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div onClick={() => setOpen((o) => !o)} className="cursor-pointer">
        {trigger}
      </div>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className={`absolute z-50 mt-2 ${width} ${align === 'end' ? 'end-0' : 'start-0'} rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-card-hover overflow-hidden animate-scale-in ${panelClassName}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
