import { useMemo, useState } from 'react';
import { Badge, Button, Card, CardHeader, PageHeader, StatCard, Tabs, Toggle } from '../components';
import { NOTIFICATIONS, type AppNotification } from '../data';

const typeMeta: Record<AppNotification['type'], { label: string; icon: string; cls: string }> = {
  alert: { label: 'تنبيه حرج', icon: 'fa-solid fa-triangle-exclamation', cls: 'bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-300' },
  task: { label: 'مهمة', icon: 'fa-solid fa-list-check', cls: 'bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300' },
  report: { label: 'بلاغ', icon: 'fa-solid fa-file-lines', cls: 'bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300' },
  message: { label: 'رسالة', icon: 'fa-solid fa-comment', cls: 'bg-sky-100 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300' },
  system: { label: 'نظام', icon: 'fa-solid fa-gear', cls: 'bg-slate-100 text-slate-500 dark:bg-slate-700/60 dark:text-slate-300' },
};

export default function Notifications() {
  const [items, setItems] = useState<AppNotification[]>(NOTIFICATIONS);
  const [tab, setTab] = useState('all');
  const [prefs, setPrefs] = useState({ inApp: true, email: true, sms: false, critical24: true, daily: true, ai: true });

  const list = useMemo(() => {
    if (tab === 'unread') return items.filter((n) => !n.read);
    if (tab === 'alerts') return items.filter((n) => n.type === 'alert');
    if (tab === 'tasks') return items.filter((n) => n.type === 'task');
    if (tab === 'system') return items.filter((n) => n.type === 'system');
    return items;
  }, [items, tab]);

  const unread = items.filter((n) => !n.read).length;

  const markAll = () => setItems((arr) => arr.map((n) => ({ ...n, read: true })));
  const markOne = (id: string) => setItems((arr) => arr.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const remove = (id: string) => setItems((arr) => arr.filter((n) => n.id !== id));

  return (
    <div className="space-y-6">
      <PageHeader
        title="الإشعارات"
        subtitle="مركز التنبيهات الفورية لكل الأحداث والمهام وتحديثات النظام"
        icon="fa-solid fa-bell"
        badge={unread > 0 ? <Badge tone="critical" dot pulse>{unread} جديدة</Badge> : undefined}
        actions={
          <>
            <Button variant="outline" icon="fa-solid fa-check-double" onClick={markAll}>تعليم الكل كمقروء</Button>
            <Button variant="outline" icon="fa-solid fa-gear">الإعدادات</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="غير مقروءة" value={unread} icon="fa-solid fa-envelope-open" tone="red" sub="تحتاج انتباهك" />
        <StatCard label="تنبيهات حرجة" value={items.filter((n) => n.type === 'alert').length} icon="fa-solid fa-triangle-exclamation" tone="amber" sub="أولوية قصوى" />
        <StatCard label="إشعارات المهام" value={items.filter((n) => n.type === 'task').length} icon="fa-solid fa-list-check" tone="sky" sub="مهام ومواعيد" />
        <StatCard label="إجمالي الإشعارات" value={items.length} icon="fa-solid fa-bell" tone="navy" sub="خلال 48 ساعة" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <Card className="xl:col-span-3 overflow-hidden">
          <div className="px-5 pt-5 pb-3 flex items-center justify-between gap-3 flex-wrap">
            <Tabs
              active={tab}
              onChange={setTab}
              tabs={[
                { id: 'all', label: 'الكل', count: items.length },
                { id: 'unread', label: 'غير مقروءة', count: unread },
                { id: 'alerts', label: 'حرجة', count: items.filter((n) => n.type === 'alert').length },
                { id: 'tasks', label: 'المهام', count: items.filter((n) => n.type === 'task').length },
                { id: 'system', label: 'النظام', count: items.filter((n) => n.type === 'system').length },
              ]}
            />
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 border-t border-slate-100 dark:border-slate-800">
            {list.map((n) => {
              const meta = typeMeta[n.type];
              return (
                <div key={n.id} className={`flex items-start gap-4 px-5 py-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40 ${n.read ? 'opacity-60' : ''}`}>
                  <span className={`icon-box h-11 w-11 text-base shrink-0 ${meta.cls}`}>
                    <i className={meta.icon} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-[13px] font-extrabold text-slate-800 dark:text-slate-100">{n.title}</p>
                      <Badge tone={n.type === 'alert' ? 'critical' : n.type === 'task' ? 'medium' : n.type === 'report' ? 'violet' : 'info'}>{meta.label}</Badge>
                      {!n.read && <span className="h-2 w-2 rounded-full bg-navy-700 dark:bg-emerald-400" />}
                    </div>
                    <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{n.body}</p>
                    <p className="text-[10px] text-slate-400 mt-1.5">
                      <i className="fa-regular fa-clock ms-1" />
                      {n.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {!n.read && (
                      <button onClick={() => markOne(n.id)} className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-emerald-500 hover:text-white transition-colors" title="تعليم كمقروء">
                        <i className="fa-solid fa-check text-xs" />
                      </button>
                    )}
                    <button onClick={() => remove(n.id)} className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-red-500 hover:text-white transition-colors" title="حذف">
                      <i className="fa-solid fa-trash text-xs" />
                    </button>
                  </div>
                </div>
              );
            })}
            {list.length === 0 && (
              <div className="text-center py-14">
                <i className="fa-solid fa-bell-slash text-3xl text-slate-300 dark:text-slate-600 mb-3 block" />
                <p className="text-sm font-extrabold text-slate-500">لا توجد إشعارات في هذا التصنيف</p>
              </div>
            )}
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader title="تفضيلات الإشعارات" subtitle="اختر قنوات التنبيه" icon="fa-solid fa-sliders" tone="violet" />
            <div className="px-5 pb-5 space-y-4">
              <Toggle checked={prefs.inApp} onChange={(v) => setPrefs({ ...prefs, inApp: v })} label="داخل المنصة" description="تنبيهات فورية في الواجهة" />
              <div className="divider" />
              <Toggle checked={prefs.email} onChange={(v) => setPrefs({ ...prefs, email: v })} label="البريد الإلكتروني" description="ملخص إلى البريد الرسمي" />
              <div className="divider" />
              <Toggle checked={prefs.sms} onChange={(v) => setPrefs({ ...prefs, sms: v })} label="الرسائل النصية" description="للتنبيهات الحرجة فقط" />
              <div className="divider" />
              <Toggle checked={prefs.critical24} onChange={(v) => setPrefs({ ...prefs, critical24: v })} label="تنبيهات حرجة 24/7" description="على مدار الساعة دون كتم" />
              <div className="divider" />
              <Toggle checked={prefs.daily} onChange={(v) => setPrefs({ ...prefs, daily: v })} label="الملخص اليومي" description="يُرسل الساعة 07:00 صباحاً" />
              <div className="divider" />
              <Toggle checked={prefs.ai} onChange={(v) => setPrefs({ ...prefs, ai: v })} label="تنبيهات الذكاء الاصطناعي" description="تكرار البلاغات واقتراحات الأولوية" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-navy-950 to-navy-900 !border-transparent text-white">
            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="icon-box h-10 w-10 bg-white/10">
                  <i className="fa-solid fa-shield-halved" />
                </span>
                <div>
                  <p className="text-sm font-extrabold">وضع عدم الإزعاج</p>
                  <p className="text-[11px] text-slate-300">كتم الإشعارات غير الحرجة</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="success">تفعيل الوضع</Button>
                <span className="text-[10px] text-slate-300">إلغاء تلقائياً بعد 2 ساعة</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
