import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardHeader,
  Field,
  Input,
  MapView,
  PageHeader,
  Progress,
  Table,
  Timeline,
  severityTone,
  reportStatusTone,
} from '../components';
import { DOC_KIND_META, INCIDENTS, REPORTS } from '../data';

export default function IncidentDetail() {
  const { id } = useParams();
  const incident = INCIDENTS.find((i) => i.id === id) ?? INCIDENTS[0];
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState(incident.notes);

  const addNote = () => {
    if (!note.trim()) return;
    setNotes([{ author: 'أحمد القيسي', role: 'مدير النظام', time: 'الآن', text: note.trim() }, ...notes]);
    setNote('');
  };

  const related = REPORTS.filter((r) => r.zone === incident.zone).slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
        <Link to="/incidents" className="hover:text-navy-700 dark:hover:text-emerald-400 transition-colors">
          <i className="fa-solid fa-arrow-right ms-1" />
          إدارة الحوادث
        </Link>
        <i className="fa-solid fa-chevron-left text-[9px]" />
        <span className="text-slate-600 dark:text-slate-300">{incident.id}</span>
      </div>

      <PageHeader
        title={incident.title}
        subtitle={`${incident.id} • ${incident.zone} — ${incident.address}`}
        icon="fa-solid fa-circle-exclamation"
        tone="red"
        badge={
          <>
            <Badge tone={severityTone(incident.severity)} dot pulse>{incident.severity}</Badge>
            <Badge tone={reportStatusTone(incident.status)}>{incident.status}</Badge>
          </>
        }
        actions={
          <>
            <Button variant="outline" icon="fa-solid fa-print">طباعة</Button>
            <Button variant="outline" icon="fa-solid fa-file-pdf">تقرير الحادث</Button>
            <Button variant="success" icon="fa-solid fa-check">تحديث الحالة</Button>
          </>
        }
      />

      <Card className="p-5">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            ['التصنيف', incident.category, 'fa-solid fa-tags'],
            ['القائد الميداني', incident.commander, 'fa-solid fa-user-shield'],
            ['وقت البداية', incident.startedAt, 'fa-solid fa-play'],
            ['وقت البلاغ', incident.reportedAt, 'fa-solid fa-bell'],
            ['نطاق التأثر', incident.affected, 'fa-solid fa-people-roof'],
          ].map(([k, v, icon]) => (
            <div key={k} className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3.5">
              <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5 mb-1">
                <i className={`${icon} text-navy-700 dark:text-emerald-400`} />
                {k}
              </p>
              <p className="text-[13px] font-extrabold text-slate-700 dark:text-slate-200 leading-snug">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Progress label="نسبة معالجة الحادث" value={incident.progress} tone={incident.progress === 100 ? 'emerald' : 'red'} size="md" showValue />
        </div>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* العمود الرئيسي */}
        <div className="xl:col-span-2 space-y-6">
          <Card>
            <CardHeader title="البيانات الأساسية" icon="fa-solid fa-circle-info" />
            <div className="px-5 pb-5">
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed rounded-xl bg-slate-50 dark:bg-slate-800/60 p-4">
                {incident.description}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                {[
                  ['الصور', incident.photos],
                  ['مقاطع الفيديو', incident.videos],
                  ['الوثائق', incident.docs.length],
                  ['الأحداث المسجلة', incident.events.length],
                ].map(([k, v]) => (
                  <div key={k as string} className="rounded-xl border border-slate-200 dark:border-slate-700 p-3 text-center">
                    <p className="text-xl font-extrabold text-navy-800 dark:text-emerald-400 font-display">{v as number}</p>
                    <p className="text-[10px] font-bold text-slate-400">{k as string}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader
              title="سجل الأحداث"
              subtitle="الخط الزمني للحادث من البداية للحالة الحالية"
              icon="fa-solid fa-timeline"
              tone="violet"
              action={<Badge tone="info">تحديث لحظي</Badge>}
            />
            <div className="px-5 pb-5">
              <Timeline items={incident.events} />
            </div>
          </Card>

          <Card>
            <CardHeader
              title="القرارات المتخذة"
              subtitle="قرارات القيادة المعتمدة"
              icon="fa-solid fa-gavel"
              tone="amber"
              action={<Button size="sm" variant="outline" icon="fa-solid fa-plus">قرار جديد</Button>}
            />
            <Table>
              <thead>
                <tr>
                  <th>التاريخ</th>
                  <th>القرار</th>
                  <th>المعتمد</th>
                  <th>الملاحظة</th>
                </tr>
              </thead>
              <tbody>
                {incident.decisions.map((d) => (
                  <tr key={d.id}>
                    <td className="whitespace-nowrap text-xs text-slate-400">{d.date}</td>
                    <td className="font-extrabold text-slate-700 dark:text-slate-200">{d.title}</td>
                    <td className="whitespace-nowrap">{d.by}</td>
                    <td className="text-xs">{d.note}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>

          <Card>
            <CardHeader title="الملاحظات الميدانية" subtitle={`${notes.length} ملاحظة`} icon="fa-solid fa-comment-dots" tone="sky" />
            <div className="px-5 pb-5 space-y-4">
              <div className="flex gap-3">
                <Avatar name="أحمد القيسي" size="md" tone="navy" />
                <div className="flex-1">
                  <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="أضف ملاحظة ميدانية جديدة..." onKeyDown={(e) => e.key === 'Enter' && addNote()} />
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" onClick={addNote} icon="fa-solid fa-paper-plane">إرسال</Button>
                    <Button size="sm" variant="ghost" icon="fa-solid fa-camera">صورة</Button>
                    <Button size="sm" variant="ghost" icon="fa-solid fa-location-crosshairs">موقع</Button>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                {notes.map((n, i) => (
                  <div key={i} className="flex gap-3 rounded-xl border border-slate-200 dark:border-slate-700 p-3.5">
                    <Avatar name={n.author} size="sm" tone="emerald" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-[13px] font-extrabold text-slate-700 dark:text-slate-200">{n.author}</p>
                        <span className="text-[10px] font-bold text-navy-700 dark:text-emerald-400">{n.role}</span>
                        <span className="text-[10px] text-slate-400 ms-auto">{n.time}</span>
                      </div>
                      <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{n.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* العمود الجانبي */}
        <div className="space-y-6">
          <Card>
            <CardHeader title="الموقع" subtitle={incident.address} icon="fa-solid fa-map-location-dot" tone="emerald" />
            <div className="px-5 pb-5">
              <MapView
                height={240}
                zoom={15}
                center={[incident.lat, incident.lng]}
                markers={[{ id: incident.id, lat: incident.lat, lng: incident.lng, title: incident.title, kind: 'incident', label: incident.zone }]}
                legend={[{ label: 'مركز الحادث', color: '#dc2626' }]}
              />
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-2.5 text-center">
                  <p className="text-[10px] font-bold text-slate-400">خط العرض</p>
                  <p className="text-[12px] font-extrabold text-slate-700 dark:text-slate-200 font-display">{incident.lat}</p>
                </div>
                <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-2.5 text-center">
                  <p className="text-[10px] font-bold text-slate-400">خط الطول</p>
                  <p className="text-[12px] font-extrabold text-slate-700 dark:text-slate-200 font-display">{incident.lng}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="الفرق المشاركة" icon="fa-solid fa-people-group" />
            <div className="px-5 pb-5 space-y-3">
              {incident.teams.map((t) => (
                <div key={t} className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 p-3">
                  <span className="icon-box h-9 w-9 text-sm bg-navy-100 text-navy-800 dark:bg-navy-800/50 dark:text-navy-200">
                    <i className="fa-solid fa-people-group" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-extrabold text-slate-700 dark:text-slate-200 truncate">{t}</p>
                    <p className="text-[10px] text-slate-400">مُنشر ميدانياً</p>
                  </div>
                  <Badge tone="active" dot>نشط</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="الصور والفيديو" icon="fa-solid fa-photo-film" tone="violet" />
            <div className="px-5 pb-5 grid grid-cols-3 gap-2">
              {Array.from({ length: Math.min(6, incident.photos) }).map((_, i) => (
                <div key={i} className="aspect-square rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center text-slate-400 hover:scale-105 transition-transform cursor-pointer relative">
                  <i className={`fa-solid ${i === 0 && incident.videos > 0 ? 'fa-play' : 'fa-image'} text-lg`} />
                  {i === 0 && incident.videos > 0 && (
                    <span className="absolute bottom-1 start-1 text-[8px] bg-black/60 text-white rounded px-1">01:24</span>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="الوثائق والمخططات" icon="fa-solid fa-folder-open" tone="sky" />
            <div className="px-5 pb-5 space-y-2.5">
              {incident.docs.map((d) => {
                const kind = d.type === 'PDF' ? 'pdf' : d.type === 'Excel' ? 'excel' : d.type === 'Word' ? 'word' : 'cad';
                const meta = DOC_KIND_META[kind];
                return (
                  <div key={d.name} className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                    <i className={`${meta.icon} ${meta.color} text-lg w-5 text-center`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-[12px] font-extrabold text-slate-700 dark:text-slate-200 truncate">{d.name}</p>
                      <p className="text-[10px] text-slate-400">{d.type} • {d.date}</p>
                    </div>
                    <i className="fa-solid fa-download text-slate-400 text-xs" />
                  </div>
                );
              })}
            </div>
          </Card>

          <Card>
            <CardHeader title="بلاغات مرتبطة" subtitle="نفس المنطقة" icon="fa-solid fa-link" tone="amber" />
            <div className="px-5 pb-5 space-y-2.5">
              {related.map((r) => (
                <Link key={r.id} to="/reports" className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <span className="text-[11px] font-extrabold text-navy-800 dark:text-emerald-400">{r.id}</span>
                  <span className="text-[12px] text-slate-500 dark:text-slate-400 truncate flex-1">{r.type}</span>
                  <Badge tone={severityTone(r.severity)}>{r.severity}</Badge>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
