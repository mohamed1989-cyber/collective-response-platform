import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react';

interface FieldProps {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function Field({ label, required, hint, error, children, className = '' }: FieldProps) {
  return (
    <label className={`block ${className}`}>
      <span className="field-label">
        {label}
        {required && <span className="text-red-500 ms-1">*</span>}
      </span>
      {children}
      {error ? (
        <span className="block text-[11px] text-red-500 mt-1 font-bold">
          <i className="fa-solid fa-circle-exclamation ms-1" />
          {error}
        </span>
      ) : hint ? (
        <span className="block text-[11px] text-slate-400 dark:text-slate-500 mt-1">{hint}</span>
      ) : null}
    </label>
  );
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Font Awesome class shown at the start of the field */
  icon?: string;
}

export function Input({ icon, className = '', ...rest }: InputProps) {
  if (icon) {
    return (
      <span className="relative block">
        <i className={`fa-solid ${icon} absolute start-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none`} />
        <input className={`input ps-10 ${className}`} {...rest} />
      </span>
    );
  }
  return <input className={`input ${className}`} {...rest} />;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options?: readonly (string | { value: string; label: string })[];
}

export function Select({ options, children, className = '', ...rest }: SelectProps) {
  return (
    <span className="relative block">
      <select className={`input pe-9 appearance-none cursor-pointer ${className}`} {...rest}>
        {options?.map((o) => {
          const value = typeof o === 'string' ? o : o.value;
          const label = typeof o === 'string' ? o : o.label;
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
        {children}
      </select>
      <i className="fa-solid fa-chevron-down absolute end-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none" />
    </span>
  );
}

export function Textarea({ className = '', ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`textarea ${className}`} {...rest} />;
}

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}

export function Toggle({ checked, onChange, label, description, disabled }: ToggleProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      {(label || description) && (
        <div className="min-w-0">
          {label && <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{label}</p>}
          {description && <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{description}</p>}
        </div>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:opacity-40 ${
          checked ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? '-translate-x-5' : '-translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}
