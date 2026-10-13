import { useMemo, useState } from 'react';
import { Badge, Button, Card, CardHeader, Input, MapView, PageHeader, Progress, StatCard, type MapMarker } from '../components';
import {
  HERITAGE_SITES,
  INSPECTORS,
  LAND_USES,
  PROJECTS,
  REPORTS,
  TEAMS,
  VEHICLES,
  ZONE_POLYGONS,
  ZONE_STATS,
} from '../data';

interface LayerDef {
  id: string;
  label: string;
  icon: string;
  color: string;
  count?: number;
}

const LAYERS: LayerDef[] = [
  { id: 'reports', label: 'البلاغات', icon: 'fa-solid fa-location-dot', color: '#f59e0b', count: REPORTS.length },
  { id: 'teams', label: 'الفرق الميدانية', icon: 'fa-solid fa-people-group', color: '#0b2545', count: TEAMS.length },
  { id: 'inspectors', label: 'المفتشون', icon: 'fa-solid fa-clipboard-check', color: '#06b6d4', count: INSPECTORS.length },
  { id: 'vehicles', label: 'المركبات', icon: 'fa-solid fa-truck', color: '#8b5cf6', count: VEHICLES.length },
  { id: 'zones', label: 'حدود الأحياء', icon: 'fa-solid fa-draw-polygon', color: '#2c5fa2', count: ZONE_POLYGONS.length },
  { id: 'landuse', label: 'استعمالات الأراضي', icon: 'fa-solid fa-layer-group', color: '#10b981', count: LAND_USES.length },
  { id: 'projects', label: 'المشاريع', icon: 'fa-solid fa-person-digging', color: '#10b981', count: PROJECTS.length },
  { id: 'heritage', label: 'المناطق التراثية', icon: 'fa-solid fa-landmark', color: '#f43f5e', count: HERITAGE_SITES.length },
  { id: 'heat', label: 'خريطة الحرارية', icon: 'fa-solid fa-fire', color: '#ef4444' },
  { id: 'routing', label: 'مسارات التنقل', icon: 'fa-solid fa-route', color: '#10b981' },
];

