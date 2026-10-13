import { useMemo, useState } from 'react';
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
} from '../components';
import { DOC_KIND_META, DOCUMENTS, DOCUMENT_CATEGORIES, type DocItem } from '../data';

export default function Documents() {
  const [category, setCategory] = useState('الكل');
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selected, setSelected] = useState<DocItem | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);

  const docs = useMemo(
    () =>
      DOCUMENTS.filter(
        (d) => (category === 'الكل' || d.category === category) && (!search.trim() || d.name.includes(search) || d.owner.includes(search)),
      ),
    [category, search],
  );

  const stats = {
    total: DOCUMENTS.length,
    reports: DOCUMENTS.filter((d) => d.category === 'تقارير').length,
    plans: DOCUMENTS.filter((d) => d.category === 'مخططات').length,
    archived: DOCUMENTS.filter((d) => d.category === 'أرشيف').length,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="مركز الوثائق"
        subtitle="إدارة الصور والفيديو والمستندات والتقارير والمخططات والعقود مع بحث ذكي"
        icon="fa-solid fa-folder-open"
        actions={
          <>
            <Button variant="outline" icon="fa-solid fa-box-archive">الأرشفة</Button>
            <Button variant="outline" icon="fa-solid fa-folder-plus">مجلد جديد</Button>
            <Button icon="fa-solid fa-cloud-arrow-up" onClick={() => setUploadOpen(true)}>رفع وثيقة</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="إجمالي الوثائق" value={stats.total} icon="fa-solid fa-files" tone="navy" sub="ضمن مكتبة الوثائق" />
        <StatCard label="تقارير" value={stats.reports} icon="fa-solid fa-file-lines" tone="sky" sub="دورية وتشغيلية" />
        <StatCard label="مخططات هندسية" value={stats.plans} icon="fa-solid fa-compass-drafting" tone="violet" sub="صيغة DWG معتمدة" />
        <StatCard label="مساحة المستودع" value="68%" icon="fa-solid fa-hard-drive" tone="amber" sub="6.8 ج.ب من 10 ج.ب" />
      </div>

      <Card className="p-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative w-full sm:w-80">
            <i className="fa-solid fa-magnifying-glass absolute start-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} className="input ps-10" placeholder="ابحث في الوثائق بالاسم أو المالك..." />
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {DOCUMENT_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`chip transition-all ${
                  category === c
                    ? 'bg-navy-950 text-white'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5 ms-auto">
            <button
              onClick={() => setView('grid')}
              className={`h-9 w-9 rounded-lg flex items-center justify-center transition-colors ${view === 'grid' ? 'bg-navy-950 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}
            >
              <i className="fa-solid fa-grip" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`h-9 w-9 rounded-lg flex items-center justify-center transition-colors ${view === 'list' ? 'bg-navy-950 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}
            >
              <i className="fa-solid fa-list" />
            </button>
          </div>
        </div>
        <div className="mt-4">
          <Progress label="استخدام مساحة المستودع" value={68} tone="amber" showValue />
        </div>
      </Card>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
          {docs.map((d) => {
            const meta = DOC_KIND_META[d.kind];
            return (
              <Card key={d.id} hover className="p-5 group animate-slide-up cursor-pointer" >
                <div onClick={() => setSelected(d)}>
                  <div className="flex items-start justify-between gap-3">
                    <span className={`icon-box h-12 w-12 text-xl bg-slate-100 dark:bg-slate-800 ${meta.color}`}>
                      <i className={meta.icon} />
                    </span>
                    <Badge tone="neutral">{meta.label}</Badge>
                  </div>
                  <h3 className="text-[13px] font-extrabold text-slate-700 dark:text-slate-200 mt-3.5 leading-snug line-clamp-2 min-h-[36px]">{d.name}</h3>
                  <p className="text-[11px] text-slate-400 mt-2">
                    <i className="fa-solid fa-tag ms-1" />
                    {d.category} • {d.size}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    <i className="fa-solid fa-calendar ms-1" />
                    {d.date} — {d.owner}
                  </p>
                </div>
                <div className="flex gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="outline" block icon="fa-solid fa-eye" onClick={() => setSelected(d)}>معاينة</Button>
                  <Button size="sm" variant="outline" block icon="fa-solid fa-download">تحميل</Button>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="divide-y divide-slate-100 dark:divide-slate-800">
          {docs.map((d) => {
            const meta = DOC_KIND_META[d.kind];
            return (
              <div key={d.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer" onClick={() => setSelected(d)}>
                <span className={`icon-box h-11 w-11 text-lg bg-slate-100 dark:bg-slate-800 ${meta.color}`}>
                  <i className={meta.icon} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-extrabold text-slate-700 dark:text-slate-200 truncate">{d.name}</p>
                  <p className="text-[11px] text-slate-400">{d.category} • {d.owner} • {d.date}</p>
                </div>
                <span className="text-[11px] font-bold text-slate-400 hidden sm:block">{d.size}</span>
                <Badge tone="neutral">{meta.label}</Badge>
                <div className="flex gap-1.5">
                  <button className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-navy-950 hover:text-white transition-colors">
                    <i className="fa-solid fa-download text-xs" />
                  </button>
                  <button className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-navy-950 hover:text-white transition-colors">
                    <i className="fa-solid fa-share-nodes text-xs" />
                  </button>
                </div>
              </div>
            );
          })}
        </Card>
      )}

      {docs.length === 0 && (
        <Card className="p-10 text-center">
          <i className="fa-solid fa-folder-open text-3xl text-slate-300 dark:text-slate-600 mb-3 block" />
          <p className="text-sm font-extrabold text-slate-500">لا توجد وثائق مطابقة للبحث</p>
        </Card>
      )}

      {/* معاينة */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name ?? ''}
        subtitle={selected ? `${DOC_KIND_META[selected.kind].label} • ${selected.size}` : ''}
        icon={selected ? DOC_KIND_META[selected.kind].icon : 'fa-solid fa-file'}
        size="2xl"
        footer={
          <>
            <Button variant="outline" icon="fa-solid fa-share-nodes">مشاركة</Button>
            <Button variant="outline" icon="fa-solid fa-folder-symlink">إضافة لملف</Button>
            <Button icon="fa-solid fa-download">تحميل</Button>
          </>
        }
      >
        {selected && (
          <div className="space-y-5 animate-fade-in">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 h-72 flex flex-col items-center justify-center gap-3">
              <i className={`${DOC_KIND_META[selected.kind].icon} text-5xl ${DOC_KIND_META[selected.kind].color}`} />
              <p className="text-sm font-extrabold text-slate-500 dark:text-slate-400">معاينة {DOC_KIND_META[selected.kind].label}</p>
              <span className="chip bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-700 text-slate-500">{selected.size}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                ['اسم الوثيقة', selected.name],
                ['التصنيف', selected.category],
                ['المالك', selected.owner],
                ['تاريخ الإضافة', selected.date],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3">
                  <p className="text-[10px] font-bold text-slate-400 mb-1">{k}</p>
                  <p className="text-[12px] font-extrabold text-slate-700 dark:text-slate-200 leading-snug">{v}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <p className="text-xs font-extrabold text-slate-500 dark:text-slate-400 mb-3">سجل الوصول</p>
              <div className="space-y-2.5 text-[12px]">
                {[
                  ['أحمد القيسي', 'تحميل', 'اليوم 08:15'],
                  ['نورة الحمد', 'معاينة', 'أمس 16:42'],
                  ['النظام الآلي', 'أرشفة', '12/10/2026'],
                ].map(([u, a, t]) => (
                  <div key={u} className="flex items-center justify-between">
                    <span className="font-bold text-slate-600 dark:text-slate-300">{u}</span>
                    <span className="text-slate-400">{a}</span>
                    <span className="text-slate-400">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* رفع وثيقة */}
      <Modal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        title="رفع وثيقة جديدة"
        subtitle="الصيغ المدعومة: PDF، Word، Excel، صور، فيديو، DWG"
        icon="fa-solid fa-cloud-arrow-up"
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setUploadOpen(false)}>إلغاء</Button>
            <Button icon="fa-solid fa-upload" onClick={() => setUploadOpen(false)}>رفع وحفظ</Button>
          </>
        }
      >
        <div className="space-y-4">
          <button className="w-full rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 py-10 flex flex-col items-center gap-2 text-slate-400 hover:border-navy-500 hover:text-navy-700 dark:hover:text-emerald-400 transition-colors">
            <i className="fa-solid fa-cloud-arrow-up text-3xl" />
            <span className="text-sm font-extrabold">اسحب الملف هنا أو اضغط للاختيار</span>
            <span className="text-[11px]">الحد الأقصى 50 م.ب لكل ملف</span>
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="التصنيف">
              <Select options={DOCUMENT_CATEGORIES.filter((c) => c !== 'الكل')} />
            </Field>
            <Field label="القسم المالك">
              <Select options={['إدارة التخطيط', 'إدارة الصيانة', 'إدارة التفتيش', 'غرفة العمليات', 'وحدة التحليلات']} />
            </Field>
            <Field label="اسم الوثيقة" className="sm:col-span-2">
              <Input placeholder="مثال: تقرير الأسبوع 42" icon="fa-solid fa-file-signature" />
            </Field>
          </div>
        </div>
      </Modal>
    </div>
  );
}
