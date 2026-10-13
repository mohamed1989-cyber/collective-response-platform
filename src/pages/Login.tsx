import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Field, Input } from '../components';
import { useTheme } from '../theme/ThemeContext';

const FEATURES = [
  'استقبال البلاغات من جميع القنوات الرقمية',
  'تصنيف آلي وذكاء اصطناعي متقدم',
  'خريطة ذكية متكاملة ومتابعة ميدانية لحظية',
  'تقارير احترافية وسجل تدقيق شامل',
];

export default function Login() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState('a.alqaisi@plan.gov.sa');
  const [password, setPassword] = useState('••••••••••••');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate('/'), 900);
  };

  return (
    <div className="min-h-screen flex">
      {/* اللوحة التعريفية */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden p-10 xl:p-14 flex-col justify-between" style={{ backgroundImage: 'linear-gradient(150deg, #0b2545 0%, #061730 60%, #082f49 100%)' }}>
        <div className="absolute -top-24 -start-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-0 -end-16 h-80 w-80 rounded-full bg-navy-500/10 blur-3xl" />
        <div className="absolute top-1/3 start-10 w-40 h-40 border border-white/5 rotate-45 rounded-3xl" />

        <div className="relative flex items-center gap-4">
          <span className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/30">
            <i className="fa-solid fa-city" />
          </span>
          <div>
            <p className="text-lg font-extrabold text-white">منصة الاستجابة الجماعية</p>
            <p className="text-xs text-emerald-300 font-bold">وإدارة العمليات الميدانية — إدارة التخطيط الحضري</p>
          </div>
        </div>

        <div className="relative">
          <span className="chip bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-500/30 mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
            مركز القيادة والسيطرة
          </span>
          <h1 className="text-2xl xl:text-3xl font-extrabold text-white leading-snug">
            نظام حكومي متكامل للاستجابة السريعة
            <br />
            وإدارة العمليات الميدانية
          </h1>
          <p className="text-sm text-slate-300 mt-4 leading-relaxed max-w-lg">
            منصة ذكية تجمع البلاغات والحوادث والفرق والمفتشين في واجهة واحدة، مدعومة بالذكاء الاصطناعي ونظم المعلومات الجغرافية،
            قابلة للتوسع إلى نظام إنتاجي كامل.
          </p>
          <ul className="mt-7 space-y-3">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-slate-200">
                <span className="h-7 w-7 rounded-lg bg-emerald-500/15 ring-1 ring-inset ring-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs shrink-0">
                  <i className="fa-solid fa-check" />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex items-center justify-between text-xs text-slate-400">
          <span>© 2026 البلدية — جميع الحقوق محفوظة</span>
          <span className="flex items-center gap-1.5">
            <i className="fa-solid fa-shield-halved text-emerald-400" />
            اتصال مشفّر وآمن (HTTPS)
          </span>
        </div>
      </div>

      {/* النموذج */}
      <div className="flex-1 flex items-center justify-center p-5 sm:p-8 relative">
        <button
          onClick={toggleTheme}
          className="absolute top-5 start-5 h-10 w-10 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="تبديل المظهر"
        >
          <i className={`fa-solid ${theme === 'dark' ? 'fa-sun text-amber-400' : 'fa-moon'}`} />
        </button>

        <div className="w-full max-w-md animate-slide-up">
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <span className="h-12 w-12 rounded-2xl bg-gradient-to-br from-navy-900 to-navy-700 text-white flex items-center justify-center text-xl">
              <i className="fa-solid fa-city" />
            </span>
            <div className="text-center lg:text-start">
              <p className="text-sm font-extrabold text-slate-700 dark:text-slate-200">منصة الاستجابة الجماعية</p>
              <p className="text-[11px] text-slate-400 font-bold">إدارة التخطيط الحضري</p>
            </div>
          </div>

          <div className="card p-6 sm:p-8">
            <div className="text-center mb-6">
              <span className="icon-box h-14 w-14 mx-auto text-xl bg-navy-100 text-navy-900 dark:bg-navy-800/50 dark:text-navy-200 mb-4">
                <i className="fa-solid fa-user-shield" />
              </span>
              <h2 className="text-lg font-extrabold text-slate-800 dark:text-slate-100">تسجيل الدخول</h2>
              <p className="text-xs text-slate-400 mt-1.5">أدخل بيانات حسابك الحكومي المعتمد</p>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <Field label="البريد الرسمي" required>
                <Input
                  type="email"
                  icon="fa-solid fa-envelope"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  dir="ltr"
                  placeholder="name@plan.gov.sa"
                  required
                />
              </Field>
              <Field label="كلمة المرور" required>
                <div className="relative">
                  <Input
                    type={show ? 'text' : 'password'}
                    icon="fa-solid fa-lock"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="ps-10 pe-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    className="absolute end-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    tabIndex={-1}
                  >
                    <i className={`fa-solid ${show ? 'fa-eye-slash' : 'fa-eye'}`} />
                  </button>
                </div>
              </Field>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 font-bold text-slate-500 dark:text-slate-400 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded accent-navy-800" />
                  تذكرني على هذا الجهاز
                </label>
                <button type="button" className="font-extrabold text-navy-700 dark:text-emerald-400 hover:underline">
                  نسيت كلمة المرور؟
                </button>
              </div>

              <Button type="submit" block size="lg" icon="fa-solid fa-right-to-bracket" loading={loading}>
                دخول آمن
              </Button>
            </form>

            <div className="mt-5 rounded-xl bg-sky-50 dark:bg-sky-500/10 ring-1 ring-inset ring-sky-200 dark:ring-sky-500/30 p-3.5 flex items-start gap-3">
              <i className="fa-solid fa-shield-halved text-sky-600 dark:text-sky-400 mt-0.5" />
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                يتم تفعيل <span className="font-extrabold">التحقق الثنائي (MFA)</span> بعد إدخال كلمة المرور عبر تطبيق المصادقة المعتمد.
              </p>
            </div>

            <div className="mt-5 pt-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>
                <i className="fa-solid fa-fingerprint ms-1" />
                بيئة حكومية آمنة
              </span>
              <span>الإصدار 1.0.0</span>
            </div>
          </div>

          <p className="text-center text-[11px] text-slate-400 mt-6">
            © 2026 البلدية — إدارة التخطيط الحضري • جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </div>
  );
}
