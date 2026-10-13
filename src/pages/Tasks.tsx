import { useMemo, useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardHeader,
  Field,
  Input,
  Modal,
  PageHeader,
  Progress,
  Select,
  StatCard,
  Table,
  Tabs,
  Textarea,
  priorityTone,
  type TabItem,
} from '../components';
import { DEPARTMENTS, INSPECTORS, PRIORITIES, REPORT_TYPES, TASKS, TASK_STATUSES, TEAMS, ZONES, type FieldTask } from '../data';

const COLUMNS: { status: string; color: string; icon: string }[] = [
  { status: 'جديدة', color: 'bg-sky-500', icon: 'fa-solid fa-circle-plus' },
  { status: 'قيد التنفيذ', color: 'bg-navy-600', icon: 'fa-solid fa-spinner' },
  { status: 'متأخرة', color: 'bg-red-500', icon: 'fa-solid fa-triangle-exclamation' },
  { status: 'مكتملة', color: 'bg-emerald-500', icon: 'fa-solid fa-circle-check' },
];

const CHECKLIST = ['توثيق الموقع بالصور', 'التأكد من سلامة المعدات', 'تنفيذ الأعمال المطلوبة', 'رفع تقرير الإنجاز', 'تأكيد إغلاق المهمة'];

function taskTone(status: string) {
  if (status === 'مكتملة') return 'success' as const;
  if (status === 'متأخرة') return 'critical' as const;
  if (status === 'قيد التنفيذ') return 'progress' as const;
  if (status === 'معلقة') return 'pending' as const;
  return 'new' as const;
}

