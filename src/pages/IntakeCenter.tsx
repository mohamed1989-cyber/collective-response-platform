import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
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
  Textarea,
  severityTone,
  reportStatusTone,
} from '../components';
import { AI_DEMO, CHANNELS, DEPARTMENTS, PRIORITIES, REPORTS, REPORT_TYPES, REPORT_STATUSES, SEVERITIES, ZONES } from '../data';

export default function IntakeCenter() {
  const navigate = useNavigate();
  const [channel, setChannel] = useState('app');
  const [saved, setSaved] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [showAi, setShowAi] = useState(true);

  const submit = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setSaved(true);
    }, 900);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="مركز استقبال البلاغات"
        subtitle="استقبال البلاغات من جميع القنوات وتحليلها آلياً بالذكاء الاصطناعي"
        icon="fa-solid fa-inbox"
        actions={
          <>
            <Button variant="outline" icon="fa-solid fa-book-open">دليل الإجراءات</Button>
            <Button variant="outline" icon="fa-solid fa-clock-rotate-left">سجل الاستقبال</Button>
            <Button icon="fa-solid fa-plus">استقبال سريع</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="بلاغات اليوم" value={36} icon="fa-solid fa-inbox" tone="navy" delta={{ value: '8%' }} sub="عبر جميع القنوات" />
        <StatCard label="عبر تطبيق الهاتف" value={14} icon="fa-solid fa-mobile-screen-button" tone="sky" delta={{ value: '21%' }} sub="الأعلى نمواً" />
        <StatCard label="بانتظار التصنيف" value={5} icon="fa-solid fa-robot" tone="violet" sub="قيد المعالجة الآلية" />
        <StatCard label="بلاغات مكررة محتملة" value={3} icon="fa-solid fa-clone" tone="amber" sub="تحتاج مراجعة يدوية" />
      </div>

      {/* قنوات الاستقبال */}
      <div>
        <h2 className="text-sm font-extrabold text-slate-600 dark:text-slate-300 mb-3">
          <i className="fa-solid fa-tower-broadcast ms-2 text-navy-700 dark:text-emerald-400" />
          قنوات الاستقبال
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-3">
          {CHANNELS.map((c) => (
            <button
              key={c.id}
              onClick={() => setChannel(c.id)}
              className={`card p-4 text-center transition-all hover:-translate-y-1 hover:shadow-card-hover ${
                channel === c.id ? 'ring-2 ring-navy-700 dark:ring-emerald-400 border-transparent' : ''
              }`}
            >
              <span
                className={`icon-box h-11 w-11 mx-auto text-base ${
                  channel === c.id
                    ? 'bg-navy-950 text-white'
                    : 'bg-navy-100 text-navy-800 dark:bg-navy-800/50 dark:text-navy-200'
                }`}
              >
                <i className={c.icon} />
              </span>
              <p className="text-[12px] font-extrabold text-slate-700 dark:text-slate-200 mt-2.5 leading-tight">{c.name}</p>
              <p className="text-lg font-extrabold text-navy-800 dark:text-emerald-400 font-display mt-1">{c.count}</p>
              <p className={`text-[10px] font-bold ${c.trend >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                <i className={`fa-solid ${c.trend >= 0 ? 'fa-arrow-up' : 'fa-arrow-down'} ms-1`} />
                {Math.abs(c.trend)}% هذا الأسبوع
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* النموذج + الذكاء الاصطناعي */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <Card className="xl:col-span-3 animate-slide-up">
          <CardHeader
            title="نموذج استقبال بلاغ جديد"
            subtitle={`القناة المختارة: ${CHANNELS.find((c) => c.id === channel)?.name ?? ''}`}
            icon="fa-solid fa-pen-to-square"
            action={
              <Button variant="ghost" size="sm" icon="fa-solid fa-eraser">مسح</Button>
            }
          />
          <div className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="رقم البلاغ" hint="يُولّد آلياً عند الحفظ">
              <Input value="BR-2026-1043" readOnly className="bg-slate-50 dark:bg-slate-800/60 font-bold" />
            </Field>
            <Field label="القناة">
              <Select options={CHANNELS.map((c) => ({ value: c.id, label: c.name }))} value={channel} onChange={(e) => setChannel(e.target.value)} />
            </Field>
            <Field label="نوع البلاغ" required>
              <Select options={['— اختر النوع —', ...REPORT_TYPES]} defaultValue="" />
            </Field>
            <Field label="درجة الخطورة" required>
              <Select options={SEVERITIES} defaultValue="متوسط" />
            </Field>
            <Field label="الأولوية" required>
              <Select options={PRIORITIES} defaultValue="عادية" />
            </Field>
            <Field label="القسم المسؤول">
              <Select options={DEPARTMENTS} defaultValue="إدارة الصيانة" />
            </Field>
            <Field label="اسم مقدم البلاغ" required>
              <Input placeholder="الاسم الرباعي" icon="fa-solid fa-user" />
            </Field>
            <Field label="رقم الجوال">
              <Input placeholder="05xxxxxxxx" icon="fa-solid fa-phone" />
            </Field>
            <Field label="الحي">
              <Select options={ZONES} />
            </Field>
            <Field label="العنوان التفصيلي" required>
              <Input placeholder="الشارع، رقم القطعة" icon="fa-solid fa-location-dot" />
            </Field>
            <Field label="خط العرض (Lat)">
              <Input placeholder="24.7136" />
            </Field>
            <Field label="خط الطول (Lng)">
              <Input placeholder="46.6753" />
            </Field>
            <Field label="حالة البلاغ">
              <Select options={REPORT_STATUSES} defaultValue="جديد" />
            </Field>
            <Field label="الحالة المختصرة للمراجعة">
              <Select options={['جديد', 'قيد المراجعة', 'مجدول']} defaultValue="جديد" />
            </Field>
            <Field label="وصف البلاغ" className="sm:col-span-2" required hint="اكتب وصفاً واضحاً ليتم تحليله آلياً">
              <Textarea rows={4} placeholder={AI_DEMO.rawText.slice(0, 90) + '...'} />
            </Field>

            {/* المرفقات */}
            <div className="sm:col-span-2">
              <span className="field-label">الصور والفيديو والمرفقات</span>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'رفع صور', icon: 'fa-solid fa-image', hint: 'حتى 10 صور' },
                  { label: 'رفع فيديو', icon: 'fa-solid fa-video', hint: 'حتى 2 مقطع' },
                  { label: 'مرفقات', icon: 'fa-solid fa-paperclip', hint: 'PDF / Word' },
                ].map((u) => (
                  <button
                    key={u.label}
                    type="button"
                    className="rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 py-6 flex flex-col items-center gap-2 text-slate-400 hover:border-navy-500 hover:text-navy-700 dark:hover:text-emerald-400 transition-colors"
                  >
                    <i className={`${u.icon} text-xl`} />
                    <span className="text-[11px] font-extrabold">{u.label}</span>
                    <span className="text-[10px]">{u.hint}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="sm:col-span-2 flex items-center gap-2 flex-wrap pt-1">
              <Button icon="fa-solid fa-robot" loading={analyzing} onClick={submit}>
                حفظ وتصنيف آلي
              </Button>
              <Button variant="outline" icon="fa-solid fa-floppy-disk" onClick={() => setSaved(true)}>
                حفظ كمسودة
              </Button>
              <Button variant="ghost" icon="fa-solid fa-xmark">إلغاء</Button>
              <span className="text-[11px] text-slate-400 ms-auto">
                <i className="fa-solid fa-shield-halved ms-1" />
                يتم تسجيل العملية في سجل التدقيق
              </span>
            </div>
          </div>
        </Card>

        {/* لوحة الذكاء الاصطناعي */}
        <div className="xl:col-span-2 space-y-5">
          <Card className="border-t-4 border-t-violet-500 animate-slide-up">
            <CardHeader
              title="تحليل الذكاء الاصطناعي"
              subtitle="نتائج المعالجة الآلية للبلاغ"
              icon="fa-solid fa-brain"
              tone="violet"
              action={
                <button onClick={() => setShowAi((s) => !s)} className="text-[11px] font-bold text-slate-400 hover:text-slate-600">
                  {showAi ? 'إخفاء' : 'إظهار'}
                </button>
              }
            />
            {showAi && (
              <div className="px-5 pb-5 space-y-4 animate-fade-in">
                <div className="rounded-xl bg-violet-50 dark:bg-violet-500/10 ring-1 ring-inset ring-violet-200 dark:ring-violet-500/30 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-extrabold text-violet-800 dark:text-violet-300">التصنيف الآلي</p>
                    <span className="text-xs font-extrabold text-violet-700 dark:text-violet-300">{AI_DEMO.confidence}% ثقة</span>
                  </div>
                  <p className="text-sm font-extrabold text-slate-800 dark:text-slate-100">{AI_DEMO.classification}</p>
                  <Progress value={AI_DEMO.confidence} tone="violet" size="xs" className="mt-2" />
                </div>

                <div className="rounded-xl bg-amber-50 dark:bg-amber-500/10 ring-1 ring-inset ring-amber-200 dark:ring-amber-500/30 p-4">
                  <p className="text-xs font-extrabold text-amber-800 dark:text-amber-300 mb-1">
                    <i className="fa-solid fa-clone ms-1.5" />
                    كشف التكرار
                  </p>
                  <p className="text-[12px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    تطابق <span className="font-extrabold">{AI_DEMO.duplicateCandidate.similarity}%</span> مع البلاغ{' '}
                    <span className="font-extrabold text-navy-800 dark:text-emerald-400">{AI_DEMO.duplicateCandidate.id}</span> — {AI_DEMO.duplicateCandidate.note}
                  </p>
                  <div className="flex gap-2 mt-2.5">
                    <Button size="sm" variant="warning" icon="fa-solid fa-link">دمج البلاغين</Button>
                    <Button size="sm" variant="outline">إبقاء منفصل</Button>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    { k: 'الأولوية المقترحة', v: AI_DEMO.priority, icon: 'fa-solid fa-flag', tone: 'text-red-500' },
                    { k: 'درجة الخطورة', v: AI_DEMO.severity, icon: 'fa-solid fa-gauge-high', tone: 'text-orange-500' },
                    { k: 'الإدارة المختصة', v: AI_DEMO.department, icon: 'fa-solid fa-building', tone: 'text-navy-700 dark:text-navy-300' },
                    { k: 'الفريق المناسب', v: AI_DEMO.team, icon: 'fa-solid fa-people-group', tone: 'text-emerald-600' },
                    { k: 'زمن الاستجابة المستهدف', v: AI_DEMO.estimatedResponse, icon: 'fa-solid fa-stopwatch', tone: 'text-sky-500' },
                  ].map((s) => (
                    <div key={s.k} className="flex items-center justify-between gap-3 px-4 py-2.5">
                      <span className="text-[11px] font-bold text-slate-400 flex items-center gap-2">
                        <i className={`${s.icon} ${s.tone} w-4 text-center`} />
                        {s.k}
                      </span>
                      <span className="text-[12px] font-extrabold text-slate-700 dark:text-slate-200">{s.v}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl bg-emerald-50 dark:bg-emerald-500/10 ring-1 ring-inset ring-emerald-200 dark:ring-emerald-500/30 p-4">
                  <p className="text-xs font-extrabold text-emerald-800 dark:text-emerald-300 mb-1.5">
                    <i className="fa-solid fa-wand-magic-sparkles ms-1.5" />
                    ملخص تلقائي
                  </p>
                  <p className="text-[12px] text-slate-600 dark:text-slate-300 leading-relaxed">{AI_DEMO.summary}</p>
                </div>

                <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-4">
                  <p className="text-xs font-extrabold text-slate-500 dark:text-slate-400 mb-1.5">
                    <i className="fa-solid fa-text-width ms-1.5" />
                    استخراج النص من الصور (OCR)
                  </p>
                  <p className="text-[12px] font-bold text-slate-600 dark:text-slate-300 leading-relaxed">{AI_DEMO.ocr}</p>
                </div>

                <div className="rounded-xl bg-navy-950 text-white p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-extrabold">التقرير الأولي المُولّد</p>
                    <Badge tone="success" dot>جاهز</Badge>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{AI_DEMO.summary}</p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="success" icon="fa-solid fa-file-pdf">تصدير PDF</Button>
                    <Button size="sm" variant="outline" className="!bg-white/10 !text-white !border-white/20">اعتماد وحفظ</Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* آخر البلاغات المستلمة */}
      <Card className="animate-slide-up">
        <CardHeader
          title="آخر البلاغات المستلمة"
          subtitle="مرتبة حسب الأحدث"
          icon="fa-solid fa-satellite-dish"
          action={
            <Button variant="outline" size="sm" icon="fa-solid fa-arrow-left" onClick={() => navigate('/reports')}>
              مركز البلاغات
            </Button>
          }
        />
        <Table>
          <thead>
            <tr>
              <th>رقم البلاغ</th>
              <th>النوع</th>
              <th>الخطورة</th>
              <th>الأولوية</th>
              <th>مقدم البلاغ</th>
              <th>القناة</th>
              <th>الحي</th>
              <th>الحالة</th>
              <th>الإنشاء</th>
            </tr>
          </thead>
          <tbody>
            {REPORTS.slice(0, 8).map((r) => (
              <tr key={r.id} className="cursor-pointer" onClick={() => navigate('/reports')}>
                <td className="font-extrabold text-navy-800 dark:text-navy-300 whitespace-nowrap">{r.id}</td>
                <td className="max-w-[200px] truncate">{r.type}</td>
                <td>
                  <Badge tone={severityTone(r.severity)} dot>{r.severity}</Badge>
                </td>
                <td className="whitespace-nowrap">{r.priority}</td>
                <td className="whitespace-nowrap">{r.reporter}</td>
                <td className="whitespace-nowrap text-xs">{r.channel}</td>
                <td className="whitespace-nowrap">{r.zone}</td>
                <td>
                  <Badge tone={reportStatusTone(r.status)}>{r.status}</Badge>
                </td>
                <td className="text-xs text-slate-400 whitespace-nowrap">{r.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* نافذة نجاح الحفظ */}
      <Modal
        open={saved}
        onClose={() => setSaved(false)}
        title="تم استقبال البلاغ بنجاح"
        subtitle="BR-2026-1043"
        icon="fa-solid fa-circle-check"
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setSaved(false)}>إغلاق</Button>
            <Button icon="fa-solid fa-arrow-left" onClick={() => { setSaved(false); navigate('/reports'); }}>عرض البلاغ</Button>
          </>
        }
      >
        <div className="text-center py-4">
          <span className="icon-box h-20 w-20 mx-auto text-3xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300 mb-4">
            <i className="fa-solid fa-check" />
          </span>
          <p className="text-sm font-bold text-slate-600 dark:text-slate-300 leading-relaxed">
            تم تسجيل البلاغ وتصنيفه آلياً وتكليف {AI_DEMO.team} بمتابعته.
            <br />
            سيتم إرسال إشعار فوري لمقدم البلاغ.
          </p>
        </div>
      </Modal>
    </div>
  );
}
