export type Tone = 'navy' | 'emerald' | 'amber' | 'red' | 'sky' | 'violet' | 'slate' | 'rose' | 'teal';

/** Soft tinted background + text color (full class strings for Tailwind JIT). */
export const toneClasses: Record<Tone, string> = {
  navy: 'bg-navy-100 text-navy-900 dark:bg-navy-800/50 dark:text-navy-200',
  emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  amber: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  red: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300',
  sky: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
  violet: 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300',
  slate: 'bg-slate-100 text-slate-600 dark:bg-slate-700/60 dark:text-slate-300',
  rose: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
  teal: 'bg-teal-100 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300',
};

/** Solid background with white text (full class strings for Tailwind JIT). */
export const toneSolid: Record<Tone, string> = {
  navy: 'bg-navy-950 text-white',
  emerald: 'bg-emerald-600 text-white',
  amber: 'bg-amber-500 text-white',
  red: 'bg-red-600 text-white',
  sky: 'bg-sky-500 text-white',
  violet: 'bg-violet-500 text-white',
  slate: 'bg-slate-500 text-white',
  rose: 'bg-rose-500 text-white',
  teal: 'bg-teal-600 text-white',
};

/** Gradient for icon boxes / avatars (full class strings for Tailwind JIT). */
export const toneGradient: Record<Tone, string> = {
  navy: 'bg-gradient-to-br from-navy-900 to-navy-700 text-white',
  emerald: 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white',
  amber: 'bg-gradient-to-br from-amber-400 to-orange-500 text-white',
  red: 'bg-gradient-to-br from-red-500 to-rose-600 text-white',
  sky: 'bg-gradient-to-br from-sky-400 to-blue-600 text-white',
  violet: 'bg-gradient-to-br from-violet-500 to-purple-700 text-white',
  slate: 'bg-gradient-to-br from-slate-400 to-slate-600 text-white',
  rose: 'bg-gradient-to-br from-rose-400 to-pink-600 text-white',
  teal: 'bg-gradient-to-br from-teal-400 to-emerald-600 text-white',
};
