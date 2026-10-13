import { useState } from 'react';
import { Avatar, Badge, Button, Card, CardHeader, Field, Input, Modal, PageHeader, Select, StatCard, Table, Tabs, Toggle } from '../components';
import { PERM_LABEL, ROLE_LIST, USERS, permissionGrid, PERMISSION_ACTIONS, type AppUser } from '../data';

function statusTone(status: string) {
  if (status === 'نشط') return 'success' as const;
  if (status === 'موقوف') return 'critical' as const;
  return 'closed' as const;
}

const permTone = {
  full: 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/30',
  read: 'bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-500/15 dark:text-sky-300 dark:ring-sky-500/30',
  none: 'bg-slate-100 text-slate-400 ring-slate-200 dark:bg-slate-800 dark:text-slate-500 dark:ring-slate-700',
};

const permIcon = { full: 'fa-solid fa-circle-check', read: 'fa-solid fa-eye', none: 'fa-solid fa-minus' };

export default function Users() {
  const [tab, setTab] = useState('users');
  const [addOpen, setAddOpen] = useState(false);
  const [selected, setSelected] = useState<AppUser | null>(null);
  const [mfa, setMfa] = useState(true);
  const [lockPolicy, setLockPolicy] = useState(true);

  return (
    <div className="space-y-6">
      <PageHeader
        title="المستخدمون والصلاحيات"
        subtitle="إدارة الحسابات والأدوار ومصفوفة الصلاحيات وعامل التحقق MFA"
        icon="fa-solid fa-users-gear"
        actions={
          <>
            <Button variant="outline" icon="fa-solid fa-shield-halved">سياسات الأمان</Button>
            <Button variant="outline" icon="fa-solid fa-file-export">تصدير المستخدمين</Button>
            <Button icon="fa-solid fa-user-plus" onClick={() => setAddOpen(true)}>مستخدم جديد</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="إجمالي المستخدمين" value={USERS.length} icon="fa-solid fa-users" tone="navy" sub="جميع الحسابات" />
        <StatCard label="نشطون الآن" value={USERS.filter((u) => u.status === 'نشط').length} icon="fa-solid fa-user-check" tone="emerald" sub="جلسات فعالة" />
        <StatCard label="مع تحقق MFA" value={USERS.filter((u) => u.mfa).length} icon="fa-solid fa-lock" tone="sky" sub="مع تفعيل الخطوة الثانية" />
        <StatCard label="حسابات محظورة/موقوفة" value={USERS.filter((u) => u.status !== 'نشط').length} icon="fa-solid fa-user-slash" tone="red" sub="تحتاج مراجعة" />
      </div>

      <Tabs
        active={tab}
        onChange={setTab}
        tabs={[
          { id: 'users', label: 'المستخدمون', icon: 'fa-solid fa-users', count: USERS.length },
          { id: 'roles', label: 'الأدوار والصلاحيات', icon: 'fa-solid fa-user-shield', count: ROLE_LIST.length },
          { id: 'security', label: 'الدخول و MFA', icon: 'fa-solid fa-key' },
        ]}
      />

      {tab === 'users' && (
        <Card className="overflow-hidden animate-fade-in">
          <CardHeader
            title="دليل المستخدمين"
            subtitle="اضغط على أي مستخدم لعرض تفاصيل الحساب"
            icon="fa-solid fa-address-book"
            action={<Badge tone="info">{USERS.length} حساب</Badge>}
          />
          <Table>
            <thead>
              <tr>
                <th>المستخدم</th>
                <th>البريد الرسمي</th>
                <th>الدور</th>
                <th>الإدارة</th>
                <th>الحالة</th>
                <th>MFA</th>
                <th>آخر دخول</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {USERS.map((u) => (
                <tr key={u.id} className="cursor-pointer" onClick={() => setSelected(u)}>
                  <td>
                    <span className="flex items-center gap-2.5">
                      <Avatar name={u.name} size="sm" tone={u.status === 'نشط' ? 'navy' : 'slate'} />
                      <span className="min-w-0">
                        <span className="block font-extrabold text-slate-700 dark:text-slate-200 whitespace-nowrap">{u.name}</span>
                        <span className="block text-[10px] text-slate-400">{u.id}</span>
                      </span>
                    </span>
                  </td>
                  <td className="text-xs whitespace-nowrap" dir="ltr">{u.email}</td>
                  <td><Badge tone="violet">{u.role}</Badge></td>
                  <td className="whitespace-nowrap text-xs">{u.department}</td>
                  <td><Badge tone={statusTone(u.status)} dot>{u.status}</Badge></td>
                  <td>
                    {u.mfa ? (
                      <span className="text-emerald-600 dark:text-emerald-400" title="مفعّل">
                        <i className="fa-solid fa-shield-halved" />
                      </span>
                    ) : (
                      <span className="text-red-500" title="غير مفعّل">
                        <i className="fa-solid fa-shield-circle-xmark" />
                      </span>
                    )}
                  </td>
                  <td className="text-xs text-slate-400 whitespace-nowrap">{u.lastLogin}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div className="flex gap-1.5">
                      <button onClick={() => setSelected(u)} className="h-8 w-8 rounded-lg bg-navy-100 text-navy-800 dark:bg-navy-800/60 dark:text-navy-200 hover:bg-navy-200 transition-colors" title="تعديل">
                        <i className="fa-solid fa-pen text-xs" />
                      </button>
                      <button className="h-8 w-8 rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300 hover:bg-amber-200 transition-colors" title="إيقاف">
                        <i className="fa-solid fa-ban text-xs" />
                      </button>
                      <button className="h-8 w-8 rounded-lg bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-300 hover:bg-red-200 transition-colors" title="حذف">
                        <i className="fa-solid fa-trash text-xs" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      )}

      {tab === 'roles' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4">
            {ROLE_LIST.map((r, i) => (
              <Card key={r.id} hover className="p-4 text-center cursor-pointer">
                <span className={`icon-box h-12 w-12 mx-auto text-lg ${i === 0 ? 'bg-navy-950 text-white' : 'bg-navy-100 text-navy-800 dark:bg-navy-800/50 dark:text-navy-200'}`}>
                  <i className={i === 0 ? 'fa-solid fa-crown' : 'fa-solid fa-user-shield'} />
                </span>
                <p className="text-[13px] font-extrabold text-slate-700 dark:text-slate-200 mt-2.5">{r.name}</p>
                <p className="text-lg font-extrabold text-navy-800 dark:text-emerald-400 font-display">{r.users}</p>
                <p className="text-[10px] font-bold text-slate-400">مستخدم</p>
              </Card>
            ))}
          </div>

          <Card className="overflow-hidden">
            <CardHeader
              title="مصفوفة الصلاحيات"
              subtitle="صلاحيات كل دور على كل وحدة وظيفية"
              icon="fa-solid fa-table-cells"
              action={
                <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold">
                  <span className="chip bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/30">كاملة</span>
                  <span className="chip bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200 dark:bg-sky-500/15 dark:text-sky-300 dark:ring-sky-500/30">قراءة</span>
                  <span className="chip bg-slate-100 text-slate-400 ring-1 ring-inset ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">بدون</span>
                </div>
              }
            />
            <Table>
              <thead>
                <tr>
                  <th>الوحدة</th>
                  {ROLE_LIST.map((r) => (
                    <th key={r.id} className="text-center">{r.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {permissionGrid.map((row) => (
                  <tr key={row.module}>
                    <td className="font-extrabold text-slate-700 dark:text-slate-200 whitespace-nowrap">{row.module}</td>
                    {ROLE_LIST.map((r) => {
                      const level = row.access[r.id];
                      return (
                        <td key={r.id} className="text-center">
                          <span className={`chip mx-auto ring-1 ring-inset ${permTone[level]}`} title={PERM_LABEL[level]}>
                            <i className={`${permIcon[level]}`} />
                            <span className="hidden lg:inline">{level === 'full' ? 'كاملة' : level === 'read' ? 'قراءة' : '—'}</span>
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr>
                  <td className="font-extrabold text-slate-700 dark:text-slate-200">إجراءات متاحة</td>
                  <td colSpan={ROLE_LIST.length} className="text-center">
                    <div className="flex flex-wrap justify-center gap-1.5">
                      {PERMISSION_ACTIONS.map((a) => (
                        <span key={a} className="chip bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">{a}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </div>
      )}

      {tab === 'security' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
          <Card>
            <CardHeader title="التحقق الثنائي (MFA)" subtitle="حماية إضافية لحسابات المسؤولين" icon="fa-solid fa-mobile-screen-button" tone="emerald" />
            <div className="px-5 pb-5 space-y-4">
              <Toggle checked={mfa} onChange={setMfa} label="إلزام MFA لجميع المستخدمين" description="طلب رمز تحقق عند تسجيل الدخول" />
              <div className="divider" />
              <Toggle checked={lockPolicy} onChange={setLockPolicy} label="قفل الحساب بعد 5 محاولات" description="إيقاف تلقائي لمدة 15 دقيقة" />
              <div className="divider" />
              <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-4">
                <p className="text-xs font-extrabold text-slate-500 dark:text-slate-400 mb-3">الأجهزة المعتمدة</p>
                <div className="space-y-2.5">
                  {[
                    ['آيفون 14 — أحمد القيسي', 'اليوم 07:48'],
                    ['جهاز مكتبي — Chrome', 'اليوم 06:02'],
                    ['سامسونج S23 — بدر العتيبي', 'أمس 08:30'],
                  ].map(([d, t]) => (
                    <div key={d} className="flex items-center justify-between gap-3">
                      <span className="text-[12px] font-bold text-slate-600 dark:text-slate-300 flex items-center gap-2">
                        <i className="fa-solid fa-fingerprint text-navy-700 dark:text-emerald-400" />
                        {d}
                      </span>
                      <span className="text-[10px] text-slate-400">{t}</span>
                      <button className="text-[10px] font-bold text-red-500 hover:underline">إلغاء</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="سياسات كلمة المرور" subtitle="متطلبات الأمان المعتمدة" icon="fa-solid fa-key" tone="amber" />
            <div className="px-5 pb-5 space-y-3">
              {[
                ['الحد الأدنى للأحرف', '12 حرفاً'],
                ['تعقيد كلمة المرور', 'أحرف + أرقام + رموز'],
                ['صلاحية كلمة المرور', '90 يوماً'],
                ['منع إعادة الاستخدام', 'آخر 5 كلمات'],
                ['الجلسات النشطة', 'جلسة واحدة لكل جهاز'],
                ['انتهاء الجلسة', '30 دقيقة خمول'],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2.5">
                  <span className="text-[12px] font-bold text-slate-500 dark:text-slate-400">{k}</span>
                  <span className="text-[12px] font-extrabold text-slate-700 dark:text-slate-200">{v}</span>
                </div>
              ))}
              <Button variant="outline" block icon="fa-solid fa-pen">تعديل السياسات</Button>
            </div>
          </Card>
        </div>
      )}

      {/* مستخدم جديد */}
      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="إضافة مستخدم جديد"
        subtitle="سيتم إرسال دعوة إلى البريد الرسمي"
        icon="fa-solid fa-user-plus"
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setAddOpen(false)}>إلغاء</Button>
            <Button icon="fa-solid fa-paper-plane" onClick={() => setAddOpen(false)}>إرسال الدعوة</Button>
          </>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="الاسم الكامل" required>
            <Input placeholder="الاسم الرباعي" icon="fa-solid fa-user" />
          </Field>
          <Field label="البريد الرسمي" required>
            <Input placeholder="name@plan.gov.sa" icon="fa-solid fa-envelope" dir="ltr" />
          </Field>
          <Field label="الدور" required>
            <Select options={ROLE_LIST.map((r) => r.name)} />
          </Field>
          <Field label="الإدارة">
            <Select options={['إدارة التخطيط الحضري', 'غرفة العمليات', 'إدارة التفتيش والمتابعة', 'إدارة الصيانة', 'وحدة التحليلات']} />
          </Field>
          <Field label="رقم الجوال">
            <Input placeholder="05xxxxxxxx" icon="fa-solid fa-phone" dir="ltr" />
          </Field>
          <Field label="حالة الحساب">
            <Select options={['نشط', 'موقوف', 'غير متاح']} defaultValue="نشط" />
          </Field>
          <div className="sm:col-span-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 ring-1 ring-inset ring-emerald-200 dark:ring-emerald-500/30 p-4 flex items-start gap-3">
            <i className="fa-solid fa-shield-halved text-emerald-600 dark:text-emerald-400 mt-0.5" />
            <div>
              <p className="text-[13px] font-extrabold text-emerald-800 dark:text-emerald-300">تفعيل التحقق الثنائي إلزامياً</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">سيُطلب من المستخدم ضبط تطبيق المصادقة عند أول تسجيل دخول.</p>
            </div>
          </div>
        </div>
      </Modal>

      {/* ملف المستخدم */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name ?? ''}
        subtitle={selected ? `${selected.role} — ${selected.id}` : ''}
        icon="fa-solid fa-id-badge"
        footer={
          <>
            <Button variant="outline" onClick={() => setSelected(null)}>إغلاق</Button>
            <Button icon="fa-solid fa-pen">تعديل الحساب</Button>
          </>
        }
      >
        {selected && (
          <div className="space-y-5 animate-fade-in">
            <div className="flex items-center gap-4">
              <Avatar name={selected.name} size="lg" tone="navy" />
              <div>
                <p className="text-base font-extrabold text-slate-800 dark:text-slate-100">{selected.name}</p>
                <p className="text-xs text-slate-400" dir="ltr">{selected.email}</p>
                <div className="flex gap-2 mt-2">
                  <Badge tone={statusTone(selected.status)} dot>{selected.status}</Badge>
                  <Badge tone={selected.mfa ? 'success' : 'critical'}>{selected.mfa ? 'MFA مفعّل' : 'MFA غير مفعّل'}</Badge>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ['الدور', selected.role],
                ['الإدارة', selected.department],
                ['الجوال', selected.phone],
                ['آخر دخول', selected.lastLogin],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3">
                  <p className="text-[10px] font-bold text-slate-400 mb-1">{k}</p>
                  <p className="text-[12px] font-extrabold text-slate-700 dark:text-slate-200" dir={k === 'الجوال' ? 'ltr' : undefined}>{v}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <p className="text-xs font-extrabold text-slate-500 dark:text-slate-400 mb-3">الصلاحيات الممنوحة</p>
              <div className="flex flex-wrap gap-1.5">
                {permissionGrid
                  .filter((r) => r.access[['admin', 'commander', 'supervisor', 'inspector', 'analyst', 'receiver'][ROLE_LIST.findIndex((x) => x.name === selected.role)] ?? 'receiver'] !== 'none')
                  .map((r) => (
                    <span key={r.module} className="chip bg-navy-100 text-navy-800 dark:bg-navy-800/50 dark:text-navy-200">{r.module}</span>
                  ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
