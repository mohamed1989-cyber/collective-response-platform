import { useState } from 'react';
import { Badge, Button, Card, CardHeader, Field, Input, Modal, PageHeader, Select, StatCard, Table, Textarea } from '../components';

interface Template {
  id: string;
  name: string;
  desc: string;
  icon: string;
  tone: string;
  formats: string[];
  count: number;
}

const TEMPLATES: Template[] = [
  { id: 'RT-1', name: 'التقرير اليومي', desc: 'ملخص البلاغات والمهام والحوادث ليوم عمل كامل', icon: 'fa-solid fa-sun', tone: 'bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300', formats: ['PDF', 'Excel', 'Word'], count: 30 },
  { id: 'RT-2', name: 'التقرير الأسبوعي', desc: 'تحليل أسبوعي مع مؤشرات الأداء ومقارنات الاتجاه', icon: 'fa-solid fa-calendar-week', tone: 'bg-sky-100 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300', formats: ['PDF', 'Excel'], count: 12 },
  { id: 'RT-3', name: 'التقرير الشهري', desc: 'التقرير الرسمي الشامل للمديرين وغرفة العمليات', icon: 'fa-solid fa-calendar-days', tone: 'bg-navy-100 text-navy-700 dark:bg-navy-800/50 dark:text-navy-200', formats: ['PDF', 'Excel', 'Word'], count: 4 },
  { id: 'RT-4', name: 'تقرير حادث', desc: 'ملف متكامل لحادث واحد مع الجدول الزمني والقرارات', icon: 'fa-solid fa-triangle-exclamation', tone: 'bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-300', formats: ['PDF', 'Word'], count: 6 },
  { id: 'RT-5', name: 'تقرير أداء الفرق', desc: 'مقارنة أداء الفرق والمفتشين والالتزام بالمواعيد', icon: 'fa-solid fa-people-group', tone: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300', formats: ['PDF', 'Excel'], count: 4 },
  { id: 'RT-6', name: 'تقرير مؤشرات KPI', desc: 'لوحة مؤشرات جاهزة للطباعة والعرض التنفيذي', icon: 'fa-solid fa-gauge-high', tone: 'bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300', formats: ['PDF', 'PowerPoint'], count: 4 },
];

const formatStyle: Record<string, string> = {
  PDF: 'bg-red-600 hover:bg-red-700 text-white',
  Excel: 'bg-emerald-600 hover:bg-emerald-700 text-white',
  Word: 'bg-blue-600 hover:bg-blue-700 text-white',
  PowerPoint: 'bg-orange-500 hover:bg-orange-600 text-white',
};

const formatIcon: Record<string, string> = {
  PDF: 'fa-solid fa-file-pdf',
  Excel: 'fa-solid fa-file-excel',
  Word: 'fa-solid fa-file-word',
  PowerPoint: 'fa-solid fa-file-powerpoint',
};

const RECENT = [
  { id: 'RP-901', name: 'التقرير اليومي - 12 أكتوبر 2026', type: 'يومي', format: 'PDF', date: '2026-10-12 23:55', size: '1.8 م.ب', by: 'النظام الآلي' },
  { id: 'RP-900', name: 'تقرير أداء الفرق - سبتمبر', type: 'أداء', format: 'Excel', date: '2026-10-01 09:10', size: '890 ك.ب', by: 'نورة الحمد' },
  { id: 'RP-899', name: 'ملف حادث INC-2026-018', type: 'حادث', format: 'Word', date: '2026-10-13 09:45', size: '2.4 م.ب', by: 'غرفة العمليات' },
  { id: 'RP-898', name: 'التقرير الشهري - سبتمبر 2026', type: 'شهري', format: 'PDF', date: '2026-10-01 08:00', size: '6.2 م.ب', by: 'أحمد القيسي' },
  { id: 'RP-897', name: 'مؤشرات KPI - الأسبوع 40', type: 'KPI', format: 'PowerPoint', date: '2026-10-04 14:30', size: '3.1 م.ب', by: 'وحدة التحليلات' },
];

export default function ReportsCenter() {
  const [open, setOpen] = useState(false);
  const [template, setTemplate] = useState<Template | null>(null);
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);

  const openCreator = (t: Template | null) => {
    setTemplate(t);
    setOpen(true);
    setDone(false);
  };

  const generate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setDone(true);
    }, 1100);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="مركز التقارير"
        subtitle="إنشاء تقارير احترافية بصيغ PDF وExcel وWord حسب الجدول الزمني"
        icon="fa-solid fa-file-export"
        tone="violet"
        actions={
          <>
            <Button variant="outline" icon="fa-solid fa-clock">جدولة التقارير</Button>
            <Button variant="outline" icon="fa-solid fa-box-archive">أرشيف التقارير</Button>
            <Button icon="fa-solid fa-plus" onClick={() => openCreator(null)}>إنشاء تقرير</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="تقارير هذا الشهر" value={46} icon="fa-solid fa-file-lines" tone="navy" delta={{ value: '12%' }} sub="جميع الأنواع" />
        <StatCard label="تقارير مجدولة" value={8} icon="fa-solid fa-clock" tone="sky" sub="القادمة تلقائياً" />
        <StatCard label="قوالب جاهزة" value={TEMPLATES.length} icon="fa-solid fa-layer-group" tone="violet" sub="يمكن تخصيصها" />
        <StatCard label="آخر تصدير" value="09:45" icon="fa-solid fa-download" tone="emerald" sub="ملف Word جاهز" />
      </div>

      {/* القوالب */}
      <div>
        <h2 className="text-sm font-extrabold text-slate-600 dark:text-slate-300 mb-3">
          <i className="fa-solid fa-clone ms-2 text-violet-500" />
          قوالب التقارير
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
          {TEMPLATES.map((t) => (
            <Card key={t.id} hover className="p-5 flex flex-col animate-slide-up">
              <div className="flex items-start gap-3.5">
                <span className={`icon-box h-12 w-12 text-lg shrink-0 ${t.tone}`}>
                  <i className={t.icon} />
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100">{t.name}</h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed mt-1">{t.desc}</p>
                </div>
                <Badge tone="neutral" className="ms-auto shrink-0">{t.count} إصدار</Badge>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
                {t.formats.map((f) => (
                  <Button key={f} size="sm" className={`flex-1 !px-2 ${formatStyle[f]}`} icon={formatIcon[f]} onClick={() => openCreator(t)}>
                    {f}
                  </Button>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* آخر التقارير */}
      <Card className="overflow-hidden">
        <CardHeader
          title="آخر التقارير المُنشأة"
          subtitle="يمكن تحميلها أو إعادة إنشائها"
          icon="fa-solid fa-clock-rotate-left"
          action={
            <div className="flex gap-2">
              <Button size="sm" variant="outline" icon="fa-solid fa-filter">تصفية</Button>
              <Button size="sm" variant="outline" icon="fa-solid fa-plus" onClick={() => openCreator(null)}>جديد</Button>
            </div>
          }
        />
        <Table>
          <thead>
            <tr>
              <th>رقم التقرير</th>
              <th>اسم التقرير</th>
              <th>النوع</th>
              <th>الصيغة</th>
              <th>تاريخ الإنشاء</th>
              <th>الحجم</th>
              <th>أنشأه</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {RECENT.map((r) => (
              <tr key={r.id}>
                <td className="font-extrabold text-navy-800 dark:text-navy-300">{r.id}</td>
                <td className="font-bold text-slate-700 dark:text-slate-200">{r.name}</td>
                <td><Badge tone="info">{r.type}</Badge></td>
                <td>
                  <span className="inline-flex items-center gap-1.5 text-xs font-extrabold">
                    <i className={`${formatIcon[r.format]} ${r.format === 'PDF' ? 'text-red-500' : r.format === 'Excel' ? 'text-emerald-500' : r.format === 'Word' ? 'text-blue-500' : 'text-orange-500'}`} />
                    {r.format}
                  </span>
                </td>
                <td className="text-xs text-slate-400 whitespace-nowrap">{r.date}</td>
                <td className="text-xs whitespace-nowrap">{r.size}</td>
                <td className="text-xs whitespace-nowrap">{r.by}</td>
                <td>
                  <div className="flex gap-1.5">
                    <button className="h-8 w-8 rounded-lg bg-navy-100 text-navy-800 dark:bg-navy-800/60 dark:text-navy-200 hover:bg-navy-200 transition-colors" title="معاينة">
                      <i className="fa-solid fa-eye text-xs" />
                    </button>
                    <button className="h-8 w-8 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 hover:bg-emerald-200 transition-colors" title="تحميل">
                      <i className="fa-solid fa-download text-xs" />
                    </button>
                    <button className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-navy-950 hover:text-white transition-colors" title="إعادة إنشاء">
                      <i className="fa-solid fa-rotate text-xs" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* نافذة إنشاء تقرير */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="إنشاء تقرير جديد"
        subtitle={template ? `القالب: ${template.name}` : 'اختر الإعدادات والصيغة المطلوبة'}
        icon="fa-solid fa-file-circle-plus"
        size="lg"
        footer={
          done ? (
            <>
              <Button variant="outline" onClick={() => setOpen(false)}>إغلاق</Button>
              <Button variant="success" icon="fa-solid fa-download">تحميل التقرير</Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setOpen(false)}>إلغاء</Button>
              <Button icon="fa-solid fa-wand-magic-sparkles" loading={generating} onClick={generate}>
                إنشاء التقرير
              </Button>
            </>
          )
        }
      >
        {done ? (
          <div className="text-center py-6 animate-scale-in">
            <span className="icon-box h-20 w-20 mx-auto text-3xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300 mb-4">
              <i className="fa-solid fa-check" />
            </span>
            <h3 className="text-base font-extrabold text-slate-700 dark:text-slate-200">تم إنشاء التقرير بنجاح</h3>
            <p className="text-xs text-slate-400 mt-1.5">التقرير جاهز للتحميل بصيغة PDF — تم تسجيل العملية في سجل التدقيق</p>
            <div className="flex items-center justify-center gap-3 mt-4 text-xs font-bold text-slate-500">
              <span><i className="fa-solid fa-file-pdf text-red-500 ms-1" />2.1 م.ب</span>
              <span><i className="fa-solid fa-clock ms-1" />أُنشئ الآن</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="نوع التقرير">
                <Select options={TEMPLATES.map((t) => t.name)} defaultValue={template?.name} />
              </Field>
              <Field label="الصيغة">
                <Select options={['PDF', 'Excel', 'Word', 'PowerPoint']} defaultValue={template?.formats[0] ?? 'PDF'} />
              </Field>
              <Field label="من تاريخ">
                <Input type="date" defaultValue="2026-10-06" />
              </Field>
              <Field label="إلى تاريخ">
                <Input type="date" defaultValue="2026-10-13" />
              </Field>
              <Field label="النطاق الجغرافي">
                <Select options={['كل الأحياء', 'حي النرجس', 'حي الياسمين', 'حي الملقا', 'حي حطين']} />
              </Field>
              <Field label="القسم المسؤول">
                <Select options={['كل الإدارات', 'إدارة الصيانة', 'إدارة التفتيش', 'إدارة التخطيط', 'إدارة النظافة']} />
              </Field>
            </div>
            <Field label="أقسام التقرير">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {['ملخص تنفيذي', 'البلاغات', 'الحوادث', 'أداء الفرق', 'الرسوم البيانية', 'الجدول الزمني', 'القرارات', 'المرفقات', 'سجل التدقيق'].map((s, i) => (
                  <label key={s} className="chip ring-1 ring-inset ring-slate-200 dark:ring-slate-700 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors has-[:checked]:bg-navy-950 has-[:checked]:text-white">
                    <input type="checkbox" className="hidden" defaultChecked={i < 5} />
                    {s}
                  </label>
                ))}
              </div>
            </Field>
            <Field label="ملاحظات إضافية (اختياري)">
              <Textarea rows={3} placeholder="أي توجيهات خاصة تظهر في ترويسة التقرير..." />
            </Field>
            <div className="rounded-xl bg-navy-950 text-white p-4 flex items-center gap-3">
              <i className="fa-solid fa-robot text-emerald-400 text-lg" />
              <div>
                <p className="text-[13px] font-extrabold">سيقوم الذكاء الاصطناعي بإضافة ملخص تحليلي تلقائي</p>
                <p className="text-[11px] text-slate-300">مع اقتراحات للمتابعة ومقارنات بالفترة السابقة</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
