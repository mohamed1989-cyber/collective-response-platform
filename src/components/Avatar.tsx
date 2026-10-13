import { Tone, toneGradient } from './tones';

interface AvatarProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  tone?: Tone;
  className?: string;
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2);
  return (parts[0][0] ?? '') + (parts[1][0] ?? '');
}

const sizes = {
  xs: 'h-7 w-7 text-[10px]',
  sm: 'h-9 w-9 text-xs',
  md: 'h-11 w-11 text-sm',
  lg: 'h-14 w-14 text-base',
};

export function Avatar({ name, size = 'sm', tone = 'navy', className = '' }: AvatarProps) {
  return (
    <span
      title={name}
      className={`inline-flex items-center justify-center rounded-full font-extrabold shrink-0 select-none ${sizes[size]} ${toneGradient[tone]} ${className}`}
    >
      {initials(name)}
    </span>
  );
}
