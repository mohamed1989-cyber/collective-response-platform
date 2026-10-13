import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, Card, CardHeader, Field, Input, Modal, PageHeader, Progress, Select, StatCard, Tabs, Textarea, severityTone, reportStatusTone } from '../components';
import { INCIDENTS, TEAMS, ZONES } from '../data';

const STATUS_TABS = [
  { id: 'الكل', label: 'الكل' },
  { id: 'قيد التنفيذ', label: 'قيد التنفيذ' },
  { id: 'قيد المراجعة', label: 'قيد المراجعة' },
  { id: 'مجدول', label: 'مجدول' },
  { id: 'مغلق', label: 'مغلق' },
];

export default function Incidents() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('الكل');
  const [newOpen, setNewOpen] = useState(false);

  const list = useMemo(() => (tab === 'الكل' ? INCIDENTS : INCIDENTS.filter((i) => i.status === tab)), [tab]);

  const stats = {
    total: INCIDENTS.length,
    critical: INCIDENTS.filter((i) => i.severity === 'حرج').length,
    active: INCIDENTS.filter((i) => i.status === 'قيد التنفيذ').length,
    closed: INCIDENTS.filter((i) => i.status === 'مغلق').length,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="إدارة الحوادث"
        subtitle="ملفات الحوادث المفتوحة والمغلقة مع المتابعة اللحظية والقرارات"
        icon="fa-solid fa-triangle-exclamation"
        tone="red"
        actions={
          <>
            <Button variant="outline" icon="fa-solid fa-file-pdf">تقرير الحوادث</Button>
            <Button icon="fa-solid fa-plus" onClick={() => setNewOpen(true)}>حادث جديد</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="إجمالي الحوادث" value={stats.total} icon="fa-solid fa-burst" tone="navy" sub="خلال آخر 7 أيام" />
        <StatCard label="حوادث حرجة" value={stats.critical} icon="fa-solid fa-triangle-exclamation" tone="red" sub="تحت إشراف القيادة" />
        <StatCard label="قيد التنفيذ" value={stats.active} icon="fa-solid fa-person-digging" tone="amber" delta={{ value: '2' }} sub="فرق ميدانية مُكلفة" />
        <StatCard label="حوادث مغلقة" value={stats.closed} icon="fa-solid fa-circle-check" tone="emerald" sub="أُغلقت بنجاح" />
      </div>

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Tabs tabs={STATUS_TABS} active={tab} onChange={setTab} />
        <div className="flex items-center gap-2">
          <Badge tone="critical" dot pulse>{stats.critical} حرجة</Badge>
          <Badge tone="progress">{stats.active} نشطة</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {list.map((inc, idx) => (
          <Card key={inc.id} hover className={`p-5 animate-slide-up ${inc.severity === 'حرج' ? 'border-s-4 border-s-red-500' : ''}`} >
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                  <Badge tone={severityTone(inc.severity)} dot pulse={inc.severity === 'حرج'}>{inc.severity}</Badge>
                  <Badge tone={reportStatusTone(inc.status)}>{inc.status}</Badge>
                  <span className="text-[11px] font-extrabold text-navy-700 dark:text-emerald-400">{inc.id}</span>
                </div>
                <h3 className="text-[15px] font-extrabold text-slate-800 dark:text-slate-100 leading-snug">{inc.title}</h3>
                <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-3 flex-wrap">
                  <span><i className="fa-solid fa-location-dot ms-1" />{inc.zone} — {inc.address}</span>
                  <span><i className="fa-solid fa-clock ms-1" />{inc.reportedAt}</span>
                </p>
              </div>
              <span className="icon-box h-11 w-11 text-base bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-300 shrink-0">
                <i className={inc.severity === 'حرج' ? 'fa-solid fa-fire-flame-curved' : 'fa-solid fa-triangle-exclamation'} />
              </span>
            </div>

            <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed mt-3 line-clamp-2">{inc.description}</p>

            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-2.5 text-center">
                <p className="text-[10px] font-bold text-slate-400">القائد</p>
                <p className="text-[12px] font-extrabold text-slate-700 dark:text-slate-200 truncate">{inc.commander}</p>
              </div>
              <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-2.5 text-center">
                <p className="text-[10px] font-bold text-slate-400">الفرق المشاركة</p>
                <p className="text-[12px] font-extrabold text-slate-700 dark:text-slate-200">{inc.teams.length}</p>
              </div>
              <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-2.5 text-center">
                <p className="text-[10px] font-bold text-slate-400">الوثائق</p>
                <p className="text-[12px] font-extrabold text-slate-700 dark:text-slate-200">{inc.docs.length}</p>
              </div>
            </div>

            <div className="mt-4">
              <Progress label="نسبة معالجة الحادث" value={inc.progress} tone={inc.progress === 100 ? 'emerald' : inc.severity === 'حرج' ? 'red' : 'amber'} showValue />
            </div>

            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <div className="flex -space-x-2 space-x-reverse ms-0">
                {inc.teams.slice(0, 3).map((t) => (
                  <span key={t} title={t} className="h-7 w-7 rounded-full bg-navy-800 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
                    {t.replace('فريق ', '').slice(0, 2)}
                  </span>
                ))}
              </div>
              <span className="text-[11px] text-slate-400 font-bold">{inc.affected}</span>
              <div className="ms-auto flex gap-2">
                <Button size="sm" variant="outline" icon="fa-solid fa-print">طباعة</Button>
                <Button size="sm" icon="fa-solid fa-folder-open" onClick={() => navigate(`/incidents/${inc.id}`)}>
                  ملف الحادث
                </Button>
              </div>
            </div>
          </Card>
        ))}
        {list.length === 0 && (
          <Card className="xl:col-span-2 p-10 text-center">
            <i className="fa-solid fa-shield text-3xl text-slate-300 dark:text-slate-600 mb-3 block" />
            <p className="text-sm font-extrabold text-slate-500">لا توجد حوادث في هذه الحالة حالياً</p>
          </Card>
        )}
      </div>

      {/* حادث جديد */}
      <Modal
        open={newOpen}
        onClose={() => setNewOpen(false)}
        title="فتح ملف حادث جديد"
        subtitle="يُسجَّل في سجل العمليات تلقائياً"
        icon="fa-solid fa-triangle-exclamation"
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setNewOpen(false)}>إلغاء</Button>
            <Button icon="fa-solid fa-plus" onClick={() => setNewOpen(false)}>إنشاء الحادث</Button>
          </>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="عنوان الحادث" required className="sm:col-span-2">
            <Input placeholder="مثال: انسكاب مياه أمطار وقطع للمرور" icon="fa-solid fa-heading" />
          </Field>
          <Field label="تصنيف الحادث" required>
            <Select options={['كوارث طبيعية', 'بنية تحتية', 'مخالفات عمرانية', 'مخالفات تخطيطية', 'بيئة ونظافة', 'سلامة عامة']} />
          </Field>
          <Field label="درجة الخطورة" required>
            <Select options={['حرج', 'عالي', 'متوسط', 'منخفض']} defaultValue="عالي" />
          </Field>
          <Field label="الحي">
            <Select options={ZONES} />
          </Field>
          <Field label="القائد الميداني">
            <Select options={['م. فهد العجمي', 'م. سارة النعيمي', 'م. منصور الشمراني', 'م. خالد الزامل']} />
          </Field>
          <Field label="الفرق المشاركة" className="sm:col-span-2">
            <div className="flex flex-wrap gap-2">
              {TEAMS.map((t) => (
                <label key={t.id} className="chip ring-1 ring-inset ring-slate-200 dark:ring-slate-700 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors has-[:checked]:bg-navy-950 has-[:checked]:text-white">
                  <input type="checkbox" className="hidden" defaultChecked={t.id === 'TM-01'} />
                  {t.name}
                </label>
              ))}
            </div>
          </Field>
          <Field label="وصف الحادث" className="sm:col-span-2">
            <Textarea rows={3} placeholder="تفاصيل أولية للحادث ونطاق التأثر..." />
          </Field>
        </div>
      </Modal>
    </div>
  );
}
