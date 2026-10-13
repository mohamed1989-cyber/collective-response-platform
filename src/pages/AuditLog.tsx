import { useMemo, useState } from 'react';
import { Badge, Button, Card, CardHeader, Field, Input, Modal, PageHeader, Pagination, Select, StatCard, Table } from '../components';
import { AUDIT_LOGS, type AuditEntry } from '../data';

const PER_PAGE = 8;

function statusTone(status: string) {
  if (status === 'ناجح') return 'success' as const;
  if (status === 'فشل') return 'critical' as const;
  return 'closed' as const;
}

const MODULES = ['الكل', 'المصادقة', 'البلاغات والطلبات', 'المهام الميدانية', 'إدارة الحوادث', 'مركز الوثائق', 'المستخدمون والصلاحيات', 'التقارير', 'الذكاء الاصطناعي', 'النظام'];
const STATUSES = ['الكل', 'ناجح', 'فشل', 'محظور'];

export default function AuditLog() {
  const [search, setSearch] = useState('');
  const [module, setModule] = useState('الكل');
  const [status, setStatus] = useState('الكل');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<AuditEntry | null>(null);

  const filtered = useMemo(
    () =>
      AUDIT_LOGS.filter(
        (e) =>
          (!search.trim() || e.user.includes(search) || e.action.includes(search) || e.ip.includes(search)) &&
          (module === 'الكل' || e.module === module) &&
          (status === 'الكل' || e.status === status),
      ),
    [search, module, status],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const rows = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="space-y-6">
      <PageHeader
        title="سجل العمليات"
        subtitle="تتبع شامل لكل عمليات النظام (Audit Log) لأغراض التدقيق والأمان"
        icon="fa-solid fa-clock-rotate-left"
        tone="amber"
        actions={
          <>
            <Button variant="outline" icon="fa-solid fa-file-excel">تصدير Excel</Button>
            <Button variant="outline" icon="fa-solid fa-file-pdf">تصدير PDF</Button>
            <Button icon="fa-solid fa-bell">إنشاء تنبيه</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="عمليات اليوم" value={AUDIT_LOGS.length} icon="fa-solid fa-list-ol" tone="navy" sub="كل الوحدات" />
        <StatCard label="محاولات دخول فاشلة" value={AUDIT_LOGS.filter((e) => e.status === 'فشل').length} icon="fa-solid fa-user-lock" tone="red" sub="آخر 24 ساعة" />
        <StatCard label="عناوين محظورة" value={AUDIT_LOGS.filter((e) => e.status === 'محظور').length} icon="fa-solid fa-ban" tone="amber" sub="تهديدات محتملة" />
        <StatCard label="مستخدمون نشطون" value={6} icon="fa-solid fa-satellite-dish" tone="emerald" sub="جلسات مفتوحة الآن" />
      </div>

      <Card className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Field label="بحث">
            <Input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="مستخدم، عملية، عنوان IP..." icon="fa-solid fa-magnifying-glass" />
          </Field>
          <Field label="الوحدة">
            <Select options={MODULES} value={module} onChange={(e) => { setModule(e.target.value); setPage(1); }} />
          </Field>
          <Field label="الحالة">
            <Select options={STATUSES} value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} />
          </Field>
          <Field label="الفترة الزمنية">
            <Select options={['اليوم', 'آخر 7 أيام', 'آخر 30 يوماً', 'السنة الحالية']} />
          </Field>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader
          title="سجل العمليات التفصيلي"
          subtitle="مرتب من الأحدث إلى الأقدم"
          icon="fa-solid fa-table-list"
          action={<Badge tone="info">{filtered.length} عملية</Badge>}
        />
        <Table>
          <thead>
            <tr>
              <th>الوقت</th>
              <th>المستخدم</th>
              <th>العملية</th>
              <th>الوحدة</th>
              <th>عنوان IP</th>
              <th>الجهاز</th>
              <th>الحالة</th>
              <th>تفاصيل</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((e) => (
              <tr key={e.id} className="cursor-pointer" onClick={() => setSelected(e)}>
                <td className="text-xs text-slate-400 whitespace-nowrap font-bold" dir="ltr">{e.time}</td>
                <td className="font-extrabold text-slate-700 dark:text-slate-200 whitespace-nowrap">{e.user}</td>
                <td className="min-w-[260px]">{e.action}</td>
                <td><Badge tone="neutral">{e.module}</Badge></td>
                <td className="text-xs whitespace-nowrap" dir="ltr">{e.ip}</td>
                <td className="text-xs text-slate-400 whitespace-nowrap">{e.device}</td>
                <td><Badge tone={statusTone(e.status)} dot>{e.status}</Badge></td>
                <td>
                  <button className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-navy-950 hover:text-white transition-colors" title="عرض">
                    <i className="fa-solid fa-eye text-xs" />
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-10">
                  <i className="fa-solid fa-database text-3xl text-slate-300 dark:text-slate-600 mb-3 block" />
                  <p className="text-sm font-extrabold text-slate-500">لا توجد عمليات مطابقة</p>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <Pagination page={Math.min(page, totalPages)} totalPages={totalPages} onChange={setPage} total={filtered.length} />
      </Card>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title="تفاصيل العملية"
        subtitle={selected?.id ?? ''}
        icon="fa-solid fa-fingerprint"
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setSelected(null)}>إغلاق</Button>
            <Button variant="outline" icon="fa-solid fa-copy">نسخ JSON</Button>
          </>
        }
      >
        {selected && (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-2 gap-3">
              {[
                ['الوقت', selected.time],
                ['المستخدم', selected.user],
                ['الوحدة', selected.module],
                ['الحالة', selected.status],
                ['عنوان IP', selected.ip],
                ['الجهاز', selected.device],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3">
                  <p className="text-[10px] font-bold text-slate-400 mb-1">{k}</p>
                  <p className="text-[12px] font-extrabold text-slate-700 dark:text-slate-200" dir={k === 'عنوان IP' ? 'ltr' : undefined}>{v}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <p className="text-xs font-extrabold text-slate-500 dark:text-slate-400 mb-2">وصف العملية</p>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{selected.action}</p>
            </div>
            <div className="rounded-xl bg-slate-900 text-emerald-300 p-4 text-xs leading-relaxed overflow-x-auto" dir="ltr">
              <pre>{JSON.stringify({ id: selected.id, timestamp: selected.time, actor: selected.user, module: selected.module, ip: selected.ip, result: selected.status, traceId: 'trc_8f2a19c4e77b' }, null, 2)}</pre>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
