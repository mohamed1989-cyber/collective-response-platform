import { ReactNode, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { useTheme } from '../theme/ThemeContext';
import { Card, CardHeader } from './Card';

Chart.register(...registerables);

export type ChartKind = 'line' | 'bar' | 'doughnut' | 'pie' | 'polarArea' | 'radar' | 'bubble' | 'scatter';

/** Ordered color palette for charts (full hex values). */
export const chartPalette = [
  '#0b2545',
  '#2c5fa2',
  '#3d79be',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#06b6d4',
  '#f43f5e',
  '#84cc16',
];

interface ChartCardProps {
  title?: string;
  subtitle?: string;
  type: ChartKind;
  /** Chart.js data object ({ labels, datasets }) */
  data: any;
  /** Chart.js options override (deep-merged over the RTL/dark defaults) */
  options?: any;
  height?: number;
  legend?: boolean;
  action?: ReactNode;
  className?: string;
}

function buildOptions(theme: string, type: ChartKind, legend: boolean | undefined, overrides: any) {
  const dark = theme === 'dark';
  const grid = dark ? 'rgba(148,163,184,0.10)' : 'rgba(100,116,139,0.12)';
  const text = dark ? '#94a3b8' : '#64748b';

  const base: any = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 750, easing: 'easeOutQuart' },
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        display: legend ?? false,
        position: 'bottom',
        rtl: true,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 8,
          padding: 16,
          color: text,
          font: { family: 'Cairo', size: 11, weight: 600 },
        },
      },
      tooltip: {
        rtl: true,
        textDirection: 'rtl',
        titleFont: { family: 'Cairo', size: 12, weight: 700 },
        bodyFont: { family: 'Cairo', size: 11 },
        backgroundColor: dark ? '#0f172a' : '#0b2545',
        padding: 10,
        cornerRadius: 10,
        displayColors: true,
        boxPadding: 4,
      },
    },
  };

  if (['line', 'bar', 'scatter', 'bubble'].includes(type)) {
    base.scales = {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: text, font: { family: 'Cairo', size: 10 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: grid },
        border: { display: false },
        ticks: { color: text, font: { family: 'Cairo', size: 10 } },
      },
    };
  }

  if (['doughnut', 'pie', 'polarArea'].includes(type)) {
    base.plugins.legend.display = legend ?? true;
    if (type === 'polarArea') {
      base.scales = { r: { grid: { color: grid }, ticks: { color: text, backdropColor: 'transparent' } } };
    }
  }

  const ov = overrides ?? {};
  return {
    ...base,
    ...ov,
    plugins: {
      ...base.plugins,
      ...(ov.plugins ?? {}),
      legend: { ...base.plugins.legend, ...(ov.plugins?.legend ?? {}) },
      tooltip: { ...base.plugins.tooltip, ...(ov.plugins?.tooltip ?? {}) },
    },
    ...(ov.scales ? { scales: ov.scales } : {}),
  };
}

export function ChartCard({ title, subtitle, type, data, options, height = 260, legend, action, className = '' }: ChartCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    chartRef.current?.destroy();
    chartRef.current = new Chart(ctx, {
      type: type as any,
      data,
      options: buildOptions(theme, type, legend, options),
    });
    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [type, data, options, theme, legend]);

  const content = (
    <div style={{ height }} className="relative w-full">
      <canvas ref={canvasRef} />
    </div>
  );

  if (!title) return <div className={className}>{content}</div>;

  return (
    <Card className={`flex flex-col ${className}`}>
      <CardHeader title={title} subtitle={subtitle} action={action} />
      <div className="px-4 pb-4 flex-1">{content}</div>
    </Card>
  );
}