export default function SmartMap() {
  const [active, setActive] = useState<string[]>(['reports', 'teams', 'zones', 'heat']);
  const [search, setSearch] = useState('');

  const toggle = (id: string) => setActive((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));
  const on = (id: string) => active.includes(id);

  const markers = useMemo<MapMarker[]>(() => {
    const out: MapMarker[] = [];
    if (on('reports')) {
      out.push(
        ...REPORTS.filter((r) => r.status !== 'مغلق').map((r) => ({
          id: r.id,
          lat: r.lat,
          lng: r.lng,
          title: `${r.id} — ${r.type}`,
          kind: (r.severity === 'حرج' ? 'critical' : 'report') as 'critical' | 'report',
          label: `${r.zone} • ${r.status}`,
          popup: `الأولوية: ${r.priority} — ${r.department}`,
        })),
      );
    }
    if (on('teams')) {
      out.push(
        ...TEAMS.map((t) => ({
          id: t.id,
          lat: t.lat,
          lng: t.lng,
          title: t.name,
          kind: 'team' as const,
          label: `${t.status} • ${t.zone}`,
          popup: `القائد: ${t.lead} — ${t.members} أفراد`,
        })),
      );
    }
    if (on('inspectors')) {
      out.push(
        ...INSPECTORS.map((i) => ({
          id: i.id,
          lat: i.lat,
          lng: i.lng,
          title: i.name,
          kind: 'inspector' as const,
          label: `${i.role} • ${i.status}`,
          popup: `المهام النشطة: ${i.activeTasks}`,
        })),
      );
    }
    if (on('vehicles')) {
      out.push(
        ...VEHICLES.map((v) => ({
          id: v.id,
          lat: v.lat,
          lng: v.lng,
          title: v.plate,
          kind: 'vehicle' as const,
          label: `${v.type} • ${v.status}`,
          popup: `الفريق: ${v.team}`,
        })),
      );
    }
    if (on('projects')) {
      out.push(
        ...PROJECTS.map((p) => ({
          id: p.id,
          lat: p.lat,
          lng: p.lng,
          title: p.name,
          kind: 'project' as const,
          label: `${p.zone} • ${p.status}`,
          popup: `نسبة الإنجاز: ${p.progress}%`,
        })),
      );
    }
    if (on('heritage')) {
      out.push(
        ...HERITAGE_SITES.map((h) => ({
          id: h.id,
          lat: h.lat,
          lng: h.lng,
          title: h.name,
          kind: 'project' as const,
          label: `${h.zone} • ${h.status}`,
          popup: 'موقع تراثي محمي',
        })),
      );
    }
    return out;
  }, [active]);

  const polygons = useMemo(() => {
    const out = [];
    if (on('zones')) out.push(...ZONE_POLYGONS.map((z) => ({ points: z.points, color: '#2c5fa2', label: z.name })));
    if (on('landuse')) out.push(...LAND_USES.map((l) => ({ points: l.points, color: l.color, label: l.name })));
    return out;
  }, [active]);

  const heatZones = useMemo(
    () => (on('heat') ? ZONE_STATS.filter((z) => z.open >= 9).map((z) => ({ center: [z.lat, z.lng] as [number, number], radius: 400 + z.open * 45, color: z.open > 18 ? '#ef4444' : '#f59e0b', label: `${z.name} — ${z.open} بلاغ مفتوح` })) : []),
    [active],
  );

  const polylines = useMemo(
    () =>
      on('routing')
        ? [
            { points: [ [24.791, 46.641], [24.79, 46.64], [24.787, 46.646] ] as [number, number][], color: '#10b981' },
            { points: [ [24.741, 46.583], [24.744, 46.586], [24.759, 46.671] ] as [number, number][], color: '#06b6d4', dashed: true },
          ]
        : [],
    [active],
  );

  const legend = LAYERS.filter((l) => active.includes(l.id) && l.color && ['reports', 'teams', 'inspectors', 'vehicles', 'projects', 'heritage'].includes(l.id)).map((l) => ({
    label: l.label,
    color: l.color,
  }));

  const list = markers.filter((m) => !search.trim() || m.title.includes(search) || (m.label ?? '').includes(search)).slice(0, 12);

  return (
    <div className="space-y-6">
      <PageHeader
        title="الخريطة الذكية GIS"
        subtitle="طبقة معلومات جغرافية متكاملة — بلاغات، فرق، مشاريع، استعمالات أراضي"
        icon="fa-solid fa-map-location-dot"
        tone="emerald"
        actions={
          <>
            <Button variant="outline" icon="fa-solid fa-ruler">قياس المسافة</Button>
            <Button variant="outline" icon="fa-solid fa-vector-square">تحديد منطقة</Button>
            <Button icon="fa-solid fa-plus">طبقة جديدة</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="طبقات مفعّلة" value={active.length} icon="fa-solid fa-layer-group" tone="navy" sub={`من أصل ${LAYERS.length} طبقة`} />
        <StatCard label="عناصر على الخريطة" value={markers.length + polygons.length + heatZones.length} icon="fa-solid fa-map-pin" tone="sky" sub="نقاط وحدود ونطاقات" />
        <StatCard label="بلاغات مفتوحة معروضة" value={markers.filter((m) => m.kind === 'report' || m.kind === 'critical').length} icon="fa-solid fa-location-dot" tone="amber" sub="غير مغلقة" />
        <StatCard label="فرق ومراكز نشطة" value={markers.filter((m) => m.kind === 'team' || m.kind === 'vehicle').length} icon="fa-solid fa-truck-fast" tone="emerald" sub="GPS مباشر" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* الخريطة */}
        <Card className="xl:col-span-3 overflow-hidden animate-slide-up">
          <div className="flex items-center gap-3 px-4 pt-4 pb-3 flex-wrap">
            <span className="icon-box h-10 w-10 text-sm bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
              <i className="fa-solid fa-map" />
            </span>
            <div className="min-w-0">
              <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100">عرض الخريطة التشغيلية</h3>
              <p className="text-xs text-slate-400">مصدر البيانات: منظومة GIS — آخر مزامنة قبل دقيقتين</p>
            </div>
            <div className="relative w-56 ms-auto hidden sm:block">
              <i className="fa-solid fa-magnifying-glass absolute start-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} className="input ps-10" placeholder="ابحث عن عنصر..." />
            </div>
          </div>
          <div className="px-4 pb-4">
            <MapView height={520} zoom={12} markers={markers} polygons={polygons} zones={heatZones} polylines={polylines} legend={legend} />
          </div>
        </Card>

        {/* لوحة الطبقات */}
        <div className="space-y-6">
          <Card className="animate-slide-up">
            <CardHeader
              title="الطبقات"
              subtitle="تفعيل وإخفاء الطبقات"
              icon="fa-solid fa-layer-group"
              action={<span className="chip bg-navy-100 text-navy-800 dark:bg-navy-800/50 dark:text-navy-200">{active.length}</span>}
            />
            <div className="px-4 pb-4 space-y-1.5 max-h-[320px] overflow-y-auto">
              {LAYERS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => toggle(l.id)}
                  className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-right transition-all ${
                    on(l.id) ? 'bg-slate-100 dark:bg-slate-800' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span className="h-3 w-3 rounded-full shrink-0 ring-2 ring-white dark:ring-slate-900" style={{ backgroundColor: on(l.id) ? l.color : '#cbd5e1' }} />
                  <span className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs shrink-0 ${on(l.id) ? 'bg-navy-950 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                    <i className={l.icon} />
                  </span>
                  <span className="text-[13px] font-bold text-slate-600 dark:text-slate-300 flex-1 truncate">{l.label}</span>
                  {l.count !== undefined && <span className="text-[10px] font-bold text-slate-400">{l.count}</span>}
                  <span className={`w-8 h-4 rounded-full transition-colors relative ${on(l.id) ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`}>
                    <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all ${on(l.id) ? 'start-4' : 'start-0.5'}`} />
                  </span>
                </button>
              ))}
            </div>
          </Card>

          <Card className="animate-slide-up">
            <CardHeader title="عناصر معروضة" subtitle="اضغط للانتقال" icon="fa-solid fa-list" tone="sky" />
            <div className="px-4 pb-4 space-y-2 max-h-[340px] overflow-y-auto">
              {list.map((m) => (
                <div key={m.id} className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{
                      backgroundColor:
                        m.kind === 'critical' ? '#ef4444' : m.kind === 'report' ? '#f59e0b' : m.kind === 'team' ? '#0b2545' : m.kind === 'inspector' ? '#06b6d4' : m.kind === 'vehicle' ? '#8b5cf6' : '#10b981',
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-extrabold text-slate-700 dark:text-slate-200 truncate">{m.title}</p>
                    <p className="text-[10px] text-slate-400 truncate">{m.label}</p>
                  </div>
                </div>
              ))}
              {list.length === 0 && <p className="text-xs text-slate-400 text-center py-6">لا توجد عناصر مطابقة</p>}
            </div>
          </Card>
        </div>
      </div>

      {/* المشاريع والتراث */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="animate-slide-up">
          <CardHeader title="مشاريع التخطيط الحضري" subtitle="حالة المشاريع على الخريطة" icon="fa-solid fa-person-digging" tone="sky" />
          <div className="px-4 pb-4 space-y-3.5">
            {PROJECTS.map((p) => (
              <div key={p.id} className="rounded-xl border border-slate-200 dark:border-slate-700 p-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[13px] font-extrabold text-slate-700 dark:text-slate-200 leading-snug">{p.name}</p>
                  <Badge tone={p.status === 'متأخر' ? 'critical' : p.status === 'مكتمل' ? 'success' : 'progress'}>{p.status}</Badge>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">{p.id} • {p.zone} • {p.budget}</p>
                <Progress value={p.progress} tone={p.status === 'متأخر' ? 'red' : 'emerald'} size="xs" className="mt-2" showValue />
              </div>
            ))}
          </div>
        </Card>

        <Card className="animate-slide-up">
          <CardHeader title="المناطق التراثية" subtitle="مواقع محمية وفق نظام التراث" icon="fa-solid fa-landmark" tone="rose" />
          <div className="px-4 pb-4 space-y-3">
            {HERITAGE_SITES.map((h) => (
              <div key={h.id} className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 p-3">
                <span className="icon-box h-9 w-9 text-sm bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300">
                  <i className="fa-solid fa-landmark" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-extrabold text-slate-700 dark:text-slate-200 truncate">{h.name}</p>
                  <p className="text-[10px] text-slate-400">{h.zone} • {h.lat}, {h.lng}</p>
                </div>
                <Badge tone={h.status === 'محمي' ? 'success' : 'pending'}>{h.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="animate-slide-up">
          <CardHeader title="استعمالات الأراضي" subtitle="مساحات الأحياء حسب الاستعمال" icon="fa-solid fa-layer-group" tone="emerald" />
          <div className="px-4 pb-4 space-y-3">
            {LAND_USES.map((l) => (
              <div key={l.name} className="flex items-center gap-3">
                <span className="h-3 w-3 rounded shrink-0" style={{ backgroundColor: l.color }} />
                <span className="text-[13px] font-bold text-slate-600 dark:text-slate-300 w-20">{l.name}</span>
                <div className="flex-1">
                  <Progress value={Math.min(100, parseFloat(l.area) * 6)} tone="navy" size="xs" />
                </div>
                <span className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 w-16 text-end">{l.area}</span>
              </div>
            ))}
            <div className="rounded-xl bg-navy-950 text-white p-4 mt-2">
              <p className="text-[11px] text-slate-300 font-bold">إجمالي مساحة الخريطة المشمولة</p>
              <p className="text-xl font-extrabold font-display mt-1">30.0 كم²</p>
              <p className="text-[10px] text-emerald-400 mt-1">
                <i className="fa-solid fa-circle-check ms-1" />
                متوافقة مع منظومة GIS المعتمدة
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
