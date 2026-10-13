import { useMemo, useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardHeader,
  ChartCard,
  Field,
  Input,
  MapView,
  Modal,
  PageHeader,
  Progress,
  Select,
  StatCard,
  Table,
} from '../components';
import { CHARTS, INSPECTORS, INSPECTOR_STATUSES, TASKS, ZONES, type Inspector } from '../data';

function statusTone(status: string) {
  if (status === 'متاح') return 'success' as const;
  if (status === 'جولة ميدانية' || status === 'مهمة ميدانية') return 'progress' as const;
  if (status === 'اجتماع') return 'info' as const;
  return 'closed' as const;
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" title={`${rating} من 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <i key={i} className={`fa-solid fa-star text-[10px] ${i <= Math.round(rating) ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'}`} />
      ))}
      <span className="text-[11px] font-extrabold text-slate-500 ms-1">{rating}</span>
    </span>
  );
}

export default function Inspectors() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('الكل');
  const [zone, setZone] = useState('الكل');
  const [selected, setSelected] = useState<Inspector | null>(null);

  const list = useMemo(
    () =>
      INSPECTORS.filter(
        (i) =>
          (!search.trim() || i.name.includes(search) || i.role.includes(search) || i.department.includes(search)) &&
          (status === 'الكل' || i.status === status) &&
          (zone === 'الكل' || i.zone === zone),
      ),
    [search, status, zone],
  );

  const stats = {
    total: INSPECTORS.length,
    field: INSPECTORS.filter((i) => i.status === 'جولة ميدانية' || i.status === 'مهمة ميدانية').length,
    avgCompletion: Math.round(INSPECTORS.reduce((s, i) => s + i.completionRate, 0) / INSPECTORS.length),
    avgRating: (INSPECTORS.reduce((s, i) => s + i.rating, 0) / INSPECTORS.length).toFixed(1),
  };

  const perfChart = {
    labels: CHARTS.inspectorPerformance.labels,
    datasets: [
      {
        label: 'نسبة الإنجاز %',
        data: CHARTS.inspectorPerformance.completion,
        backgroundColor: 'rgba(44, 95, 162, 0.85)',
        borderRadius: 8,
        maxBarThickness: 34,
      },
      {
        label: 'المهام النشطة',
        data: CHARTS.inspectorPerformance.tasks,
        backgroundColor: 'rgba(16, 185, 129, 0.85)',
        borderRadius: 8,
        maxBarThickness: 34,
      },
    ],
  };

  const inspectorTasks = selected ? TASKS.filter((t) => t.assignee === selected.name) : [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="المفتشون"
        subtitle="إدارة المفتشين وتوزيع المهام ومتابعة الأداء الميداني"
        icon="fa-solid fa-clipboard-check"
        tone="sky"
        actions={
          <>
            <Button variant="outline" icon="fa-solid fa-calendar-check">جدول المناوبات</Button>
            <Button variant="outline" icon="fa-solid fa-file-export">تصدير كشف</Button>
            <Button icon="fa-solid fa-user-plus">إضافة مفتش</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="إجمالي المفتشين" value={stats.total} icon="fa-solid fa-clipboard-check" tone="navy" sub="ضمن الوحدة" />
        <StatCard label="في الميدان الآن" value={stats.field} icon="fa-solid fa-person-walking-arrow-right" tone="emerald" sub="جولات ومهمات جارية" />
        <StatCard label="متوسط نسبة الإنجاز" value={`${stats.avgCompletion}%`} icon="fa-solid fa-chart-line" tone="sky" delta={{ value: '4%' }} sub="مستهدف 90%" />
        <StatCard label="متوسط التقييم" value={stats.avgRating} icon="fa-solid fa-star" tone="amber" sub="تقييم الأداء العام" />
      </div>

      {/* المرشحات */}
      <Card className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Field label="بحث">
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="اسم المفتش أو التخصص..." icon="fa-solid fa-magnifying-glass" />
          </Field>
          <Field label="الحالة">
            <Select options={['الكل', ...INSPECTOR_STATUSES]} value={status} onChange={(e) => setStatus(e.target.value)} />
          </Field>
          <Field label="الحي">
            <Select options={['الكل', ...ZONES]} value={zone} onChange={(e) => setZone(e.target.value)} />
          </Field>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {list.map((i) => (
          <Card key={i.id} hover className="p-5 animate-slide-up">
            <div className="flex items-start gap-3.5">
              <Avatar name={i.name} size="lg" tone="navy" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 truncate">{i.name}</h3>
                    <p className="text-[11px] text-slate-400 font-bold truncate">{i.role} — {i.id}</p>
                  </div>
                  <Badge tone={statusTone(i.status)} dot pulse={i.status === 'مهمة ميدانية'}>
                    {i.status}
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 truncate">
                  <i className="fa-solid fa-building ms-1.5 text-slate-400" />
                  {i.department}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  <i className="fa-solid fa-location-dot ms-1.5 text-slate-400" />
                  {i.zone}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5 mt-4">
              <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-2.5 text-center">
                <p className="text-base font-extrabold text-slate-700 dark:text-slate-200 font-display">{i.activeTasks}</p>
                <p className="text-[10px] font-bold text-slate-400">مهام نشطة</p>
              </div>
              <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-2.5 text-center">
                <p className="text-base font-extrabold text-slate-700 dark:text-slate-200 font-display">{i.completionRate}%</p>
                <p className="text-[10px] font-bold text-slate-400">الإنجاز</p>
              </div>
              <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-2.5 text-center">
                <Stars rating={i.rating} />
                <p className="text-[10px] font-bold text-slate-400 mt-1">التقييم</p>
              </div>
            </div>

            <Progress value={i.completionRate} tone={i.completionRate >= 90 ? 'emerald' : i.completionRate >= 85 ? 'amber' : 'red'} size="xs" className="mt-3.5" showValue label="نسبة إنجاز المهام" />

            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline" block onClick={() => setSelected(i)} icon="fa-solid fa-id-card">الملف</Button>
              <Button size="sm" block icon="fa-solid fa-list-check">تكليف</Button>
            </div>
          </Card>
        ))}
      </div>

      {list.length === 0 && (
        <Card className="p-10 text-center">
          <i className="fa-solid fa-user-slash text-3xl text-slate-300 dark:text-slate-600 mb-3 block" />
          <p className="text-sm font-extrabold text-slate-500">لا يوجد مفتشون مطابقون للبحث</p>
        </Card>
      )}

      {/* أداء المفتشين */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader
            title="أداء المفتشين"
            subtitle="نسبة الإنجاز مقابل المهام النشطة"
            icon="fa-solid fa-chart-column"
            action={<Badge tone="info">أكتوبر 2026</Badge>}
          />
          <div className="px-4 pb-4">
            <ChartCard type="bar" data={perfChart} height={300} legend />
          </div>
        </Card>
        <Card>
          <CardHeader title="توزيع الحالات" subtitle="حالة المفتشين الحالية" icon="fa-solid fa-chart-doughnut" tone="emerald" />
          <div className="px-4 pb-4">
            <ChartCard
              type="doughnut"
              data={{
                labels: INSPECTOR_STATUSES,
                datasets: [
                  {
                    data: INSPECTOR_STATUSES.map((s) => INSPECTORS.filter((i) => i.status === s).length),
                    backgroundColor: ['#10b981', '#2c5fa2', '#3d79be', '#f59e0b', '#94a3b8'],
                    borderWidth: 0,
                    cutout: '62%',
                  },
                ],
              }}
              height={240}
              legend
            />
          </div>
        </Card>
      </div>

      {/* جدول تفصيلي */}
      <Card className="overflow-hidden">
        <CardHeader title="كشف المفتشين التفصيلي" icon="fa-solid fa-table" />
        <Table>
          <thead>
            <tr>
              <th>الرقم</th>
              <th>الاسم</th>
              <th>التخصص</th>
              <th>الإدارة</th>
              <th>الحي</th>
              <th>الحالة</th>
              <th>المهام النشطة</th>
              <th>الإنجاز</th>
              <th>التقييم</th>
              <th>الجوال</th>
            </tr>
          </thead>
          <tbody>
            {list.map((i) => (
              <tr key={i.id} className="cursor-pointer" onClick={() => setSelected(i)}>
                <td className="font-extrabold text-navy-800 dark:text-navy-300">{i.id}</td>
                <td className="whitespace-nowrap">
                  <span className="flex items-center gap-2">
                    <Avatar name={i.name} size="xs" tone="sky" />
                    <span className="font-extrabold text-slate-700 dark:text-slate-200">{i.name}</span>
                  </span>
                </td>
                <td className="whitespace-nowrap text-xs">{i.role}</td>
                <td className="whitespace-nowrap text-xs">{i.department}</td>
                <td className="whitespace-nowrap">{i.zone}</td>
                <td><Badge tone={statusTone(i.status)}>{i.status}</Badge></td>
                <td>{i.activeTasks}</td>
                <td className="min-w-[130px]"><Progress value={i.completionRate} tone="emerald" size="xs" showValue /></td>
                <td><Stars rating={i.rating} /></td>
                <td className="text-xs whitespace-nowrap" dir="ltr">{i.phone}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* ملف المفتش */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name ?? ''}
        subtitle={selected ? `${selected.role} • ${selected.id}` : ''}
        icon="fa-solid fa-id-card"
        size="2xl"
        footer={
          <>
            <Button variant="outline" onClick={() => setSelected(null)}>إغلاق</Button>
            <Button icon="fa-solid fa-list-check">تكليف بمهمة</Button>
          </>
        }
      >
        {selected && (
          <div className="space-y-5 animate-fade-in">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                ['الحالة', selected.status],
                ['الإدارة', selected.department],
                ['الحي', selected.zone],
                ['تاريخ التعيين', selected.joinedAt],
                ['المهام النشطة', String(selected.activeTasks)],
                ['نسبة الإنجاز', `${selected.completionRate}%`],
                ['التقييم', `${selected.rating} / 5`],
                ['الجوال', selected.phone],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3">
                  <p className="text-[10px] font-bold text-slate-400 mb-1">{k}</p>
                  <p className="text-[12px] font-extrabold text-slate-700 dark:text-slate-200 leading-snug" dir={k === 'الجوال' ? 'ltr' : undefined}>{v}</p>
                </div>
              ))}
            </div>
            <MapView
              height={220}
              zoom={14}
              center={[selected.lat, selected.lng]}
              markers={[{ id: selected.id, lat: selected.lat, lng: selected.lng, title: selected.name, kind: 'inspector', label: `${selected.status} — ${selected.zone}` }]}
              legend={[{ label: 'موقع المفتش', color: '#06b6d4' }]}
            />
            <div className="rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="text-xs font-extrabold text-slate-500 dark:text-slate-400 px-4 pt-4 pb-2">المهام المسندة</p>
              {inspectorTasks.length > 0 ? (
                <Table>
                  <thead>
                    <tr>
                      <th>رقم المهمة</th>
                      <th>العنوان</th>
                      <th>الأولوية</th>
                      <th>الاستحقاق</th>
                      <th>الإنجاز</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inspectorTasks.map((t) => (
                      <tr key={t.id}>
                        <td className="font-extrabold text-navy-800 dark:text-navy-300">{t.id}</td>
                        <td>{t.title}</td>
                        <td>{t.priority}</td>
                        <td className="text-xs text-slate-400 whitespace-nowrap">{t.dueDate}</td>
                        <td className="min-w-[120px]"><Progress value={t.progress} tone="emerald" size="xs" showValue /></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="text-xs text-slate-400 px-4 pb-4">لا توجد مهام مسندة حالياً — يمكن إسناد مهمة جديدة.</p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
