import { useState } from 'react';
import { Badge, Button, Card, CardHeader, ChartCard, PageHeader, Progress, StatCard, Table, Tabs, chartPalette } from '../components';
import { CHANNELS, CHARTS, KPIS, REPORT_TYPES, ZONE_STATS } from '../data';

export default function Analytics() {
  const [period, setPeriod] = useState('week');

  const byZoneChart = {
    labels: CHARTS.byZone.labels,
    datasets: [
      {
        label: 'عدد البلاغات',
        data: CHARTS.byZone.data,
        backgroundColor: CHARTS.byZone.data.map((_, i) => (i < 3 ? 'rgba(44,95,162,0.9)' : 'rgba(61,121,190,0.65)')),
        borderRadius: 8,
        maxBarThickness: 30,
      },
    ],
  };

  const byTypeChart = {
    labels: CHARTS.byType.labels,
    datasets: [{ data: CHARTS.byType.data, backgroundColor: chartPalette, borderWidth: 0, cutout: '60%' }],
  };

  const hourlyChart = {
    labels: CHARTS.hourly.labels,
    datasets: [
      {
        label: 'بلاغات مسجلة',
        data: CHARTS.hourly.data,
        backgroundColor: 'rgba(245,158,11,0.8)',
        borderRadius: 6,
        maxBarThickness: 26,
      },
    ],
  };

  const monthlyChart = {
    labels: CHARTS.monthly.labels,
    datasets: [
      {
        label: 'إجمالي البلاغات',
        data: CHARTS.monthly.reports,
        borderColor: chartPalette[1],
        backgroundColor: 'rgba(44,95,162,0.12)',
        fill: true,
        tension: 0.4,
        borderWidth: 2.5,
        pointRadius: 3,
      },
      {
        label: 'معدل الإغلاق %',
        data: CHARTS.monthly.closure,
        borderColor: chartPalette[3],
        tension: 0.4,
        borderWidth: 2.5,
        borderDash: [6, 4],
        pointRadius: 3,
        fill: false,
      },
    ],
  };

  const responseChart = {
    labels: CHARTS.responseTime.labels,
    datasets: [
      {
        label: 'متوسط زمن الاستجابة (دقيقة)',
        data: CHARTS.responseTime.data,
        borderColor: chartPalette[5],
        backgroundColor: 'rgba(239,68,68,0.10)',
        fill: true,
        tension: 0.4,
        borderWidth: 2.5,
        pointRadius: 4,
        pointBackgroundColor: chartPalette[5],
      },
    ],
  };

  const teamChart = {
    labels: CHARTS.teamPerformance.labels,
    datasets: [
      {
        label: 'نسبة الإنجاز %',
        data: CHARTS.teamPerformance.completion,
        backgroundColor: 'rgba(16,185,129,0.85)',
        borderRadius: 8,
        maxBarThickness: 30,
      },
      {
        label: 'زمن الاستجابة (دقيقة)',
        data: CHARTS.teamPerformance.response,
        backgroundColor: 'rgba(139,92,246,0.85)',
        borderRadius: 8,
        maxBarThickness: 30,
      },
    ],
  };

  const channelChart = {
    labels: CHANNELS.map((c) => c.name),
    datasets: [{ data: CHANNELS.map((c) => c.count), backgroundColor: chartPalette, borderWidth: 0, cutout: '58%' }],
  };

  const severityChart = {
    labels: CHARTS.severityShare.labels,
    datasets: [
      {
        data: CHARTS.severityShare.data,
        backgroundColor: ['#ef4444', '#f97316', '#f59e0b', '#38bdf8'],
        borderWidth: 0,
        cutout: '62%',
      },
    ],
  };

  const radarChart = {
    labels: CHARTS.kpiRadar.labels,
    datasets: [
      {
        label: 'القيمة الحالية',
        data: CHARTS.kpiRadar.data,
        backgroundColor: 'rgba(44,95,162,0.20)',
        borderColor: chartPalette[1],
        borderWidth: 2,
        pointBackgroundColor: chartPalette[1],
      },
      {
        label: 'المستهدف',
        data: CHARTS.kpiRadar.data.map(() => 95),
        backgroundColor: 'rgba(16,185,129,0.12)',
        borderColor: chartPalette[3],
        borderWidth: 2,
        borderDash: [6, 4],
        pointBackgroundColor: chartPalette[3],
      },
    ],
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="التحليلات والمؤشرات"
        subtitle="مؤشرات الأداء KPI وتحليل البلاغات والفرق مع رسوم بيانية تفاعلية"
        icon="fa-solid fa-chart-pie"
        actions={
          <>
            <Button variant="outline" icon="fa-solid fa-file-pdf">PDF</Button>
            <Button variant="outline" icon="fa-solid fa-file-excel">Excel</Button>
            <Button icon="fa-solid fa-share-nodes">مشاركة اللوحة</Button>
          </>
        }
      />

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Tabs
          active={period}
          onChange={setPeriod}
          tabs={[
            { id: 'week', label: 'أسبوعي' },
            { id: 'month', label: 'شهري' },
            { id: 'quarter', label: 'ربع سنوي' },
            { id: 'year', label: 'سنوي' },
          ]}
        />
        <span className="text-[11px] font-bold text-slate-400">
          <i className="fa-solid fa-arrows-rotate ms-1.5" />
          آخر تحديث: اليوم 09:30
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="إجمالي البلاغات" value={KPIS.total.toLocaleString('en-US')} icon="fa-solid fa-inbox" tone="navy" delta={{ value: KPIS.totalDelta }} sub="مقارنة بالفترة السابقة" />
        <StatCard label="معدل الإنجاز" value={`${KPIS.completion}%`} icon="fa-solid fa-bullseye" tone="emerald" delta={{ value: KPIS.completionDelta }} sub="مستهدف 90%" />
        <StatCard label="متوسط زمن الاستجابة" value={`${KPIS.avgResponse} د`} icon="fa-solid fa-stopwatch" tone="amber" delta={{ value: KPIS.responseDelta, positive: false }} sub="الهدف أقل من 20 دقيقة" />
        <StatCard label="رضا المواطنين" value="92%" icon="fa-solid fa-face-smile" tone="sky" delta={{ value: '3%' }} sub="استبانات مكتملة: 1,842" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader
            title="البلاغات حسب المنطقة"
            subtitle="توزيع البلاغات على الأحياء"
            icon="fa-solid fa-chart-column"
            action={<Badge tone="info">10 أحياء</Badge>}
          />
          <div className="px-4 pb-4">
            <ChartCard type="bar" data={byZoneChart} height={300} />
          </div>
        </Card>
        <Card>
          <CardHeader title="البلاغات حسب النوع" subtitle="أعلى 7 أنواع" icon="fa-solid fa-chart-doughnut" tone="violet" />
          <div className="px-4 pb-4">
            <ChartCard type="doughnut" data={byTypeChart} height={300} legend />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader title="البلاغات حسب الوقت" subtitle="توزيع ساعي خلال اليوم" icon="fa-solid fa-clock" tone="amber" />
          <div className="px-4 pb-4">
            <ChartCard type="bar" data={hourlyChart} height={260} />
          </div>
        </Card>
        <Card>
          <CardHeader title="زمن الاستجابة الأسبوعي" subtitle="متوسط الدقائق حتى الوصول" icon="fa-solid fa-gauge-high" tone="red" />
          <div className="px-4 pb-4">
            <ChartCard type="line" data={responseChart} height={260} />
          </div>
        </Card>
        <Card>
          <CardHeader title="مؤشرات الأداء العامة" subtitle="القيمة الحالية مقابل المستهدف" icon="fa-solid fa-bullseye" tone="emerald" />
          <div className="px-4 pb-4">
            <ChartCard type="radar" data={radarChart} height={260} legend />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader
            title="الاتجاه الشهري للبلاغات"
            subtitle="إجمالي البلاغات ومعدل الإغلاق"
            icon="fa-solid fa-chart-line"
            action={
              <div className="hidden sm:flex items-center gap-3 text-[11px] font-bold">
                <span className="flex items-center gap-1.5 text-slate-500"><span className="h-2 w-2 rounded-full bg-[#2c5fa2]" />البلاغات</span>
                <span className="flex items-center gap-1.5 text-slate-500"><span className="h-2 w-2 rounded-full bg-[#10b981]" />الإغلاق %</span>
              </div>
            }
          />
          <div className="px-4 pb-4">
            <ChartCard type="line" data={monthlyChart} height={300} />
          </div>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader title="القنوات الرقمية" subtitle="حصة كل قناة استقبال" icon="fa-solid fa-share-nodes" tone="sky" />
            <div className="px-4 pb-4">
              <ChartCard type="doughnut" data={channelChart} height={230} legend />
            </div>
          </Card>
          <Card>
            <CardHeader title="مستويات الخطورة" subtitle="توزيع درجات الخطورة" icon="fa-solid fa-triangle-exclamation" tone="red" />
            <div className="px-4 pb-4">
              <ChartCard type="doughnut" data={severityChart} height={200} legend />
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader title="أداء الفرق" subtitle="نسبة الإنجاز مقابل زمن الاستجابة" icon="fa-solid fa-people-group" tone="emerald" />
          <div className="px-4 pb-4">
            <ChartCard type="bar" data={teamChart} height={300} legend />
          </div>
        </Card>
        <Card>
          <CardHeader title="مؤشرات سريعة" subtitle="قراءات لحظية" icon="fa-solid fa-bolt" tone="amber" />
          <div className="px-4 pb-4 space-y-4">
            {[
              { k: 'معدل إغلاق البلاغات في الوقت', v: 87, tone: 'emerald' as const },
              { k: 'الالتزام بزمن الاستجابة', v: 92, tone: 'emerald' as const },
              { k: 'البلاغات المعاد فتحها', v: 6, tone: 'red' as const },
              { k: 'استخدام قنوات رقمية', v: 78, tone: 'sky' as const },
              { k: 'البلاغات المكررة المُدمجة', v: 12, tone: 'amber' as const },
            ].map((m) => (
              <div key={m.k}>
                <Progress label={m.k} value={m.v} tone={m.tone} showValue />
              </div>
            ))}
            <div className="rounded-xl bg-navy-950 text-white p-4">
              <p className="text-[11px] text-slate-300 font-bold">البلاغات المتأخرة عن مستهدفها</p>
              <p className="text-2xl font-extrabold font-display mt-1 text-amber-400">9 بلاغات</p>
              <p className="text-[10px] text-slate-400 mt-1">تحتاج متابعة خلال 24 ساعة</p>
            </div>
          </div>
        </Card>
      </div>

      {/* جدول الأحياء */}
      <Card className="overflow-hidden">
        <CardHeader
          title="مؤشرات الأداء حسب الحي"
          subtitle="البلاغات المفتوحة ونسب الإنجاز"
          icon="fa-solid fa-table"
          action={<Badge tone="success">محدّث</Badge>}
        />
        <Table>
          <thead>
            <tr>
              <th>الحي</th>
              <th>إجمالي البلاغات</th>
              <th>مفتوحة</th>
              <th>الفرق المخصصة</th>
              <th>نسبة الإنجاز</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {ZONE_STATS.map((z) => (
              <tr key={z.name}>
                <td className="font-extrabold text-slate-700 dark:text-slate-200 whitespace-nowrap">{z.name}</td>
                <td>{z.reports}</td>
                <td>
                  <span className={z.open > 15 ? 'text-red-500 font-extrabold' : 'font-bold'}>{z.open}</span>
                </td>
                <td>{z.teams}</td>
                <td className="min-w-[160px]">
                  <Progress value={z.completion} tone={z.completion >= 90 ? 'emerald' : z.completion >= 85 ? 'amber' : 'red'} size="xs" showValue />
                </td>
                <td>
                  <Badge tone={z.completion >= 90 ? 'success' : z.completion >= 85 ? 'medium' : 'critical'}>
                    {z.completion >= 90 ? 'ممتاز' : z.completion >= 85 ? 'مستقر' : 'يحتاج تدخلاً'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {REPORT_TYPES.slice(0, 4).map((t, i) => (
          <Card key={t} className="p-4">
            <p className="text-[11px] font-bold text-slate-400 truncate">{t}</p>
            <p className="text-xl font-extrabold text-slate-800 dark:text-slate-100 font-display mt-1">{CHARTS.byType.data[i]}</p>
            <Progress value={Math.round((CHARTS.byType.data[i] / 218) * 100)} tone="navy" size="xs" className="mt-2" />
          </Card>
        ))}
      </div>
    </div>
  );
}