export default function Tasks() {
  const [view, setView] = useState<'board' | 'table'>('board');
  const [tab, setTab] = useState('all');
  const [createOpen, setCreateOpen] = useState(false);
  const [selected, setSelected] = useState<FieldTask | null>(null);
  const [note, setNote] = useState('');
  const [done, setDone] = useState<number[]>([0, 1]);

  const list = useMemo(() => {
    if (tab === 'all') return TASKS;
    if (tab === 'mine') return TASKS.filter((t) => t.assignee === 'ماجد القحطاني' || t.assignee === 'أمل الفهد');
    if (tab === 'late') return TASKS.filter((t) => t.status === 'متأخرة');
    if (tab === 'closed') return TASKS.filter((t) => t.status === 'مكتملة');
    return TASKS;
  }, [tab]);

  const stats = {
    total: TASKS.length,
    active: TASKS.filter((t) => t.status === 'قيد التنفيذ').length,
    late: TASKS.filter((t) => t.status === 'متأخرة').length,
    done: TASKS.filter((t) => t.status === 'مكتملة').length,
  };

  const filterTabs: TabItem[] = [
    { id: 'all', label: 'كل المهام', count: TASKS.length },
    { id: 'mine', label: 'مهامي', count: TASKS.filter((t) => t.assignee === 'ماجد القحطاني' || t.assignee === 'أمل الفهد').length },
    { id: 'late', label: 'متأخرة', count: stats.late },
    { id: 'closed', label: 'مكتملة', count: stats.done },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="المهام الميدانية"
        subtitle="إنشاء المهام وتعيين المفتشين والفرق ومتابعة التنفيذ حتى الإغلاق"
        icon="fa-solid fa-list-check"
        actions={
          <>
            <div className="hidden sm:flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 gap-1">
              <button onClick={() => setView('board')} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${view === 'board' ? 'bg-white dark:bg-slate-900 shadow-sm text-navy-900 dark:text-white' : 'text-slate-500'}`}>
                <i className="fa-solid fa-table-columns ms-1.5" />
                كانبان
              </button>
              <button onClick={() => setView('table')} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${view === 'table' ? 'bg-white dark:bg-slate-900 shadow-sm text-navy-900 dark:text-white' : 'text-slate-500'}`}>
                <i className="fa-solid fa-table-list ms-1.5" />
                جدول
              </button>
            </div>
            <Button variant="outline" icon="fa-solid fa-file-export">تصدير</Button>
            <Button icon="fa-solid fa-plus" onClick={() => setCreateOpen(true)}>مهمة جديدة</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="إجمالي المهام" value={stats.total} icon="fa-solid fa-list-check" tone="navy" sub="أكتوبر 2026" />
        <StatCard label="قيد التنفيذ" value={stats.active} icon="fa-solid fa-person-digging" tone="amber" delta={{ value: '3' }} sub="فرق ميدانية مُكلفة" />
        <StatCard label="مهام متأخرة" value={stats.late} icon="fa-solid fa-triangle-exclamation" tone="red" sub="تحتاج تدخلاً فورياً" />
        <StatCard label="مهام مكتملة" value={stats.done} icon="fa-solid fa-circle-check" tone="emerald" delta={{ value: '12%' }} sub="معدل إنجاز 78%" />
      </div>

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Tabs tabs={filterTabs} active={tab} onChange={setTab} />
        <div className="flex items-center gap-2">
          <Select options={['كل الأحياء', ...ZONES]} className="!w-44 !py-2 text-xs" />
          <Select options={['كل الأولويات', ...PRIORITIES]} className="!w-36 !py-2 text-xs" />
        </div>
      </div>

      {view === 'board' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-5 animate-fade-in">
          {COLUMNS.map((col) => {
            const items = list.filter((t) => t.status === col.status);
            return (
              <div key={col.status} className="space-y-4">
                <div className="flex items-center gap-2.5 px-1">
                  <span className={`h-2.5 w-2.5 rounded-full ${col.color}`} />
                  <h3 className="text-sm font-extrabold text-slate-700 dark:text-slate-200">{col.status}</h3>
                  <span className="chip bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">{items.length}</span>
                  <button onClick={() => setCreateOpen(true)} className="ms-auto h-7 w-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-navy-950 hover:text-white transition-colors">
                    <i className="fa-solid fa-plus text-[10px]" />
                  </button>
                </div>
                <div className="space-y-3 min-h-[120px]">
                  {items.map((t) => (
                    <Card key={t.id} hover className="p-4 cursor-pointer" >
                      <div onClick={() => { setSelected(t); setDone(t.status === 'مكتملة' ? [0, 1, 2, 3, 4] : [0, 1]); }}>
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[11px] font-extrabold text-navy-700 dark:text-emerald-400">{t.id}</span>
                          <Badge tone={priorityTone(t.priority)}>{t.priority}</Badge>
                        </div>
                        <h4 className="text-[13px] font-extrabold text-slate-700 dark:text-slate-200 mt-2 leading-snug">{t.title}</h4>
                        <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-2">
                          <i className="fa-solid fa-location-dot" />
                          {t.zone}
                          <span className="ms-auto flex items-center gap-1">
                            <i className="fa-regular fa-clock" />
                            {t.dueDate.split(' ')[1]}
                          </span>
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                          <Avatar name={t.assignee} size="xs" tone="navy" />
                          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 truncate">{t.assignee}</span>
                          <span className="text-[10px] text-slate-400 truncate ms-auto">{t.team}</span>
                        </div>
                        <Progress value={t.progress} tone={t.status === 'متأخرة' ? 'red' : t.status === 'مكتملة' ? 'emerald' : 'navy'} size="xs" className="mt-3" showValue />
                      </div>
                      <div className="flex gap-1.5 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                        <Button size="sm" variant="outline" block icon="fa-solid fa-eye" onClick={() => setSelected(t)}>تفاصيل</Button>
                        <Button size="sm" variant="success" block icon="fa-solid fa-check">إغلاق</Button>
                      </div>
                    </Card>
                  ))}
                  {items.length === 0 && (
                    <div className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-6 text-center">
                      <i className="fa-solid fa-clipboard-check text-xl text-slate-300 dark:text-slate-600" />
                      <p className="text-[11px] text-slate-400 mt-2 font-bold">لا توجد مهام في هذه الحالة</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Card className="overflow-hidden animate-fade-in">
          <CardHeader
            title="جدول المهام"
            subtitle="عرض تفصيلي لجميع المهام المفلترة"
            icon="fa-solid fa-table-list"
            action={<Badge tone="info">{list.length} مهمة</Badge>}
          />
          <Table>
            <thead>
              <tr>
                <th>رقم المهمة</th>
                <th>العنوان</th>
                <th>النوع</th>
                <th>الأولوية</th>
                <th>الحالة</th>
                <th>المنفّذ</th>
                <th>الفريق</th>
                <th>الحي</th>
                <th>الاستحقاق</th>
                <th>الإنجاز</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {list.map((t) => (
                <tr key={t.id} className="cursor-pointer" onClick={() => setSelected(t)}>
                  <td className="font-extrabold text-navy-800 dark:text-navy-300 whitespace-nowrap">{t.id}</td>
                  <td className="max-w-[240px] truncate font-bold text-slate-700 dark:text-slate-200">{t.title}</td>
                  <td className="whitespace-nowrap text-xs">{t.type}</td>
                  <td><Badge tone={priorityTone(t.priority)}>{t.priority}</Badge></td>
                  <td><Badge tone={taskTone(t.status)} dot pulse={t.status === 'متأخرة'}>{t.status}</Badge></td>
                  <td className="whitespace-nowrap">
                    <span className="flex items-center gap-2">
                      <Avatar name={t.assignee} size="xs" tone="sky" />
                      <span className="text-xs font-bold">{t.assignee}</span>
                    </span>
                  </td>
                  <td className="text-xs whitespace-nowrap">{t.team}</td>
                  <td className="whitespace-nowrap">{t.zone}</td>
                  <td className="text-xs text-slate-400 whitespace-nowrap">{t.dueDate}</td>
                  <td className="min-w-[130px]"><Progress value={t.progress} tone={t.status === 'متأخرة' ? 'red' : t.status === 'مكتملة' ? 'emerald' : 'navy'} size="xs" showValue /></td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div className="flex gap-1.5">
                      <button onClick={() => setSelected(t)} className="h-8 w-8 rounded-lg bg-navy-100 text-navy-800 dark:bg-navy-800/60 dark:text-navy-200 hover:bg-navy-200 transition-colors" title="عرض">
                        <i className="fa-solid fa-eye text-xs" />
                      </button>
                      <button className="h-8 w-8 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 hover:bg-emerald-200 transition-colors" title="إغلاق المهمة">
                        <i className="fa-solid fa-lock text-xs" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      )}

      {/* إنشاء مهمة */}
      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="إنشاء مهمة ميدانية جديدة"
        subtitle="ستظهر فوراً للفريق المُكلف"
        icon="fa-solid fa-list-check"
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>إلغاء</Button>
            <Button icon="fa-solid fa-paper-plane" onClick={() => setCreateOpen(false)}>إنشاء وتكليف</Button>
          </>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="عنوان المهمة" required className="sm:col-span-2">
            <Input placeholder="مثال: فك انسداد بالوعة تقاطع شارع 24" icon="fa-solid fa-heading" />
          </Field>
          <Field label="نوع المهمة" required>
            <Select options={REPORT_TYPES} />
          </Field>
          <Field label="الأولوية" required>
            <Select options={PRIORITIES} defaultValue="عالية" />
          </Field>
          <Field label="الفريق المُكلف" required>
            <Select options={TEAMS.map((t) => t.name)} />
          </Field>
          <Field label="المفتش / المنفّذ">
            <Select options={['— بدون تعيين —', ...INSPECTORS.map((i) => i.name)]} />
          </Field>
          <Field label="الحي">
            <Select options={ZONES} />
          </Field>
          <Field label="تاريخ الاستحقاق" required>
            <Input type="datetime-local" defaultValue="2026-10-14T12:00" />
          </Field>
          <Field label="القسم المسؤول">
            <Select options={DEPARTMENTS} />
          </Field>
          <Field label="البلاغ المرتبط">
            <Select options={['— بدون ربط —', 'BR-2026-1042', 'BR-2026-1041', 'BR-2026-1037', 'BR-2026-1039']} />
          </Field>
          <Field label="وصف التنفيذ المطلوب" className="sm:col-span-2">
            <Textarea rows={3} placeholder="تفاصيل الأعمال والتعليمات السلوكية..." />
          </Field>
        </div>
      </Modal>

      {/* تفاصيل المهمة */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? `${selected.id} — ${selected.title}` : ''}
        subtitle={selected ? `${selected.team} • ${selected.zone}` : ''}
        icon="fa-solid fa-clipboard-check"
        size="2xl"
        footer={
          selected && (
            <>
              <Badge tone={taskTone(selected.status)} className="ms-auto">{selected.status}</Badge>
              <Button variant="outline" icon="fa-solid fa-camera">رفع صور</Button>
              <Button variant="outline" icon="fa-solid fa-user-plus">إعادة تعيين</Button>
              <Button variant="success" icon="fa-solid fa-lock">إغلاق المهمة</Button>
            </>
          )
        }
      >
        {selected && (
          <div className="space-y-5 animate-fade-in">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                ['المنفّذ', selected.assignee],
                ['الفريق', selected.team],
                ['النوع', selected.type],
                ['الأولوية', selected.priority],
                ['تاريخ الإنشاء', selected.createdAt],
                ['الاستحقاق', selected.dueDate],
                ['الحي', selected.zone],
                ['البلاغ المرتبط', selected.reportId ?? '—'],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3">
                  <p className="text-[10px] font-bold text-slate-400 mb-1">{k}</p>
                  <p className="text-[12px] font-extrabold text-slate-700 dark:text-slate-200 leading-snug">{v}</p>
                </div>
              ))}
            </div>

            <Progress label="نسبة إنجاز المهمة" value={selected.progress} tone={selected.status === 'متأخرة' ? 'red' : 'emerald'} size="md" showValue />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                <p className="text-xs font-extrabold text-slate-500 dark:text-slate-400 mb-3">
                  <i className="fa-solid fa-list-check ms-1.5 text-emerald-500" />
                  قائمة التحقق ({done.length}/{CHECKLIST.length})
                </p>
                <div className="space-y-2.5">
                  {CHECKLIST.map((c, i) => (
                    <label key={c} className="flex items-center gap-3 cursor-pointer group">
                      <span
                        onClick={() => setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]))}
                        className={`h-5 w-5 rounded-md border-2 flex items-center justify-center text-[10px] transition-colors ${
                          done.includes(i) ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 dark:border-slate-600 group-hover:border-emerald-400'
                        }`}
                      >
                        {done.includes(i) && <i className="fa-solid fa-check" />}
                      </span>
                      <span className={`text-[13px] font-bold ${done.includes(i) ? 'text-slate-400 line-through' : 'text-slate-600 dark:text-slate-300'}`}>{c}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                <p className="text-xs font-extrabold text-slate-500 dark:text-slate-400 mb-3">
                  <i className="fa-solid fa-image ms-1.5 text-violet-500" />
                  صور الإنجاز المرفوعة
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="aspect-square rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center text-slate-400 hover:scale-105 transition-transform cursor-pointer">
                      <i className="fa-solid fa-image" />
                    </div>
                  ))}
                  <button className="aspect-square rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:border-violet-400 hover:text-violet-500 transition-colors">
                    <i className="fa-solid fa-plus" />
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 mt-2">تُحفظ الصور في مركز الوثائق تلقائياً مع بيانات الموقع</p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <p className="text-xs font-extrabold text-slate-500 dark:text-slate-400 mb-3">
                <i className="fa-solid fa-comment-dots ms-1.5 text-sky-500" />
                ملاحظات التنفيذ
              </p>
              <div className="flex gap-3">
                <Avatar name={selected.assignee} size="sm" tone="sky" />
                <div className="flex-1">
                  <Textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="أضف ملاحظة عن سير العمل..." />
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" icon="fa-solid fa-paper-plane">إضافة الملاحظة</Button>
                    <Button size="sm" variant="ghost" icon="fa-solid fa-location-crosshairs">مشاركة الموقع</Button>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex gap-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3">
                  <Avatar name={selected.assignee} size="xs" tone="navy" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[12px] font-extrabold text-slate-700 dark:text-slate-200">{selected.assignee}</p>
                      <span className="text-[10px] text-slate-400">اليوم 09:40</span>
                    </div>
                    <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-1">تم الوصول للموقع وبدأ العمل وفق الخطة.</p>
                  </div>
                </div>
                <div className="flex gap-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3">
                  <Avatar name="غرفة العمليات" size="xs" tone="emerald" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[12px] font-extrabold text-slate-700 dark:text-slate-200">غرفة العمليات</p>
                      <span className="text-[10px] text-slate-400">اليوم 09:12</span>
                    </div>
                    <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-1">توثيق بالصور كل 15 دقيقة حتى انتهاء الأعمال.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
