import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CardHeader,
  Field,
  Input,
  Modal,
  MapView,
  PageHeader,
  Pagination,
  Progress,
  Select,
  StatCard,
  Table,
  Tabs,
  Timeline,
  priorityTone,
  reportStatusTone,
  severityTone,
} from '../components';
import { DEPARTMENTS, PRIORITIES, REPORTS, REPORT_STATUSES, REPORT_TYPES, SEVERITIES, ZONES, type Report } from '../data';

const PER_PAGE = 8;

export default function Reports() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('الكل');
  const [severity, setSeverity] = useState('الكل');
  const [priority, setPriority] = useState('الكل');
  const [zone, setZone] = useState('الكل');
  const [type, setType] = useState('الكل');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Report | null>(null);
  const [tab, setTab] = useState('data');

  const filtered = useMemo(() => {
    return REPORTS.filter((r) => {
      const q = search.trim();
      const matchQ =
        !q ||
        r.id.includes(q) ||
        r.type.includes(q) ||
        r.reporter.includes(q) ||
        r.address.includes(q) ||
        r.zone.includes(q);
      return (
        matchQ &&
        (status === 'الكل' || r.status === status) &&
        (severity === 'الكل' || r.severity === severity) &&
        (priority === 'الكل' || r.priority === priority) &&
        (zone === 'الكل' || r.zone === zone) &&
        (type === 'الكل' || r.type === type)
      );
    });
  }, [search, status, severity, priority, zone, type]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const rows = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const reset = () => {
    setSearch('');
    setStatus('الكل');
    setSeverity('الكل');
    setPriority('الكل');
    setZone('الكل');
    setType('الكل');
    setPage(1);
  };

  const stats = {
    total: filtered.length,
    critical: filtered.filter((r) => r.severity === 'حرج').length,
    open: filtered.filter((r) => r.status === 'قيد التنفيذ').length,
    closed: filtered.filter((r) => r.status === 'مغلق').length,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="البلاغات والطلبات"
        subtitle="متابعة جميع البلاغات الواردة وحالاتها والأقسام المسؤولة"
        icon="fa-solid fa-file-lines"
        actions={
          <>
            <Button variant="outline" icon="fa-solid fa-file-excel">Excel</Button>
            <Button variant="outline" icon="fa-solid fa-file-pdf">PDF</Button>
            <Button icon="fa-solid fa-plus">بلاغ جديد</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="إجمالي المعروض" value={stats.total} icon="fa-solid fa-filter" tone="navy" sub="نتائج مطابقة للمرشحات" />
        <StatCard label="بلاغات حرجة" value={stats.critical} icon="fa-solid fa-triangle-exclamation" tone="red" sub="تتطلب تدخلاً فورياً" />
        <StatCard label="قيد التنفيذ" value={stats.open} icon="fa-solid fa-spinner" tone="amber" sub="مهمات مفتوحة" />
        <StatCard label="بلاغات مغلقة" value={stats.closed} icon="fa-solid fa-circle-check" tone="emerald" sub="مكتملة" />
      </div>

      {/* الفلاتر */}
      <Card className="p-4 sm:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          <Field label="بحث سريع" className="xl:col-span-1">
            <Input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="رقم البلاغ، النوع، الحي..." icon="fa-solid fa-magnifying-glass" />
          </Field>
          <Field label="الحالة">
            <Select options={['الكل', ...REPORT_STATUSES]} value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} />
          </Field>
          <Field label="درجة الخطورة">
            <Select options={['الكل', ...SEVERITIES]} value={severity} onChange={(e) => { setSeverity(e.target.value); setPage(1); }} />
          </Field>
          <Field label="الأولوية">
            <Select options={['الكل', ...PRIORITIES]} value={priority} onChange={(e) => { setPriority(e.target.value); setPage(1); }} />
          </Field>
          <Field label="الحي">
            <Select options={['الكل', ...ZONES]} value={zone} onChange={(e) => { setZone(e.target.value); setPage(1); }} />
          </Field>
          <Field label="نوع البلاغ">
            <Select options={['الكل', ...REPORT_TYPES]} value={type} onChange={(e) => { setType(e.target.value); setPage(1); }} />
          </Field>
        </div>
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <span className="text-[11px] font-bold text-slate-400">
            <i className="fa-solid fa-circle-filter ms-1" />
            {filtered.length} بلاغ مطابق
          </span>
          <Button variant="ghost" size="sm" icon="fa-solid fa-rotate-left" onClick={reset}>إعادة ضبط المرشحات</Button>
          <div className="ms-auto flex gap-2">
            <Button variant="outline" size="sm" icon="fa-solid fa-calendar">هذا الشهر</Button>
            <Button variant="outline" size="sm" icon="fa-solid fa-arrow-down-wide-short">الأحدث</Button>
          </div>
        </div>
      </Card>

      {/* الجدول */}
      <Card className="overflow-hidden">
        <CardHeader
          title="سجل البلاغات"
          subtitle="اضغط على أي صف لعرض التفاصيل الكاملة"
          icon="fa-solid fa-table-list"
          action={<Badge tone="info">{filtered.length} سجل</Badge>}
        />
        <Table>
          <thead>
            <tr>
              <th>رقم البلاغ</th>
              <th>النوع</th>
              <th>الخطورة</th>
              <th>الأولوية</th>
              <th>الحالة</th>
              <th>الحي</th>
              <th>القسم المسؤول</th>
              <th>القناة</th>
              <th>تاريخ الإنشاء</th>
              <th>المرفقات</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="cursor-pointer" onClick={() => { setSelected(r); setTab('data'); }}>
                <td className="font-extrabold text-navy-800 dark:text-navy-300 whitespace-nowrap">{r.id}</td>
                <td className="max-w-[200px] truncate">{r.type}</td>
                <td><Badge tone={severityTone(r.severity)} dot={r.severity === 'حرج'} pulse={r.severity === 'حرج'}>{r.severity}</Badge></td>
                <td><Badge tone={priorityTone(r.priority)}>{r.priority}</Badge></td>
                <td><Badge tone={reportStatusTone(r.status)}>{r.status}</Badge></td>
                <td className="whitespace-nowrap">{r.zone}</td>
                <td className="whitespace-nowrap text-xs">{r.department}</td>
                <td className="whitespace-nowrap text-xs">{r.channel}</td>
                <td className="text-xs text-slate-400 whitespace-nowrap">{r.createdAt}</td>
                <td className="whitespace-nowrap text-xs">
                  <span className="text-slate-400"><i className="fa-solid fa-image ms-1" />{r.photos}</span>
                  <span className="text-slate-400 ms-2"><i className="fa-solid fa-video ms-1" />{r.videos}</span>
                  <span className="text-slate-400 ms-2"><i className="fa-solid fa-paperclip ms-1" />{r.attachments}</span>
                </td>
                <td onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => setSelected(r)} className="h-8 w-8 rounded-lg bg-navy-100 text-navy-800 dark:bg-navy-800/60 dark:text-navy-200 hover:bg-navy-200 transition-colors" title="عرض">
                      <i className="fa-solid fa-eye text-xs" />
                    </button>
                    <button className="h-8 w-8 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 hover:bg-emerald-200 transition-colors" title="تكليف فريق">
                      <i className="fa-solid fa-user-plus text-xs" />
                    </button>
                    <button className="h-8 w-8 rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300 hover:bg-amber-200 transition-colors" title="إغلاق البلاغ">
                      <i className="fa-solid fa-lock text-xs" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={11}>
                  <div className="text-center py-10">
                    <i className="fa-solid fa-inbox text-3xl text-slate-300 dark:text-slate-600 mb-3 block" />
                    <p className="text-sm font-extrabold text-slate-500">لا توجد بلاغات مطابقة للمرشحات</p>
                    <button onClick={reset} className="text-xs font-bold text-navy-700 dark:text-emerald-400 mt-2">إعادة ضبط البحث</button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <Pagination page={current} totalPages={totalPages} onChange={setPage} total={filtered.length} />
      </Card>

      {/* نافذة تفاصيل البلاغ */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? `${selected.id} — ${selected.type}` : ''}
        subtitle={selected ? `${selected.zone} • ${selected.address}` : ''}
        icon="fa-solid fa-file-lines"
        size="2xl"
        footer={
          selected && (
            <>
              <Badge tone={reportStatusTone(selected.status)} className="ms-auto">{selected.status}</Badge>
              <Button variant="outline" icon="fa-solid fa-paper-plane">تكليف فريق</Button>
              <Button variant="success" icon="fa-solid fa-check">اعتماد وتحديث الحالة</Button>
            </>
          )
        }
      >
        {selected && (
          <div className="space-y-5">
            <Tabs
              active={tab}
              onChange={setTab}
              tabs={[
                { id: 'data', label: 'البيانات الأساسية', icon: 'fa-solid fa-circle-info' },
                { id: 'map', label: 'الموقع والصور', icon: 'fa-solid fa-map-location-dot' },
                { id: 'ai', label: 'تحليل الذكاء', icon: 'fa-solid fa-brain' },
                { id: 'log', label: 'سجل الحركة', icon: 'fa-solid fa-timeline' },
              ]}
            />

            {tab === 'data' && (
              <div className="animate-fade-in space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    ['رقم البلاغ', selected.id],
                    ['النوع', selected.type],
                    ['درجة الخطورة', selected.severity],
                    ['الأولوية', selected.priority],
                    ['الحالة', selected.status],
                    ['الحي', selected.zone],
                    ['القسم المسؤول', selected.department],
                    ['الفريق المكلف', selected.team ?? 'لم يُكلف بعد'],
                    ['مقدم البلاغ', selected.reporter],
                    ['القناة', selected.channel],
                    ['تاريخ الإنشاء', selected.createdAt],
                    ['الإحداثيات', `${selected.lat}, ${selected.lng}`],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3">
                      <p className="text-[10px] font-bold text-slate-400 mb-1">{k}</p>
                      <p className="text-[12px] font-extrabold text-slate-700 dark:text-slate-200 leading-snug">{v}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                  <p className="text-xs font-extrabold text-slate-500 dark:text-slate-400 mb-2">وصف البلاغ</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{selected.description}</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { k: 'الصور', v: selected.photos, icon: 'fa-solid fa-image', tone: 'text-violet-500' },
                    { k: 'الفيديو', v: selected.videos, icon: 'fa-solid fa-video', tone: 'text-amber-500' },
                    { k: 'المرفقات', v: selected.attachments, icon: 'fa-solid fa-paperclip', tone: 'text-sky-500' },
                  ].map((m) => (
                    <div key={m.k} className="rounded-xl border border-slate-200 dark:border-slate-700 p-3 text-center">
                      <i className={`${m.icon} ${m.tone} text-lg`} />
                      <p className="text-lg font-extrabold text-slate-700 dark:text-slate-200 mt-1">{m.v}</p>
                      <p className="text-[10px] font-bold text-slate-400">{m.k}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'map' && (
              <div className="animate-fade-in space-y-4">
                <MapView
                  height={300}
                  zoom={15}
                  center={[selected.lat, selected.lng]}
                  markers={[{ id: selected.id, lat: selected.lat, lng: selected.lng, title: selected.id, kind: selected.severity === 'حرج' ? 'critical' : 'report', label: selected.type, popup: selected.address }]}
                  legend={[{ label: 'موقع البلاغ', color: selected.severity === 'حرج' ? '#ef4444' : '#f59e0b' }]}
                />
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3">
                    <p className="text-[10px] font-bold text-slate-400 mb-1">العنوان</p>
                    <p className="text-[13px] font-extrabold text-slate-700 dark:text-slate-200">{selected.address}</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3">
                    <p className="text-[10px] font-bold text-slate-400 mb-1">الإحداثيات</p>
                    <p className="text-[13px] font-extrabold text-slate-700 dark:text-slate-200 font-display">{selected.lat} , {selected.lng}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['صورة الموقع 1', 'صورة الموقع 2', 'فيديو ميداني', 'ملف مرفق'].map((p, i) => (
                    <div key={p} className="rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 h-24 flex flex-col items-center justify-center text-slate-400 hover:border-navy-400 transition-colors cursor-pointer">
                      <i className={`fa-solid ${i === 2 ? 'fa-play-circle' : i === 3 ? 'fa-file-pdf' : 'fa-image'} text-xl`} />
                      <span className="text-[10px] font-bold mt-1.5">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'ai' && (
              <div className="animate-fade-in grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-violet-50 dark:bg-violet-500/10 ring-1 ring-inset ring-violet-200 dark:ring-violet-500/30 p-4">
                  <p className="text-xs font-extrabold text-violet-800 dark:text-violet-300 mb-1">التصنيف الآلي ({selected.ai.confidence}%)</p>
                  <p className="text-sm font-extrabold text-slate-800 dark:text-slate-100 mb-2">{selected.ai.classification}</p>
                  <Progress value={selected.ai.confidence} tone="violet" size="xs" />
                </div>
                {selected.ai.duplicateOf && (
                  <div className="rounded-xl bg-amber-50 dark:bg-amber-500/10 ring-1 ring-inset ring-amber-200 dark:ring-amber-500/30 p-4">
                    <p className="text-xs font-extrabold text-amber-800 dark:text-amber-300 mb-1">بلاغ مكرر محتمل</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">يطابق البلاغ {selected.ai.duplicateOf}</p>
                  </div>
                )}
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-2.5">
                  {[
                    ['الأولوية المقترحة', selected.ai.suggestedPriority],
                    ['الإدارة المقترحة', selected.ai.suggestedDepartment],
                    ['الفريق المقترح', selected.ai.suggestedTeam],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-400">{k}</span>
                      <span className="text-[12px] font-extrabold text-slate-700 dark:text-slate-200">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl bg-emerald-50 dark:bg-emerald-500/10 ring-1 ring-inset ring-emerald-200 dark:ring-emerald-500/30 p-4">
                  <p className="text-xs font-extrabold text-emerald-800 dark:text-emerald-300 mb-1.5">الملخص التلقائي</p>
                  <p className="text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed">{selected.ai.summary}</p>
                </div>
                {(selected.ai.ocrText || selected.ai.initialReport) && (
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-4 sm:col-span-2">
                    <p className="text-xs font-extrabold text-slate-500 dark:text-slate-400 mb-1.5">النص الخام / OCR</p>
                    <p className="text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed">{selected.ai.ocrText ?? selected.ai.initialReport}</p>
                  </div>
                )}
              </div>
            )}

            {tab === 'log' && (
              <div className="animate-fade-in">
                <Timeline
                  items={[
                    { id: 'l1', time: selected.createdAt.split(' ')[1], title: 'استلام البلاغ', description: `عبر ${selected.channel}`, icon: 'fa-solid fa-inbox', tone: 'navy' },
                    { id: 'l2', time: '+3 د', title: 'تصنيف آلي بالذكاء الاصطناعي', description: `${selected.ai.classification} — ثقة ${selected.ai.confidence}%`, icon: 'fa-solid fa-robot', tone: 'violet' },
                    { id: 'l3', time: '+8 د', title: 'مراجعة موظف الاستقبال', description: 'تأكيد البيانات وإسناد القسم', icon: 'fa-solid fa-user-check', tone: 'sky' },
                    { id: 'l4', time: '+15 د', title: selected.team ? `تكليف ${selected.team}` : 'بانتظار تكليف فريق', icon: 'fa-solid fa-people-group', tone: selected.team ? 'emerald' : 'amber' },
                    { id: 'l5', time: 'الآن', title: `الحالة الحالية: ${selected.status}`, icon: 'fa-solid fa-flag-checkered', tone: selected.status === 'مغلق' ? 'emerald' : 'amber' },
                  ]}
                />
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
