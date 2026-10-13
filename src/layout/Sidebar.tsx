import { NavLink } from 'react-router-dom';

interface NavSection {
  label: string;
  items: { to: string; label: string; icon: string; badge?: string | number; tone?: 'red' | 'emerald' | 'sky' }[];
}

const SECTIONS: NavSection[] = [
  {
    label: 'الرئيسية',
    items: [{ to: '/', label: 'لوحة التحكم', icon: 'fa-solid fa-gauge-high' }],
  },
  {
    label: 'الاستقبال والبلاغات',
    items: [
      { to: '/intake', label: 'مركز استقبال البلاغات', icon: 'fa-solid fa-inbox' },
      { to: '/reports', label: 'البلاغات والطلبات', icon: 'fa-solid fa-file-lines', badge: 36, tone: 'sky' },
      { to: '/incidents', label: 'إدارة الحوادث', icon: 'fa-solid fa-triangle-exclamation', badge: 4, tone: 'red' },
    ],
  },
  {
    label: 'العمليات الميدانية',
    items: [
      { to: '/map', label: 'الخريطة الذكية', icon: 'fa-solid fa-map-location-dot' },
      { to: '/teams', label: 'فرق الاستجابة', icon: 'fa-solid fa-people-group' },
      { to: '/inspectors', label: 'المفتشون', icon: 'fa-solid fa-clipboard-check' },
      { to: '/tasks', label: 'المهام الميدانية', icon: 'fa-solid fa-list-check', badge: 12, tone: 'emerald' },
    ],
  },
  {
    label: 'التحليل والوثائق',
    items: [
      { to: '/analytics', label: 'التحليلات', icon: 'fa-solid fa-chart-pie' },
      { to: '/documents', label: 'مركز الوثائق', icon: 'fa-solid fa-folder-open' },
      { to: '/reports-center', label: 'التقارير', icon: 'fa-solid fa-file-export' },
    ],
  },
  {
    label: 'الاتصالات',
    items: [
      { to: '/communications', label: 'التواصل الجماعي', icon: 'fa-solid fa-comments', badge: 8, tone: 'sky' },
      { to: '/notifications', label: 'الإشعارات', icon: 'fa-solid fa-bell', badge: 4, tone: 'red' },
    ],
  },
  {
    label: 'الإدارة والصلاحيات',
    items: [
      { to: '/users', label: 'المستخدمون والصلاحيات', icon: 'fa-solid fa-users-gear' },
      { to: '/audit', label: 'سجل العمليات', icon: 'fa-solid fa-clock-rotate-left' },
      { to: '/settings', label: 'الإعدادات', icon: 'fa-solid fa-gear' },
    ],
  },
];

const badgeClasses = {
  red: 'bg-red-500 text-white',
  emerald: 'bg-emerald-500 text-white',
  sky: 'bg-sky-500 text-white',
};

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({ collapsed, mobileOpen, onCloseMobile }: SidebarProps) {
  const width = collapsed ? 'lg:w-[76px]' : 'lg:w-[268px]';

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm lg:hidden animate-fade-in" onClick={onCloseMobile} />
      )}
      <aside
        className={`fixed inset-y-0 start-0 z-40 flex flex-col bg-navy-950 text-white w-[268px] ${width} transition-all duration-300 border-s border-white/5 ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:translate-x-0`}
        style={{ backgroundImage: 'linear-gradient(180deg, #0b2545 0%, #081b36 100%)' }}
      >
        {/* الشعار */}
        <div className="flex items-center gap-3 px-4 h-[72px] shrink-0 border-b border-white/10">
          <span className="h-11 w-11 shrink-0 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-lg shadow-lg shadow-emerald-500/30">
            <i className="fa-solid fa-city" />
          </span>
          {!collapsed && (
            <div className="min-w-0 leading-tight">
              <p className="text-[13px] font-extrabold truncate">منصة الاستجابة الجماعية</p>
              <p className="text-[10px] text-emerald-300/90 font-bold truncate">إدارة التخطيط الحضري — بلدية</p>
            </div>
          )}
        </div>

        {/* التنقل */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-none">
          {SECTIONS.map((section) => (
            <div key={section.label}>
              {!collapsed && (
                <p className="px-3 mb-2 text-[10px] font-extrabold tracking-wider text-slate-400/80 uppercase">{section.label}</p>
              )}
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      onClick={onCloseMobile}
                      title={collapsed ? item.label : undefined}
                      className={({ isActive }) =>
                        `nav-link ${isActive ? 'nav-link-active' : ''} ${collapsed ? 'lg:justify-center lg:px-0' : ''}`
                      }
                    >
                      <span className="w-5 text-center shrink-0">
                        <i className={item.icon} />
                      </span>
                      {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                      {!collapsed && item.badge !== undefined && (
                        <span className={`text-[10px] rounded-full px-1.5 py-0.5 font-extrabold ${badgeClasses[item.tone ?? 'sky']}`}>
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* حالة النظام */}
        <div className="p-3 shrink-0 border-t border-white/10">
          <div className={`rounded-2xl bg-white/5 border border-white/10 p-3 ${collapsed ? 'lg:px-2' : ''}`}>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-soft shrink-0" />
              {!collapsed && (
                <div className="min-w-0">
                  <p className="text-[11px] font-extrabold">الأنظمة تعمل بكفاءة</p>
                  <p className="text-[10px] text-slate-400">جاهزية المنصة 98% — الإصدار 1.0.0</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
