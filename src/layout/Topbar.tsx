import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Button, Dropdown } from '../components';
import { useTheme } from '../theme/ThemeContext';
import { NOTIFICATIONS } from '../data';

const DAYS = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
const MONTHS = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

function pad(n: number) {
  return n < 10 ? `0${n}` : String(n);
}

interface TopbarProps {
  onToggleSidebar: () => void;
  onOpenMobile: () => void;
}

export function Topbar({ onToggleSidebar, onOpenMobile }: TopbarProps) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dateLabel = `${DAYS[now.getDay()]} ${now.getDate()} ${MONTHS[now.getMonth()]} ${now.getFullYear()}`;
  const timeLabel = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const unread = NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <header className="h-[72px] shrink-0 flex items-center gap-3 px-4 sm:px-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200/80 dark:border-slate-800 sticky top-0 z-20">
      <button
        onClick={onOpenMobile}
        className="lg:hidden h-10 w-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="فتح القائمة"
      >
        <i className="fa-solid fa-bars" />
      </button>
      <button
        onClick={onToggleSidebar}
        className="hidden lg:flex h-10 w-10 rounded-xl items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="طي القائمة"
      >
        <i className="fa-solid fa-arrows-rotate" />
      </button>

      {/* البحث */}
      <div className="relative hidden md:block w-72 lg:w-96">
        <i className="fa-solid fa-magnifying-glass absolute start-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
        <input className="input ps-10 bg-slate-50 dark:bg-slate-800/60" placeholder="ابحث عن بلاغ، فريق، حادث، وثيقة..." />
        <kbd className="absolute end-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5 hidden lg:block">
          Ctrl K
        </kbd>
      </div>

      <div className="flex items-center gap-2 ms-auto">
        {/* الساعة */}
        <div className="hidden xl:flex flex-col items-end leading-tight px-3">
          <span className="text-sm font-extrabold text-slate-700 dark:text-slate-200 font-display tabular-nums">{timeLabel}</span>
          <span className="text-[10px] font-bold text-slate-400">{dateLabel}</span>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 ring-1 ring-inset ring-emerald-200 dark:ring-emerald-500/30 px-2.5 py-1.5 text-[11px] font-bold">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-soft" />
          بث مباشر
        </span>

        {/* إجراء سريع */}
        <Dropdown
          align="end"
          width="w-56"
          trigger={
            <span className="hidden sm:inline-flex">
              <Button icon="fa-solid fa-plus" size="md">
                إجراء سريع
                <i className="fa-solid fa-chevron-down text-[10px] opacity-70" />
              </Button>
            </span>
          }
        >
          <div className="p-1.5">
            {[
              { label: 'تسجيل بلاغ جديد', icon: 'fa-solid fa-inbox', to: '/intake' },
              { label: 'إنشاء مهمة ميدانية', icon: 'fa-solid fa-list-check', to: '/tasks' },
              { label: 'فتح حادث جديد', icon: 'fa-solid fa-triangle-exclamation', to: '/incidents' },
              { label: 'إنشاء تقرير', icon: 'fa-solid fa-file-export', to: '/reports-center' },
            ].map((a) => (
              <button
                key={a.label}
                onClick={() => navigate(a.to)}
                className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <i className={`${a.icon} text-navy-700 dark:text-emerald-400 w-4`} />
                {a.label}
              </button>
            ))}
          </div>
        </Dropdown>

        {/* الإشعارات */}
        <Dropdown
          align="end"
          width="w-80 sm:w-96"
          trigger={
            <button className="relative h-10 w-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <i className="fa-solid fa-bell text-lg" />
              {unread > 0 && (
                <span className="absolute -top-0.5 -end-0.5 min-w-4 h-4 px-1 rounded-full bg-red-500 text-white text-[9px] font-extrabold flex items-center justify-center animate-pulse-soft">
                  {unread}
                </span>
              )}
            </button>
          }
        >
          <div>
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700">
              <p className="text-sm font-extrabold text-slate-700 dark:text-slate-200">الإشعارات الفورية</p>
              <span className="text-[10px] font-bold text-navy-700 dark:text-emerald-400">تعليم الكل كمقروء</span>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {NOTIFICATIONS.slice(0, 6).map((n) => (
                <Link
                  key={n.id}
                  to="/notifications"
                  className={`flex gap-3 px-4 py-3 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                    n.read ? 'opacity-60' : ''
                  }`}
                >
                  <span
                    className={`icon-box h-9 w-9 text-xs shrink-0 ${
                      n.type === 'alert'
                        ? 'bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-300'
                        : n.type === 'task'
                          ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300'
                          : 'bg-navy-100 text-navy-700 dark:bg-navy-800/50 dark:text-navy-200'
                    }`}
                  >
                    <i className={
                      n.type === 'alert' ? 'fa-solid fa-triangle-exclamation' : n.type === 'task' ? 'fa-solid fa-list-check' : 'fa-solid fa-circle-info'
                    } />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-extrabold text-slate-700 dark:text-slate-200 truncate">{n.title}</span>
                    <span className="block text-[11px] text-slate-400 line-clamp-2 leading-snug">{n.body}</span>
                    <span className="block text-[10px] text-slate-400 mt-1">{n.time}</span>
                  </span>
                  {!n.read && <span className="h-2 w-2 rounded-full bg-navy-700 dark:bg-emerald-400 shrink-0 mt-1.5" />}
                </Link>
              ))}
            </div>
            <Link to="/notifications" className="block text-center text-xs font-extrabold text-navy-700 dark:text-emerald-400 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50">
              عرض جميع الإشعارات
            </Link>
          </div>
        </Dropdown>

        {/* الوضع الليلي */}
        <button
          onClick={toggleTheme}
          className="h-10 w-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="تبديل المظهر"
        >
          <i className={`fa-solid ${theme === 'dark' ? 'fa-sun text-amber-400' : 'fa-moon text-navy-700'}`} />
        </button>

        <span className="hidden sm:block h-8 w-px bg-slate-200 dark:bg-slate-700" />

        {/* المستخدم */}
        <Dropdown
          align="end"
          width="w-64"
          trigger={
            <button className="flex items-center gap-2.5 rounded-xl ps-1 pe-2.5 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Avatar name="أحمد القيسي" size="sm" tone="navy" />
              <span className="hidden sm:flex flex-col items-start leading-tight">
                <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200">أحمد القيسي</span>
                <span className="text-[10px] text-slate-400 font-bold">مدير النظام</span>
              </span>
              <i className="fa-solid fa-chevron-down text-[10px] text-slate-400 hidden sm:block" />
            </button>
          }
        >
          <div className="p-1.5">
            <div className="px-3 py-2.5 border-b border-slate-200 dark:border-slate-700 mb-1">
              <p className="text-sm font-extrabold text-slate-700 dark:text-slate-200">أحمد القيسي</p>
              <p className="text-[11px] text-slate-400">a.alqaisi@plan.gov.sa</p>
            </div>
            {[
              { label: 'الملف الشخصي', icon: 'fa-solid fa-user' },
              { label: 'الأمان وكلمة المرور', icon: 'fa-solid fa-lock' },
              { label: 'الإعدادات', icon: 'fa-solid fa-gear', to: '/settings' },
            ].map((i) => (
              <button
                key={i.label}
                onClick={() => i.to && navigate(i.to)}
                className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <i className={`${i.icon} w-4 text-slate-400`} />
                {i.label}
              </button>
            ))}
            <button
              onClick={() => navigate('/login')}
              className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors border-t border-slate-200 dark:border-slate-700 mt-1"
            >
              <i className="fa-solid fa-right-from-bracket w-4" />
              تسجيل الخروج
            </button>
          </div>
        </Dropdown>
      </div>
    </header>
  );
}
