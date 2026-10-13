import { Link, useNavigate } from 'react-router-dom';
import {
  Badge,
  Card,
  CardHeader,
  ChartCard,
  PageHeader,
  Progress,
  StatCard,
  Table,
  Timeline,
  Button,
  MapView,
  reportStatusTone,
  severityTone,
  chartPalette,
} from '../components';
import { CHARTS, KPIS, LIVE_EVENTS, REPORTS, TASKS, TEAMS, NOTIFICATIONS } from '../data';

const OPS_TIMELINE = [
  { id: 't1', time: '09:40', title: 'إغلاق مروري مؤقت - النرجس', description: 'تحويل المرور عن الشارع المتأثر', icon: 'fa-solid fa-road-barrier', tone: 'amber' as const, actor: 'فريق المرور الميداني' },
  { id: 't2', time: '09:25', title: 'تقدم أعمال الشفط', description: 'المنسوب يتراجع بعد فتح البالوعة الرئيسية', icon: 'fa-solid fa-water', tone: 'sky' as const, actor: 'فريق الانصاف 1' },
  { id: 't3', time: '09:10', title: 'وصول الفريق الميداني', description: 'بدء أعمال الشفط وفك الالتباس', icon: 'fa-solid fa-truck', tone: 'emerald' as const, actor: 'فريق الانصاف 1' },
  { id: 't4', time: '08:55', title: 'تصنيف آلي وتكليف فريق', description: 'تصنيف حرج واقتراح فريق الانصاف 1', icon: 'fa-solid fa-robot', tone: 'violet' as const, actor: 'وحدة الذكاء الاصطناعي' },
  { id: 't5', time: '08:42', title: 'استلام بلاغ حرج', description: 'بلاغ BR-2026-1042 عبر تطبيق الهاتف', icon: 'fa-solid fa-inbox', tone: 'navy' as const, actor: 'مركز الاستقبال' },
  { id: 't6', time: '07:30', title: 'بداية الحادث الميداني', description: 'ارتفاع منسوب المياه بعد مطر غزيف', icon: 'fa-solid fa-cloud-showers-heavy', tone: 'red' as const },
];

const QUICK_ACTIONS = [
  { label: 'بلاغ جديد', icon: 'fa-solid fa-plus', to: '/intake', tone: 'bg-navy-950 hover:bg-navy-900 text-white' },
  { label: 'مهمة ميدانية', icon: 'fa-solid fa-list-check', to: '/tasks', tone: 'bg-emerald-600 hover:bg-emerald-700 text-white' },
  { label: 'فتح حادث', icon: 'fa-solid fa-triangle-exclamation', to: '/incidents', tone: 'bg-red-600 hover:bg-red-700 text-white' },
  { label: 'الخريطة', icon: 'fa-solid fa-map-location-dot', to: '/map', tone: 'bg-sky-600 hover:bg-sky-700 text-white' },
  { label: 'تقرير سريع', icon: 'fa-solid fa-file-export', to: '/reports-center', tone: 'bg-violet-600 hover:bg-violet-700 text-white' },
  { label: 'اتصال بالفرق', icon: 'fa-solid fa-tower-broadcast', to: '/communications', tone: 'bg-amber-500 hover:bg-amber-600 text-white' },
];

const levelTone: Record<string, string> = {
  خطير: 'bg-red-50 text-red-700 ring-red-200 dark:bg-red-500/15 dark:text-red-300 dark:ring-red-500/30',
  متوسط: 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-500/30',
  مستقر: 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/30',
};

