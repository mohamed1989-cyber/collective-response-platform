import { useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardHeader,
  MapView,
  Modal,
  PageHeader,
  Progress,
  StatCard,
  Table,
  Tabs,
} from '../components';
import { SHIFTS, TEAMS, VEHICLES, type Team } from '../data';

const CREW = ['عبدالعزيز الشهري', 'نايف السبيعي', 'مشعل العتيبي', 'وليد الدوسري', 'عمر باوزير', 'سامي الزهراني', 'راكان المطيري', 'بدر الحارثي'];

function teamStatusTone(status: string) {
  if (status === 'متاح') return 'success' as const;
  if (status === 'في المهمة' || status === 'في الطريق') return 'progress' as const;
  if (status === 'تحت الصيانة') return 'medium' as const;
  return 'closed' as const;
}

function vehicleStatusTone(status: string) {
  if (status === 'جاهزة') return 'success' as const;
  if (status === 'في مهمة' || status === 'في الطريق') return 'progress' as const;
  if (status === 'صيانة') return 'medium' as const;
  return 'closed' as const;
}

export default function Teams() {
  const [tab, setTab] = useState('teams');
  const [selected, setSelected] = useState<Team | null>(null);

  const stats = {
    total: TEAMS.length,
    onMission: TEAMS.filter((t) => t.status === 'في المهمة' || t.status === 'في الطريق').length,
    ready: TEAMS.filter((t) => t.status === 'متاح').length,
    avgReadiness: Math.round(TEAMS.reduce((s, t) => s + t.readiness, 0) / TEAMS.length),
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="فرق الاستجابة"
        subtitle="إدارة الفرق والمركبات والمعدات والمناوبات ومواقع GPS"
        icon="fa-solid fa-people-group"
        actions={
          <>
            <Button variant="outline" icon="fa-solid fa-calendar-days">المناوبات</Button>
            <Button variant="outline" icon="fa-solid fa-file-export">تصدير</Button>
            <Button icon="fa-solid fa-plus">فريق جديد</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="إجمالي الفرق" value={stats.total} icon="fa-solid fa-people-group" tone="navy" sub="ضمن إدارة العمليات" />
        <StatCard label="في المهمة الآن" value={stats.onMission} icon="fa-solid fa-person-running" tone="amber" delta={{ value: '2' }} sub="مهام ميدانية جارية" />
        <StatCard label="فرق متاحة" value={stats.ready} icon="fa-solid fa-circle-check" tone="emerald" sub="جاهزة للتكليف فوراً" />
        <StatCard label="متوسط الجاهزية" value={`${stats.avgReadiness}%`} icon="fa-solid fa-battery-full" tone="sky" delta={{ value: '3%' }} sub="مستهدف 90%" />
      </div>

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Tabs
          active={tab}
          onChange={setTab}
          tabs={[
            { id: 'teams', label: 'الفرق', icon: 'fa-solid fa-people-group', count: TEAMS.length },
            { id: 'vehicles', label: 'المركبات', icon: 'fa-solid fa-truck', count: VEHICLES.length },
            { id: 'shifts', label: 'المناوبات', icon: 'fa-solid fa-clock', count: SHIFTS.length },
          ]}
        />
        <div className="flex items-center gap-2">
          <span className="chip bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/30">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-soft" />
            تحديث GPS كل 30 ثانية
          </span>
        </div>
      </div>

      {tab === 'teams' && (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 animate-fade-in">
          {TEAMS.map((t) => (
            <Card key={t.id} hover className="p-5 flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="icon-box h-11 w-11 text-base bg-navy-950 text-white shrink-0">
                    <i className="fa-solid fa-people-group" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 truncate">{t.name}</h3>
                    <p className="text-[11px] text-slate-400 font-bold">{t.code} • {t.type}</p>
                  </div>
                </div>
                <Badge tone={teamStatusTone(t.status)} dot pulse={t.status === 'في المهمة'}>
                  {t.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2.5 mt-4">
                <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-2.5">
                  <p className="text-[10px] font-bold text-slate-400">قائد الفريق</p>
                  <p className="text-[12px] font-extrabold text-slate-700 dark:text-slate-200 truncate">{t.lead}</p>
                </div>
                <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-2.5">
                  <p className="text-[10px] font-bold text-slate-400">عدد الأفراد</p>
                  <p className="text-[12px] font-extrabold text-slate-700 dark:text-slate-200">{t.members} أفراد</p>
                </div>
                <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-2.5">
                  <p className="text-[10px] font-bold text-slate-400">الحي</p>
                  <p className="text-[12px] font-extrabold text-slate-700 dark:text-slate-200 truncate">{t.zone}</p>
                </div>
                <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-2.5">
                  <p className="text-[10px] font-bold text-slate-400">آخر تحديث GPS</p>
                  <p className="text-[12px] font-extrabold text-slate-700 dark:text-slate-200">{t.lastUpdate}</p>
                </div>
              </div>

              <div className="space-y-3 mt-4">
                <Progress label="الجاهزية" value={t.readiness} tone={t.readiness >= 90 ? 'emerald' : t.readiness >= 80 ? 'amber' : 'red'} showValue />
                <Progress label="مؤشر الأداء" value={t.performance} tone="navy" showValue />
              </div>

              <div className="flex items-center gap-1.5 flex-wrap mt-4">
                {t.equipment.slice(0, 3).map((e) => (
                  <span key={e} className="chip bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">{e}</span>
                ))}
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button size="sm" variant="outline" icon="fa-solid fa-map-location-dot" onClick={() => setSelected(t)} className="flex-1">
                  التتبع
                </Button>
                <Button size="sm" icon="fa-solid fa-arrow-left" onClick={() => setSelected(t)} className="flex-1">
                  التفاصيل
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'vehicles' && (
        <Card className="overflow-hidden animate-fade-in">
          <CardHeader
            title="المركبات والمعدات المتحركة"
            subtitle="حالة المركبات ومستويات الوقود ومواقع GPS"
            icon="fa-solid fa-truck"
            action={<Badge tone="info">{VEHICLES.length} مركبة</Badge>}
          />
          <Table>
            <thead>
              <tr>
                <th>لوحة المركبة</th>
                <th>النوع</th>
                <th>الفريق</th>
                <th>الحالة</th>
                <th>مستوى الوقود</th>
                <th>آخر إشارة GPS</th>
                <th>الموقع</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {VEHICLES.map((v) => (
                <tr key={v.id}>
                  <td className="font-extrabold text-navy-800 dark:text-navy-300 whitespace-nowrap">{v.plate}</td>
                  <td>{v.type}</td>
                  <td className="whitespace-nowrap text-xs">{v.team}</td>
                  <td><Badge tone={vehicleStatusTone(v.status)} dot pulse={v.status === 'في مهمة'}>{v.status}</Badge></td>
                  <td className="min-w-[140px]">
                    <Progress value={v.fuel} tone={v.fuel > 50 ? 'emerald' : v.fuel > 30 ? 'amber' : 'red'} size="xs" showValue />
                  </td>
                  <td className="text-xs text-slate-400 whitespace-nowrap">{v.lastPing}</td>
                  <td className="text-xs font-bold whitespace-nowrap">{v.lat}, {v.lng}</td>
                  <td>
                    <div className="flex gap-1.5">
                      <button className="h-8 w-8 rounded-lg bg-navy-100 text-navy-800 dark:bg-navy-800/60 dark:text-navy-200 hover:bg-navy-200 transition-colors" title="تتبع">
                        <i className="fa-solid fa-location-crosshairs text-xs" />
                      </button>
                      <button className="h-8 w-8 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 hover:bg-emerald-200 transition-colors" title="اتصال">
                        <i className="fa-solid fa-phone text-xs" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      )}

      {tab === 'shifts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 animate-fade-in">
          {SHIFTS.map((s) => (
            <Card key={s.id} hover className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="icon-box h-11 w-11 text-base bg-gradient-to-br from-navy-900 to-navy-700 text-white">
                    <i className="fa-solid fa-clock" />
                  </span>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100">{s.name}</h3>
                    <p className="text-[11px] text-slate-400 font-bold">{s.time}</p>
                  </div>
                </div>
                <Badge tone={s.status === 'جارية' ? 'active' : 'pending'} dot pulse={s.status === 'جارية'}>
                  {s.status}
                </Badge>
              </div>
              <div className="mt-4 space-y-2.5">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-slate-400 font-bold">الفريق</span>
                  <span className="font-extrabold text-slate-700 dark:text-slate-200">{s.team}</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-slate-400 font-bold">المشرف</span>
                  <span className="font-extrabold text-slate-700 dark:text-slate-200">{s.supervisor}</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-slate-400 font-bold">عدد الأفراد</span>
                  <span className="font-extrabold text-slate-700 dark:text-slate-200">{s.crew}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" block icon="fa-solid fa-rotate">تعديل المناوبة</Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* نافذة تفاصيل الفريق */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name ?? ''}
        subtitle={selected ? `${selected.code} • ${selected.type}` : ''}
        icon="fa-solid fa-people-group"
        size="2xl"
        footer={
          <>
            <Button variant="outline" onClick={() => setSelected(null)}>إغلاق</Button>
            <Button variant="success" icon="fa-solid fa-tower-broadcast">إرسال أمر ميداني</Button>
          </>
        }
      >
        {selected && (
          <div className="space-y-5 animate-fade-in">
            <MapView
              height={240}
              zoom={14}
              center={[selected.lat, selected.lng]}
              markers={[{ id: selected.id, lat: selected.lat, lng: selected.lng, title: selected.name, kind: 'team', label: `${selected.status} — ${selected.zone}` }]}
              legend={[{ label: 'موقع الفريق (GPS)', color: '#0b2545' }]}
            />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                ['الحالة', selected.status],
                ['المناوبة', selected.shift],
                ['القائد', selected.lead],
                ['الأفراد', `${selected.members} أفراد`],
                ['الجاهزية', `${selected.readiness}%`],
                ['الأداء', `${selected.performance}%`],
                ['المركبة', selected.vehicle],
                ['آخر تحديث', selected.lastUpdate],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3">
                  <p className="text-[10px] font-bold text-slate-400 mb-1">{k}</p>
                  <p className="text-[12px] font-extrabold text-slate-700 dark:text-slate-200 leading-snug">{v}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                <p className="text-xs font-extrabold text-slate-500 dark:text-slate-400 mb-3">أفراد الفريق</p>
                <div className="space-y-2.5">
                  {CREW.slice(0, selected.members).map((m, i) => (
                    <div key={m} className="flex items-center gap-3">
                      <Avatar name={m} size="sm" tone={i === 0 ? 'navy' : i % 2 ? 'emerald' : 'sky'} />
                      <div className="min-w-0">
                        <p className="text-[12px] font-extrabold text-slate-700 dark:text-slate-200 truncate">{m}</p>
                        <p className="text-[10px] text-slate-400">{i === 0 ? 'قائد الفريق' : 'عضو'}</p>
                      </div>
                      <Badge tone={i < selected.members - 1 ? 'active' : 'progress'} className="ms-auto">
                        {i < selected.members - 1 ? 'مهمة' : 'متجه'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                <p className="text-xs font-extrabold text-slate-500 dark:text-slate-400 mb-3">المعدات المتوفرة</p>
                <div className="space-y-3">
                  {selected.equipment.map((e) => (
                    <div key={e} className="flex items-center justify-between gap-3">
                      <span className="text-[12px] font-bold text-slate-600 dark:text-slate-300">{e}</span>
                      <Badge tone="success" dot>جاهز</Badge>
                    </div>
                  ))}
                  <div className="pt-2">
                    <Progress label="الجاهزية الإجمالية" value={selected.readiness} tone="emerald" showValue />
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
