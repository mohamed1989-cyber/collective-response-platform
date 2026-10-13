import { useState } from 'react';
import { Badge, Button, Card, CardHeader, Field, Input, PageHeader, Progress, Select, Tabs, Table, Toggle } from '../components';
import { DEPARTMENTS, INTEGRATIONS, PRIORITIES, REPORT_TYPES, SEVERITIES, TEAMS, VEHICLES, ZONE_STATS } from '../data';

export default function Settings() {
  const [tab, setTab] = useState('types');
  const [newType, setNewType] = useState('');
  const [ai, setAi] = useState({ classify: true, dedupe: true, priority: true, assign: true, summarize: true, ocr: true, report: false });
  const [notif, setNotif] = useState({ newReport: true, critical: true, taskDue: true, teamStatus: false, daily: true, weekly: true });

  return (
    <div className="space-y-6">
      <PageHeader
        title="الإعدادات"
        subtitle="تهيئة أنواع البلاغات والأولويات والإدارات والتكاملات وإعدادات الذكاء الاصطناعي"
        icon="fa-solid fa-gear"
        actions={
          <>
            <Button variant="outline" icon="fa-solid fa-rotate-left">استعادة الافتراضي</Button>
            <Button icon="fa-solid fa-floppy-disk">حفظ التغييرات</Button>
          </>
        }
      />

      <div className="flex items-start gap-5 flex-col lg:flex-row">
        {/* قائمة الأقسام */}
        <Card className="w-full lg:w-64 shrink-0 p-2 self-start">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto scrollbar-none">
            {[
              { id: 'types', label: 'أنواع البلاغات', icon: 'fa-solid fa-tags' },
              { id: 'priorities', label: 'الأولويات', icon: 'fa-solid fa-flag' },
              { id: 'severity', label: 'مستويات الخطورة', icon: 'fa-solid fa-gauge-high' },
              { id: 'departments', label: 'الإدارات', icon: 'fa-solid fa-building' },
              { id: 'teams', label: 'الفرق والسيارات', icon: 'fa-solid fa-people-group' },
              { id: 'zones', label: 'المناطق والأحياء', icon: 'fa-solid fa-map' },
              { id: 'integrations', label: 'التكاملات', icon: 'fa-solid fa-plug' },
              { id: 'notifications', label: 'الإشعارات', icon: 'fa-solid fa-bell' },
              { id: 'ai', label: 'إعدادات الذكاء الاصطناعي', icon: 'fa-solid fa-robot' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setTab(s.id)}
                className={`w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-bold transition-all whitespace-nowrap ${
                  tab === s.id
                    ? 'bg-navy-950 text-white shadow-md shadow-navy-950/20'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <i className={`${s.icon} w-4 text-center`} />
                {s.label}
              </button>
            ))}
          </nav>
        </Card>

        <div className="flex-1 min-w-0 space-y-6 w-full">
          {tab === 'types' && (
            <Card className="animate-fade-in">
              <CardHeader
                title="أنواع البلاغات"
                subtitle={`${REPORT_TYPES.length} نوع بلاغ مُعرَّف في النظام`}
                icon="fa-solid fa-tags"
                action={<Badge tone="info">{REPORT_TYPES.length} نوع</Badge>}
              />
              <div className="px-5 pb-5 space-y-4">
                <div className="flex gap-2">
                  <Input value={newType} onChange={(e) => setNewType(e.target.value)} placeholder="أضف نوع بلاغ جديد..." icon="fa-solid fa-plus" className="flex-1" />
                  <Button icon="fa-solid fa-plus">إضافة</Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {REPORT_TYPES.map((t) => (
                    <div key={t} className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <span className="icon-box h-8 w-8 text-xs bg-navy-100 text-navy-800 dark:bg-navy-800/50 dark:text-navy-200">
                        <i className="fa-solid fa-tag" />
                      </span>
                      <span className="text-[13px] font-bold text-slate-600 dark:text-slate-300 flex-1 truncate">{t}</span>
                      <button className="text-slate-400 hover:text-navy-700 dark:hover:text-emerald-400 transition-colors"><i className="fa-solid fa-pen text-xs" /></button>
                      <button className="text-slate-400 hover:text-red-500 transition-colors"><i className="fa-solid fa-trash text-xs" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {tab === 'priorities' && (
            <Card className="animate-fade-in">
              <CardHeader title="الأولويات" subtitle="مستويات الأولوية وأزمنة الاستجابة المستهدفة (SLA)" icon="fa-solid fa-flag" />
              <Table>
                <thead>
                  <tr>
                    <th>الأولوية</th>
                    <th>الوصف</th>
                    <th>زمن الاستجابة المستهدف</th>
                    <th>لون التصنيف</th>
                    <th>إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['فورية', 'تدخل خلال ساعة لحماية الأرواح أو المرور', 'أقل من ساعة', 'bg-red-500'],
                    ['عالية', 'تدخل خلال 4 ساعات', '4 ساعات', 'bg-orange-500'],
                    ['عادية', 'تدخل خلال 24 ساعة', '24 ساعة', 'bg-amber-500'],
                    ['منخفضة', 'ضمن الجدول الزمني الدوري', '72 ساعة', 'bg-sky-500'],
                  ].map(([p, d, sla, c]) => (
                    <tr key={p}>
                      <td className="font-extrabold text-slate-700 dark:text-slate-200 whitespace-nowrap">{p}</td>
                      <td>{d}</td>
                      <td className="whitespace-nowrap font-bold">{sla}</td>
                      <td><span className={`h-4 w-10 rounded-full inline-block ${c}`} /></td>
                      <td>
                        <button className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-navy-950 hover:text-white transition-colors">
                          <i className="fa-solid fa-pen text-xs" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          )}

          {tab === 'severity' && (
            <Card className="animate-fade-in">
              <CardHeader title="مستويات الخطورة" subtitle="تصنيف خطورة البلاغات والحوادث" icon="fa-solid fa-gauge-high" />
              <div className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  ['حرج', 'خطر مباشر على الأرواح أو البنية التحتية — تدخل فوري', 'critical'],
                  ['عالي', 'تأثير واسع يتطلب تدخلاً في نفس اليوم', 'high'],
                  ['متوسط', 'تأثير محدود على الخدمة أو المرور', 'medium'],
                  ['منخفض', 'تأثير سطحي ضمن الصيانة المجدولة', 'low'],
                ].map(([s, d, tone]) => (
                  <div key={s} className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                    <div className="flex items-center justify-between">
                      <Badge tone={tone as 'critical' | 'high' | 'medium' | 'low'} dot pulse={tone === 'critical'}>{s}</Badge>
                      <div className="flex gap-1.5">
                        <button className="h-7 w-7 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-navy-950 hover:text-white transition-colors"><i className="fa-solid fa-pen text-[10px]" /></button>
                        <button className="h-7 w-7 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-red-500 hover:text-white transition-colors"><i className="fa-solid fa-trash text-[10px]" /></button>
                      </div>
                    </div>
                    <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-2.5 leading-relaxed">{d}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {tab === 'departments' && (
            <Card className="animate-fade-in overflow-hidden">
              <CardHeader
                title="الإدارات"
                subtitle="الإدارات المسؤولة المعتمدة في منظومة التخطيط الحضري"
                icon="fa-solid fa-building"
                action={<Button size="sm" icon="fa-solid fa-plus">إدارة جديدة</Button>}
              />
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>اسم الإدارة</th>
                    <th>مدير الإدارة</th>
                    <th>الموظفون</th>
                    <th>الفرق</th>
                    <th>الحالة</th>
                    <th>إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {DEPARTMENTS.map((d, i) => (
                    <tr key={d}>
                      <td className="text-slate-400 font-bold">{i + 1}</td>
                      <td className="font-extrabold text-slate-700 dark:text-slate-200 whitespace-nowrap">{d}</td>
                      <td className="whitespace-nowrap">{['م. فهد العجمي', 'م. سارة النعيمي', 'م. أمل الفهد', 'م. منصور الشمراني', 'م. عبدالرحمن الزهراني', 'م. يوسف الشهري', 'م. ريم الدوسري', 'م. طارق البقمي'][i]}</td>
                      <td>{[14, 11, 9, 16, 22, 12, 7, 8][i]}</td>
                      <td>{[3, 2, 2, 3, 4, 2, 1, 1][i]}</td>
                      <td><Badge tone="active" dot>نشطة</Badge></td>
                      <td>
                        <button className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-navy-950 hover:text-white transition-colors"><i className="fa-solid fa-pen text-xs" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          )}

          {tab === 'teams' && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 animate-fade-in">
              <Card>
                <CardHeader title="الفرق الميدانية" subtitle={`${TEAMS.length} فريق مسجل`} icon="fa-solid fa-people-group" />
                <Table>
                  <thead>
                    <tr>
                      <th>الفريق</th>
                      <th>النوع</th>
                      <th>الحي</th>
                      <th>الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TEAMS.map((t) => (
                      <tr key={t.id}>
                        <td className="font-extrabold text-slate-700 dark:text-slate-200 whitespace-nowrap">{t.name}</td>
                        <td className="text-xs">{t.type}</td>
                        <td className="whitespace-nowrap">{t.zone}</td>
                        <td><Badge tone={t.status === 'متاح' ? 'success' : 'progress'}>{t.status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
              <Card>
                <CardHeader title="السيارات والمركبات" subtitle={`${VEHICLES.length} مركبة`} icon="fa-solid fa-truck" />
                <Table>
                  <thead>
                    <tr>
                      <th>اللوحة</th>
                      <th>النوع</th>
                      <th>الفريق</th>
                      <th>الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {VEHICLES.map((v) => (
                      <tr key={v.id}>
                        <td className="font-extrabold text-navy-800 dark:text-navy-300 whitespace-nowrap">{v.plate}</td>
                        <td className="text-xs">{v.type}</td>
                        <td className="text-xs whitespace-nowrap">{v.team}</td>
                        <td><Badge tone={v.status === 'جاهزة' ? 'success' : v.status === 'صيانة' ? 'medium' : 'progress'}>{v.status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </div>
          )}

          {tab === 'zones' && (
            <Card className="animate-fade-in overflow-hidden">
              <CardHeader title="المناطق والأحياء" subtitle="الحدود الإدارية المعتمدة في منظومة GIS" icon="fa-solid fa-map" />
              <Table>
                <thead>
                  <tr>
                    <th>الحي</th>
                    <th>الإحداثيات</th>
                    <th>البلاغات</th>
                    <th>مفتوحة</th>
                    <th>نسبة الإنجاز</th>
                    <th>إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {ZONE_STATS.map((z) => (
                    <tr key={z.name}>
                      <td className="font-extrabold text-slate-700 dark:text-slate-200 whitespace-nowrap">{z.name}</td>
                      <td className="text-xs text-slate-400 whitespace-nowrap" dir="ltr">{z.lat}, {z.lng}</td>
                      <td>{z.reports}</td>
                      <td>{z.open}</td>
                      <td className="min-w-[150px]"><Progress value={z.completion} tone="emerald" size="xs" showValue /></td>
                      <td>
                        <button className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-navy-950 hover:text-white transition-colors"><i className="fa-solid fa-pen text-xs" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          )}

          {tab === 'integrations' && (
            <div className="space-y-4 animate-fade-in">
              <Card className="p-4 flex items-center gap-3 bg-gradient-to-l from-navy-950 to-navy-900 !border-transparent text-white">
                <span className="icon-box h-11 w-11 bg-white/10 text-lg"><i className="fa-solid fa-diagram-project" /></span>
                <div className="min-w-0">
                  <p className="text-sm font-extrabold">تكامل منظومات إدارة التخطيط الحضري</p>
                  <p className="text-[11px] text-slate-300">جاهزية الربط عبر واجهات API موحّدة مع 8 منظومات حكومية</p>
                </div>
                <Badge tone="success" className="ms-auto shrink-0" dot>{INTEGRATIONS.filter((i) => i.status === 'متصل').length} متصلة</Badge>
              </Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {INTEGRATIONS.map((it) => (
                  <Card key={it.id} hover className="p-5">
                    <div className="flex items-start gap-3.5">
                      <span className={`icon-box h-11 w-11 text-base shrink-0 ${it.status === 'متصل' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300' : it.status === 'جاهز للربط' ? 'bg-sky-100 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300' : 'bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300'}`}>
                        <i className={it.icon} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-[13px] font-extrabold text-slate-800 dark:text-slate-100 truncate">{it.name}</h3>
                          <Badge tone={it.status === 'متصل' ? 'success' : it.status === 'جاهز للربط' ? 'info' : 'medium'} dot>{it.status}</Badge>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">{it.description}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-[11px] font-bold text-slate-400">
                            <i className="fa-solid fa-gauge ms-1" />
                            زمن الاستجابة: {it.latency}
                          </span>
                          <Button size="sm" variant={it.status === 'متصل' ? 'outline' : 'primary'} icon={it.status === 'متصل' ? 'fa-solid fa-gear' : 'fa-solid fa-link'}>
                            {it.status === 'متصل' ? 'إدارة' : 'ربط'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {tab === 'notifications' && (
            <Card className="animate-fade-in">
              <CardHeader title="إعدادات الإشعارات" subtitle="القواعد العامة لإرسال التنبيهات داخل النظام" icon="fa-solid fa-bell" tone="amber" />
              <div className="px-5 pb-5 space-y-4">
                <Toggle checked={notif.newReport} onChange={(v) => setNotif({ ...notif, newReport: v })} label="بلاغ جديد" description="إشعار فوري عند وصول أي بلاغ عبر القنوات" />
                <div className="divider" />
                <Toggle checked={notif.critical} onChange={(v) => setNotif({ ...notif, critical: v })} label="البلاغات الحرجة" description="إشعار دائم لا يمكن كتمه" />
                <div className="divider" />
                <Toggle checked={notif.taskDue} onChange={(v) => setNotif({ ...notif, taskDue: v })} label="اقتراض موعد المهمة" description="إشعار قبل الاستحقاق بساعة" />
                <div className="divider" />
                <Toggle checked={notif.teamStatus} onChange={(v) => setNotif({ ...notif, teamStatus: v })} label="تغيّر حالة الفرق" description="عند التبديل بين متاح/في مهمة" />
                <div className="divider" />
                <Toggle checked={notif.daily} onChange={(v) => setNotif({ ...notif, daily: v })} label="الملخص اليومي" description="تقرير مختصر الساعة 07:00" />
                <div className="divider" />
                <Toggle checked={notif.weekly} onChange={(v) => setNotif({ ...notif, weekly: v })} label="التقرير الأسبوعي" description="كل يوم أحد عبر البريد الرسمي" />
              </div>
            </Card>
          )}

          {tab === 'ai' && (
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader
                  title="إعدادات الذكاء الاصطناعي"
                  subtitle="التحكم في الوظائف الآلية لمعالجة البلاغات"
                  icon="fa-solid fa-robot"
                  tone="violet"
                  action={<Badge tone="violet" dot>النموذج v2.4</Badge>}
                />
                <div className="px-5 pb-5 space-y-4">
                  <Toggle checked={ai.classify} onChange={(v) => setAi({ ...ai, classify: v })} label="التصنيف التلقائي للبلاغات" description="تحديد نوع البلاغ والقسم المختصة آلياً" />
                  <div className="divider" />
                  <Toggle checked={ai.dedupe} onChange={(v) => setAi({ ...ai, dedupe: v })} label="إزالة البلاغات المكررة" description="دمج البلاغات المتشابهة تشابهاً أعلى من 85%" />
                  <div className="divider" />
                  <Toggle checked={ai.priority} onChange={(v) => setAi({ ...ai, priority: v })} label="تقييم الخطورة واقتراح الأولوية" description="اعتماد تصنيف آلي مع مراجعة موظف الاستقبال" />
                  <div className="divider" />
                  <Toggle checked={ai.assign} onChange={(v) => setAi({ ...ai, assign: v })} label="اقتراح الفريق المناسب" description="اختيار الفريق بناءً على الموقع والجاهزية" />
                  <div className="divider" />
                  <Toggle checked={ai.summarize} onChange={(v) => setAi({ ...ai, summarize: v })} label="تلخيص البلاغ تلقائياً" description="ملخص من سطرين في صفحة البلاغ" />
                  <div className="divider" />
                  <Toggle checked={ai.ocr} onChange={(v) => setAi({ ...ai, ocr: v })} label="استخراج النص من الصور (OCR)" description="قراءة اللوحات والمحاضر المصورة" />
                  <div className="divider" />
                  <Toggle checked={ai.report} onChange={(v) => setAi({ ...ai, report: v })} label="إنشاء تقرير أولي آلي" description="مسودة تقرير جاهزة للمراجعة عند كل حادث" />
                </div>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader title="عتبات التصنيف الآلي" subtitle="ضبط حساسية النموذج" icon="fa-solid fa-sliders" tone="sky" />
                  <div className="px-5 pb-5 space-y-5">
                    <Field label="حد الثقة للتصنيف التلقائي" hint="أقل من هذا الحجم يُحال للمراجعة اليدوية">
                      <div className="flex items-center gap-3">
                        <input type="range" min={50} max={100} defaultValue={85} className="flex-1 accent-navy-800" />
                        <span className="chip bg-navy-100 text-navy-800 dark:bg-navy-800/50 dark:text-navy-200 font-extrabold">85%</span>
                      </div>
                    </Field>
                    <Field label="حد تشابه كشف التكرار" hint="نسبة التشابه التي تُفعّل تنبيه الدمج">
                      <div className="flex items-center gap-3">
                        <input type="range" min={50} max={100} defaultValue={90} className="flex-1 accent-navy-800" />
                        <span className="chip bg-navy-100 text-navy-800 dark:bg-navy-800/50 dark:text-navy-200 font-extrabold">90%</span>
                      </div>
                    </Field>
                    <Field label="لغة المعالجة">
                      <Select options={['العربية (افتراضي)', 'العربية والإنجليزية', 'الإنجليزية']} />
                    </Field>
                    <Field label="نموذج الذكاء المعتمد">
                      <Select options={['النموذج الحكومي v2.4 (محلي)', 'النموذج العام v3 (سحابي)']} />
                    </Field>
                  </div>
                </Card>

                <Card>
                  <CardHeader title="استهلاك وحدة الذكاء" subtitle="آخر 30 يوماً" icon="fa-solid fa-microchip" tone="violet" />
                  <div className="px-5 pb-5 space-y-4">
                    <Progress label="عمليات التصنيف" value={78} tone="violet" showValue />
                    <Progress label="عمليات كشف التكرار" value={64} tone="sky" showValue />
                    <Progress label="عمليات OCR" value={41} tone="amber" showValue />
                    <Progress label="التلخيص التلقائي" value={56} tone="emerald" showValue />
                    <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-4 flex items-center justify-between">
                      <div>
                        <p className="text-[11px] font-bold text-slate-400">عمليات هذا الشهر</p>
                        <p className="text-xl font-extrabold text-slate-700 dark:text-slate-200 font-display">14,820</p>
                      </div>
                      <div className="text-end">
                        <p className="text-[11px] font-bold text-slate-400">دقة النموذج</p>
                        <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-display">96.4%</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