export default function Dashboard() {
  const navigate = useNavigate();

  const mapMarkers = [
    ...REPORTS.filter((r) => r.status !== 'مغلق').map((r) => ({
      id: r.id,
      lat: r.lat,
      lng: r.lng,
      title: `${r.id} — ${r.type}`,
      kind: (r.severity === 'حرج' ? 'critical' : 'report') as 'critical' | 'report',
      label: `${r.zone} • ${r.status}`,
      popup: `الأولوية: ${r.priority}`,
    })),
    ...TEAMS.map((t) => ({
      id: t.id,
      lat: t.lat,
      lng: t.lng,
      title: t.name,
      kind: 'team' as const,
      label: `${t.status} • ${t.zone}`,
      popup: `القائد: ${t.lead}`,
    })),
  ];

  const weeklyData = {
    labels: CHARTS.weekly.labels,
    datasets: [
      {
        label: 'بلاغات جديدة',
        data: CHARTS.weekly.created,
        borderColor: chartPalette[1],
        backgroundColor: 'rgba(44, 95, 162, 0.12)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: chartPalette[1],
        borderWidth: 2.5,
      },
      {
        label: 'بلاغات مغلقة',
        data: CHARTS.weekly.closed,
        borderColor: chartPalette[3],
        backgroundColor: 'rgba(16, 185, 129, 0.10)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: chartPalette[3],
        borderWidth: 2.5,
      },
      {
        label: 'قيد التنفيذ',
        data: CHARTS.weekly.inProgress,
        borderColor: chartPalette[4],
        borderDash: [6, 5],
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: chartPalette[4],
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const completionData = {
    labels: ['نسبة الإنجاز المحققة', 'المتبقي'],
    datasets: [
      {
        data: [KPIS.completion, 100 - KPIS.completion],
        backgroundColor: [chartPalette[3], 'rgba(148, 163, 184, 0.2)'],
        borderWidth: 0,
        cutout: '75%',
      },
    ],
  };

  const channelData = {
    labels: CHARTS.channelShare.labels,
    datasets: [
      { data: CHARTS.channelShare.data, backgroundColor: chartPalette, borderWidth: 0, cutout: '58%' },
    ],
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="لوحة القيادة الرئيسية"
        subtitle="مركز العمليات الميدانية — تحديث لحظي لجميع البلاغات والفرق"
        icon="fa-solid fa-gauge-high"
        badge={
          <span className="chip bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/30">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-soft" />
            النظام يعمل
          </span>
        }
        actions={
          <>
            <Button variant="outline" icon="fa-solid fa-rotate" size="md">
              تحديث
            </Button>
            <Button variant="outline" icon="fa-solid fa-download" size="md">
              تصدير
            </Button>
            <Button icon="fa-solid fa-plus" size="md" onClick={() => navigate('/intake')}>
              بلاغ جديد
            </Button>
          </>
        }
      />

      {/* شريط التنبيه الفوري */}
      <div className="card flex items-center gap-4 px-4 py-3 border-s-4 border-s-red-500 bg-gradient-to-l from-red-50/70 to-transparent dark:from-red-500/5 animate-slide-up">
        <span className="icon-box h-9 w-9 text-sm bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-300 animate-pulse-soft">
          <i className="fa-solid fa-triangle-exclamation" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-extrabold text-slate-800 dark:text-slate-100">
            تنبيه حرج <span className="text-red-500">•</span> تسرب شبكة مياه أمام مدرسة الرواد — حي حطين
          </p>
          <p className="text-[11px] text-slate-400 truncate">فريق الطوارئ المائي مُكلف — إغلاق المقطع جارٍ — INC-2026-017</p>
        </div>
        <Link to="/incidents/INC-2026-017" className="shrink-0">
          <Button variant="danger" size="sm" icon="fa-solid fa-arrow-left">
            عرض
          </Button>
        </Link>
      </div>

      {/* مؤشرات الأداء */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="إجمالي البلاغات" value={KPIS.total.toLocaleString('en-US')} icon="fa-solid fa-inbox" tone="navy" delta={{ value: KPIS.totalDelta }} sub="منذ بداية العام" />
        <StatCard label="البلاغات الجديدة" value={KPIS.newToday} icon="fa-solid fa-square-plus" tone="sky" delta={{ value: KPIS.newDelta }} sub="اليوم" />
        <StatCard label="البلاغات الحرجة" value={KPIS.critical} icon="fa-solid fa-triangle-exclamation" tone="red" delta={{ value: KPIS.criticalDelta, positive: false }} sub="تتطلب تدخلاً فورياً" />
        <StatCard label="البلاغات المغلقة" value={KPIS.closed} icon="fa-solid fa-circle-check" tone="emerald" delta={{ value: KPIS.closedDelta }} sub="معدل إنجاز 87%" />
        <StatCard label="قيد التنفيذ" value={KPIS.inProgress} icon="fa-solid fa-spinner" tone="amber" delta={{ value: KPIS.inProgressDelta, positive: false }} sub="بلاغات مفتوحة" />
        <StatCard label="عدد المفتشين" value={KPIS.inspectors} icon="fa-solid fa-clipboard-check" tone="violet" delta={{ value: '3' }} sub="24 في الميدان اليوم" />
        <StatCard label="الفرق الميدانية" value={KPIS.teams} icon="fa-solid fa-people-group" tone="teal" delta={{ value: '2' }} sub="8 فرق في مهمة" />
        <StatCard label="متوسط زمن الاستجابة" value={`${KPIS.avgResponse} د`} icon="fa-solid fa-stopwatch" tone="rose" delta={{ value: KPIS.responseDelta, positive: false }} sub="الهدف أقل من 20 دقيقة" />
      </div>

      {/* الخريطة + الأحداث */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 overflow-hidden animate-slide-up">
          <CardHeader
            title="الخريطة المباشرة"
            subtitle="مواقع البلاغات المفتوحة والفرق الميدانية"
            icon="fa-solid fa-map-location-dot"
            tone="emerald"
            action={
              <Link to="/map">
                <Button variant="outline" size="sm" icon="fa-solid fa-expand">
                  فتح الكامل
                </Button>
              </Link>
            }
          />
          <div className="px-4 pb-4">
            <MapView
              height={380}
              zoom={11}
              markers={mapMarkers}
              fitBounds
              legend={[
                { label: 'بلاغ حرج', color: '#ef4444' },
                { label: 'بلاغ مفتوح', color: '#f59e0b' },
                { label: 'فريق ميداني', color: '#0b2545' },
              ]}
            />
          </div>
        </Card>

        <Card className="animate-slide-up">
          <CardHeader
            title="الأحداث الجارية"
            subtitle="العمليات الميدانية المفتوحة"
            icon="fa-solid fa-tower-broadcast"
            tone="red"
            action={
              <span className="chip bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-300">
                {LIVE_EVENTS.filter((e) => e.status === 'جارية').length} نشطة
              </span>
            }
          />
          <div className="px-4 pb-4 space-y-3 max-h-[380px] overflow-y-auto">
            {LIVE_EVENTS.map((e) => (
              <Link
                key={e.id}
                to="/incidents"
                className="block rounded-xl border border-slate-200 dark:border-slate-700/70 p-3.5 hover:border-navy-300 dark:hover:border-navy-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[13px] font-extrabold text-slate-700 dark:text-slate-200 leading-snug">{e.title}</p>
                  <span className={`chip ring-1 ring-inset shrink-0 ${levelTone[e.level]}`}>{e.level}</span>
                </div>
                <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400 font-bold">
                  <span>
                    <i className="fa-solid fa-location-dot ms-1" />
                    {e.zone}
                  </span>
                  <span>
                    <i className="fa-solid fa-users ms-1" />
                    {e.teams}
                  </span>
                  <span className="ms-auto">{e.time}</span>
                </div>
              </Link>
            ))}
            <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-3 text-center">
              <p className="text-[11px] text-slate-400 font-bold">آخر تحديث قبل 30 ثانية — البث مستمر</p>
            </div>
          </div>
        </Card>
      </div>

      {/* الرسوم البيانية */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 animate-slide-up">
          <CardHeader
            title="حركة البلاغات الأسبوعية"
            subtitle="مقارنة الإدخال والإغلاق والقيد التنفيذ"
            icon="fa-solid fa-chart-line"
            action={
              <div className="hidden sm:flex items-center gap-3 text-[11px] font-bold">
                <span className="flex items-center gap-1.5 text-slate-500"><span className="h-2 w-2 rounded-full bg-[#2c5fa2]" />جديدة</span>
                <span className="flex items-center gap-1.5 text-slate-500"><span className="h-2 w-2 rounded-full bg-[#10b981]" />مغلقة</span>
                <span className="flex items-center gap-1.5 text-slate-500"><span className="h-2 w-2 rounded-full bg-[#f59e0b]" />قيد التنفيذ</span>
              </div>
            }
          />
          <div className="px-4 pb-4">
            <ChartCard type="line" data={weeklyData} height={280} options={{ scales: { y: { beginAtZero: true } } }} />
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="animate-slide-up">
            <CardHeader title="نسبة الإنجاز" subtitle="معدل إغلاق البلاغات" icon="fa-solid fa-bullseye" tone="emerald" />
            <div className="px-4 pb-4">
              <div className="flex items-baseline justify-center gap-2 mb-1">
                <span className="text-4xl font-extrabold text-slate-800 dark:text-slate-100 font-display">{KPIS.completion}%</span>
                <span className="chip bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">+{KPIS.completionDelta}</span>
              </div>
              <ChartCard type="doughnut" data={completionData} height={170} legend={false} />
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3 text-center">
                  <p className="text-lg font-extrabold text-slate-700 dark:text-slate-200">{KPIS.closed}</p>
                  <p className="text-[10px] font-bold text-slate-400">مغلق</p>
                </div>
                <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3 text-center">
                  <p className="text-lg font-extrabold text-slate-700 dark:text-slate-200">{KPIS.inProgress}</p>
                  <p className="text-[10px] font-bold text-slate-400">قيد التنفيذ</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* البلاغات + Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 animate-slide-up">
          <CardHeader
            title="آخر البلاغات"
            subtitle="أحدث ما تم استقباله عبر القنوات الرقمية"
            icon="fa-solid fa-file-lines"
            action={
              <Link to="/reports">
                <Button variant="outline" size="sm" icon="fa-solid fa-arrow-left">
                  عرض الكل
                </Button>
              </Link>
            }
          />
          <Table>
            <thead>
              <tr>
                <th>رقم البلاغ</th>
                <th>النوع</th>
                <th>الخطورة</th>
                <th>الحي</th>
                <th>الحالة</th>
                <th>الوقت</th>
              </tr>
            </thead>
            <tbody>
              {REPORTS.slice(0, 6).map((r) => (
                <tr key={r.id} className="cursor-pointer" onClick={() => navigate('/reports')}>
                  <td className="font-extrabold text-navy-800 dark:text-navy-300">{r.id}</td>
                  <td className="max-w-[220px] truncate">{r.type}</td>
                  <td>
                    <Badge tone={severityTone(r.severity)} dot>
                      {r.severity}
                    </Badge>
                  </td>
                  <td>{r.zone}</td>
                  <td>
                    <Badge tone={reportStatusTone(r.status)}>{r.status}</Badge>
                  </td>
                  <td className="text-xs text-slate-400 whitespace-nowrap">{r.createdAt.split(' ')[1]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>

        <Card className="animate-slide-up">
          <CardHeader title="Timeline العمليات" subtitle="سجل التحركات اللحظية" icon="fa-solid fa-timeline" tone="violet" />
          <div className="px-4 pb-4">
            <Timeline items={OPS_TIMELINE} compact />
          </div>
        </Card>
      </div>

      {/* المهام + إجراءات سريعة + القنوات */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="animate-slide-up">
          <CardHeader
            title="آخر المهام"
            subtitle="المهام الميدانية قيد المتابعة"
            icon="fa-solid fa-list-check"
            action={
              <Link to="/tasks">
                <Button variant="outline" size="sm">الكل</Button>
              </Link>
            }
          />
          <div className="px-4 pb-4 space-y-4">
            {TASKS.slice(0, 4).map((t) => (
              <div key={t.id} className="rounded-xl border border-slate-200 dark:border-slate-700/70 p-3.5">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[13px] font-extrabold text-slate-700 dark:text-slate-200 leading-snug">{t.title}</p>
                  <Badge tone={t.status === 'متأخرة' ? 'critical' : t.status === 'مكتملة' ? 'success' : 'progress'}>{t.status}</Badge>
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-3">
                  <span><i className="fa-solid fa-user ms-1" />{t.assignee}</span>
                  <span><i className="fa-solid fa-clock ms-1" />{t.dueDate.split(' ')[1]}</span>
                </p>
                <Progress value={t.progress} tone={t.status === 'متأخرة' ? 'red' : 'emerald'} size="xs" className="mt-2.5" showValue />
              </div>
            ))}
          </div>
        </Card>

        <Card className="animate-slide-up">
          <CardHeader title="إجراءات سريعة" subtitle="اختصارات غرفة العمليات" icon="fa-solid fa-bolt" tone="amber" />
          <div className="px-4 pb-4 grid grid-cols-2 gap-3">
            {QUICK_ACTIONS.map((a) => (
              <button
                key={a.label}
                onClick={() => navigate(a.to)}
                className={`flex flex-col items-center justify-center gap-2 rounded-2xl p-4 text-center transition-all hover:-translate-y-1 hover:shadow-card-hover ${a.tone}`}
              >
                <i className={`${a.icon} text-lg`} />
                <span className="text-[11px] font-extrabold">{a.label}</span>
              </button>
            ))}
          </div>
          <div className="mx-4 mb-4 rounded-xl bg-navy-950 text-white p-4 relative overflow-hidden">
            <div className="absolute -top-6 -end-6 h-20 w-20 rounded-full bg-emerald-500/20" />
            <p className="text-[11px] text-slate-300 font-bold">متوسط زمن الاستجابة اليوم</p>
            <p className="text-2xl font-extrabold font-display mt-0.5">
              {KPIS.avgResponse} دقيقة <span className="text-xs text-emerald-400">▼ {KPIS.responseDelta}</span>
            </p>
          </div>
        </Card>

        <Card className="animate-slide-up">
          <CardHeader title="البلاغات حسب القناة" subtitle="توزيع المصادر الإلكترونية" icon="fa-solid fa-share-nodes" tone="sky" />
          <div className="px-4 pb-4">
            <ChartCard type="doughnut" data={channelData} height={240} legend />
            <div className="mt-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3 flex items-center gap-3">
              <span className="icon-box h-9 w-9 text-sm bg-navy-100 text-navy-800 dark:bg-navy-800/50 dark:text-navy-200">
                <i className="fa-solid fa-bell" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-extrabold text-slate-700 dark:text-slate-200">
                  {NOTIFICATIONS.filter((n) => !n.read).length} إشعارات غير مقروءة
                </p>
                <Link to="/notifications" className="text-[11px] font-bold text-navy-700 dark:text-emerald-400">
                  فتح مركز الإشعارات
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
