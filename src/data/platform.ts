/* بيانات المنصة: الوثائق، الإشعارات، التواصل، المستخدمون، الصلاحيات، السجل، المؤشرات */

/* ---------------- مركز الوثائق ---------------- */

export type DocKind = 'pdf' | 'excel' | 'word' | 'image' | 'video' | 'cad' | 'archive';

export interface DocItem {
  id: string;
  name: string;
  kind: DocKind;
  category: string;
  size: string;
  date: string;
  owner: string;
}

export const DOC_KIND_META: Record<DocKind, { label: string; icon: string; color: string }> = {
  pdf: { label: 'PDF', icon: 'fa-solid fa-file-pdf', color: 'text-red-500' },
  excel: { label: 'Excel', icon: 'fa-solid fa-file-excel', color: 'text-emerald-500' },
  word: { label: 'Word', icon: 'fa-solid fa-file-word', color: 'text-blue-500' },
  image: { label: 'صورة', icon: 'fa-solid fa-file-image', color: 'text-violet-500' },
  video: { label: 'فيديو', icon: 'fa-solid fa-file-video', color: 'text-amber-500' },
  cad: { label: 'مخطط', icon: 'fa-solid fa-compass-drafting', color: 'text-sky-500' },
  archive: { label: 'أرشيف', icon: 'fa-solid fa-file-zipper', color: 'text-slate-500' },
};

export const DOCUMENTS: DocItem[] = [
  { id: 'DOC-501', name: 'التقرير الدوري للأسبوع 41.pdf', kind: 'pdf', category: 'تقارير', size: '2.4 م.ب', date: '2026-10-12', owner: 'وحدة التخطيط' },
  { id: 'DOC-502', name: 'بيانات البلاغات - أكتوبر.xlsx', kind: 'excel', category: 'تقارير', size: '1.1 م.ب', date: '2026-10-13', owner: 'وحدة التحليلات' },
  { id: 'DOC-503', name: 'محضر لجنة المسطحات رقم 18.docx', kind: 'word', category: 'قرارات', size: '640 ك.ب', date: '2026-10-11', owner: 'إدارة التخطيط' },
  { id: 'DOC-504', name: 'مخطط شبكة التصريف - النرجس.dwg', kind: 'cad', category: 'مخططات', size: '8.7 م.ب', date: '2026-09-28', owner: 'إدارة المشاريع' },
  { id: 'DOC-505', name: 'صور توثيق مخالفة قطعة 118.zip', kind: 'archive', category: 'صور', size: '14 م.ب', date: '2026-10-13', owner: 'إدارة التفتيش' },
  { id: 'DOC-506', name: 'عقد صيانة الشوارع 2026.pdf', kind: 'pdf', category: 'عقود', size: '3.9 م.ب', date: '2026-01-15', owner: 'الإدارة القانونية' },
  { id: 'DOC-507', name: 'فيديو ميداني - تسرب حطين.mp4', kind: 'video', category: 'فيديو', size: '46 م.ب', date: '2026-10-13', owner: 'فريق الطوارئ المائي' },
  { id: 'DOC-508', name: 'المعايرة السنوية لأجهزة المساحة.pdf', kind: 'pdf', category: 'مستندات', size: '1.5 م.ب', date: '2026-08-04', owner: 'إدارة التخطيط' },
  { id: 'DOC-509', name: 'خريطة استعمالات الأراضي 2026.dwg', kind: 'cad', category: 'مخططات', size: '12 م.ب', date: '2026-07-19', owner: 'وحدة GIS' },
  { id: 'DOC-510', name: 'قرار إيقاف عمل رقم 2201.pdf', kind: 'pdf', category: 'قرارات', size: '420 ك.ب', date: '2026-10-13', owner: 'إدارة التفتيش' },
  { id: 'DOC-511', name: 'تقرير أداء الفرق - سبتمبر.xlsx', kind: 'excel', category: 'تقارير', size: '890 ك.ب', date: '2026-10-01', owner: 'وحدة التحليلات' },
  { id: 'DOC-512', name: 'أرشيف البلاغات 2025.zip', kind: 'archive', category: 'أرشيف', size: '128 م.ب', date: '2026-01-02', owner: 'إدارة الوثائق' },
  { id: 'DOC-513', name: 'صور مشروع حديقة الياسمين.png', kind: 'image', category: 'صور', size: '3.2 م.ب', date: '2026-09-22', owner: 'إدارة المشاريع' },
  { id: 'DOC-514', name: 'دليل إجراءات الاستجابة السريعة.docx', kind: 'word', category: 'مستندات', size: '1.8 م.ب', date: '2026-06-11', owner: 'غرفة العمليات' },
];

export const DOCUMENT_CATEGORIES = ['الكل', 'تقارير', 'صور', 'فيديو', 'مخططات', 'عقود', 'قرارات', 'مستندات', 'أرشيف'];

/* ---------------- الإشعارات ---------------- */

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  type: 'alert' | 'task' | 'system' | 'message' | 'report';
  time: string;
  read: boolean;
}

export const NOTIFICATIONS: AppNotification[] = [
  { id: 'N-101', title: 'بلاغ حرج جديد', body: 'تسرب شبكة مياه أمام مدرسة الرواد - حي حطين', type: 'alert', time: 'قبل دقيقتين', read: false },
  { id: 'N-102', title: 'تجاوز موعد المهمة', body: 'مهمة TSk-1036 تشذيب الشجرة المائلة متأخرة 18 ساعة', type: 'task', time: 'قبل 12 دقيقة', read: false },
  { id: 'N-103', title: 'ذكاء اصطناعي: بلاغ مكرر محتمل', body: 'البلاغ BR-2026-1029 قد يطابق BR-2026-1040', type: 'report', time: 'قبل 25 دقيقة', read: false },
  { id: 'N-104', title: 'جاهزية فريق منخفضة', body: 'فريق التخطيط الميداني جاهزيته 70% - يلزم صيانة المعدات', type: 'alert', time: 'قبل 40 دقيقة', read: false },
  { id: 'N-105', title: 'رسالة من غرفة العمليات', body: 'تم تحديد اجتماع تنسيق الساعة 11:00', type: 'message', time: 'قبل ساعة', read: true },
  { id: 'N-106', title: 'اكتمال تقرير أسبوعي', body: 'تقرير الأسبوع 41 جاهز للتحميل بصيغة PDF', type: 'system', time: 'قبل ساعتين', read: true },
  { id: 'N-107', title: 'تحديث حالة حادث', body: 'INC-2026-018 تقدم بنسبة 65% بعد فك الانسداد', type: 'alert', time: 'قبل 3 ساعات', read: true },
  { id: 'N-108', title: 'مستخدم جديد', body: 'تمت إضافة المفتش راكان الجهني إلى النظام', type: 'system', time: 'أمس', read: true },
  { id: 'N-109', title: 'تنبيه تكامل', body: 'واجهة منظومة الأرشفة الإلكترونية تستجيب خلال 840 م.ث', type: 'system', time: 'أمس', read: true },
  { id: 'N-110', title: 'تم إغلاق مهمة', body: 'مهمة إخلاء مخلفات قطعة 45 أُغلقت بنجاح', type: 'task', time: 'أمس', read: true },
];

/* ---------------- التواصل الجماعي ---------------- */

export interface ChatChannel {
  id: string;
  name: string;
  kind: string;
  members: number;
  unread: number;
  icon: string;
}

export interface ChatMessage {
  id: string;
  author: string;
  time: string;
  text?: string;
  file?: { name: string; size: string };
  location?: string;
  mine?: boolean;
  system?: boolean;
}

export const CHAT_CHANNELS: ChatChannel[] = [
  { id: 'CH-01', name: 'غرفة العمليات العامة', kind: 'قناة دائمة', members: 34, unread: 3, icon: 'fa-solid fa-tower-broadcast' },
  { id: 'CH-02', name: 'إدارة الصيانة', kind: 'قناة إدارة', members: 18, unread: 0, icon: 'fa-solid fa-screwdriver-wrench' },
  { id: 'CH-03', name: 'فريق النرجس الميداني', kind: 'قناة فريق', members: 8, unread: 5, icon: 'fa-solid fa-people-group' },
  { id: 'CH-04', name: 'القيادة العليا', kind: 'قناة مغلقة', members: 6, unread: 0, icon: 'fa-solid fa-shield-halved' },
];

export const CHAT_MESSAGES: Record<string, ChatMessage[]> = {
  'CH-01': [
    { id: 'm1', system: true, author: 'النظام', time: '08:00', text: 'بدأت مناوبة الصباحية - عدد الفرق الميدانية: 12' },
    { id: 'm2', author: 'فهد العجمي', time: '08:45', text: 'بلاغ حرج في النرجس - نحتاج تحديث كل الفرق خلال 10 دقائق', mine: false },
    { id: 'm3', author: 'أنت', time: '08:47', text: 'تم تكليف فريق الانصاف 1 وسيصل خلال 6 دقائق', mine: true },
    { id: 'm4', author: 'سارة النعيمي', time: '08:52', text: 'الصور المرفقة من الموقع تظهر ارتفاع منسوب كبير', mine: false },
    { id: 'm5', author: 'أنت', time: '08:53', file: { name: 'خريطة-التأثير-المروري.pdf', size: '1.2 م.ب' }, mine: true },
    { id: 'm6', author: 'منصور الشمراني', time: '09:05', location: 'تقاطع الأمير محمد بن سعد - النرجس', mine: false },
    { id: 'm7', author: 'فهد العجمي', time: '09:12', text: 'أحسنتوا - وثّقوا كل خطوة في سجل الحادث', mine: false },
  ],
  'CH-02': [
    { id: 'm1', author: 'خالد الزامل', time: '07:30', text: 'جاهزية فريق السفلتة 100% - المعدات معايرة', mine: false },
    { id: 'm2', author: 'أنت', time: '07:40', text: 'ممتاز، راجعوا كميات الكتلة الكاسحة قبل الوردية المسائية', mine: true },
    { id: 'm3', author: 'لينا العسيري', time: '08:10', text: 'تم إعداد تقرير الأرصفة لحي الياسمين', mine: false },
    { id: 'm4', author: 'بيتر جورج', time: '08:35', text: 'نحتاج مخطط كابلات الإنارة لحي الملقا', mine: false },
    { id: 'm5', author: 'أنت', time: '08:40', file: { name: 'مخطط-الإنارة-الملقا.dwg', size: '6.4 م.ب' }, mine: true },
  ],
  'CH-03': [
    { id: 'm1', author: 'ماجد القحطاني', time: '09:10', text: 'وصلنا للموقع وبدأنا أعمال الشفط', mine: false },
    { id: 'm2', author: 'أنت', time: '09:11', text: 'توثيق بالصور كل 15 دقيقة من فضلكم', mine: true },
    { id: 'm3', author: 'بدر العتيبي', time: '09:25', file: { name: 'صورة-الموقع-1.jpg', size: '2.1 م.ب' }, mine: false },
    { id: 'm4', author: 'ماجد القحطاني', time: '09:40', text: 'المرور محوّل الآن، المنسوب يتراجع', mine: false },
    { id: 'm5', author: 'أنت', time: '09:41', location: 'موقع العملية - شارع 24', mine: true },
    { id: 'm6', author: 'سعود المطيري', time: '09:55', text: 'هل نحتاج دعم فريق إضافي؟', mine: false },
  ],
  'CH-04': [
    { id: 'm1', author: 'أحمد القيسي', time: '06:50', text: 'صباح الخير - ملخص المؤشرات مطلوب قبل 10:00', mine: false },
    { id: 'm2', author: 'أنت', time: '07:05', text: 'جاري تجهيز لوحة القيادة والتقرير اليومي', mine: true },
    { id: 'm3', author: 'أحمد القيسي', time: '07:06', text: 'أعطوا أولوية لحادث النرجس وحادث المدرسة', mine: false },
  ],
};

/* ---------------- المستخدمون والأدوار ---------------- */

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
  mfa: boolean;
  lastLogin: string;
  phone: string;
}

export const ROLE_LIST = [
  { id: 'admin', name: 'مدير النظام', users: 2 },
  { id: 'commander', name: 'قائد العمليات', users: 4 },
  { id: 'supervisor', name: 'مشرف ميداني', users: 9 },
  { id: 'inspector', name: 'مفتش', users: 24 },
  { id: 'analyst', name: 'محلل بيانات', users: 5 },
  { id: 'receiver', name: 'موظف استقبال بلاغات', users: 12 },
];

export const USERS: AppUser[] = [
  { id: 'U-01', name: 'أحمد القيسي', email: 'a.alqaisi@plan.gov.sa', role: 'مدير النظام', department: 'إدارة التخطيط الحضري', status: 'نشط', mfa: true, lastLogin: '2026-10-13 07:48', phone: '0501112223' },
  { id: 'U-02', name: 'فهد العجمي', email: 'f.alajmi@plan.gov.sa', role: 'قائد العمليات', department: 'غرفة العمليات', status: 'نشط', mfa: true, lastLogin: '2026-10-13 06:02', phone: '0502223334' },
  { id: 'U-03', name: 'سارة النعيمي', email: 's.alnaimi@plan.gov.sa', role: 'قائد العمليات', department: 'غرفة العمليات', status: 'نشط', mfa: true, lastLogin: '2026-10-13 05:55', phone: '0503334445' },
  { id: 'U-04', name: 'منصور الشمراني', email: 'm.alshammari@plan.gov.sa', role: 'مشرف ميداني', department: 'إدارة التفتيش والمتابعة', status: 'نشط', mfa: true, lastLogin: '2026-10-12 22:14', phone: '0504445556' },
  { id: 'U-05', name: 'أمل الفهد', email: 'a.alfahad@plan.gov.sa', role: 'مشرف ميداني', department: 'إدارة التخطيط', status: 'نشط', mfa: false, lastLogin: '2026-10-12 16:40', phone: '0505556667' },
  { id: 'U-06', name: 'بدر العتيبي', email: 'b.alotaibi@plan.gov.sa', role: 'مفتش', department: 'إدارة التفتيش والمتابعة', status: 'نشط', mfa: true, lastLogin: '2026-10-13 08:30', phone: '0506667778' },
  { id: 'U-07', name: 'نورة الحمد', email: 'n.alhamad@plan.gov.sa', role: 'محلل بيانات', department: 'وحدة التحليلات', status: 'نشط', mfa: true, lastLogin: '2026-10-11 11:20', phone: '0507778889' },
  { id: 'U-08', name: 'خالد الزامل', email: 'k.alzamil@plan.gov.sa', role: 'مفتش', department: 'إدارة الصيانة', status: 'موقوف', mfa: false, lastLogin: '2026-10-05 09:15', phone: '0508889990' },
  { id: 'U-09', name: 'ريم الدوسري', email: 'r.aldosari@plan.gov.sa', role: 'موظف استقبال بلاغات', department: 'مركز الاستقبال', status: 'نشط', mfa: true, lastLogin: '2026-10-13 06:31', phone: '0509990001' },
  { id: 'U-10', name: 'طارق البقمي', email: 't.albaqami@plan.gov.sa', role: 'محلل بيانات', department: 'وحدة التخطيط', status: 'غير متاح', mfa: false, lastLogin: '2026-10-09 13:05', phone: '0500001112' },
];

/* ---------------- الأدوار والصلاحيات ---------------- */

export type PermLevel = 'full' | 'read' | 'none';

export const PERMISSION_MODULES = [
  'البلاغات والطلبات',
  'إدارة الحوادث',
  'الخريطة الذكية',
  'فرق الاستجابة',
  'المفتشون',
  'المهام الميدانية',
  'التحليلات',
  'مركز الوثائق',
  'التقارير',
  'المستخدمون والصلاحيات',
  'الإعدادات',
  'سجل العمليات',
];

export const PERMISSION_ACTIONS = ['عرض', 'إنشاء', 'تعديل', 'حذف', 'اعتماد', 'تصدير'];

const ROLE_IDS = ROLE_LIST.map((r) => r.id);

export const permissionGrid: { module: string; access: Record<string, PermLevel> }[] = PERMISSION_MODULES.map((module, i) => {
  const access: Record<string, PermLevel> = {};
  ROLE_IDS.forEach((roleId, j) => {
    if (roleId === 'admin') access[roleId] = 'full';
    else if (roleId === 'commander') access[roleId] = i >= 10 ? 'read' : 'full';
    else if (roleId === 'supervisor') access[roleId] = i % 3 === 2 ? 'read' : i === 9 ? 'none' : 'full';
    else if (roleId === 'inspector') access[roleId] = i <= 5 && i !== 9 ? (i % 2 === 0 ? 'full' : 'read') : 'none';
    else if (roleId === 'analyst') access[roleId] = i === 9 || i === 10 ? 'none' : i <= 1 ? 'read' : 'full';
    else access[roleId] = i <= 1 ? 'full' : i <= 6 || i === 7 ? 'read' : 'none';
    void j;
  });
  return { module, access };
});

export const PERM_LABEL: Record<PermLevel, string> = { full: 'صلاحية كاملة', read: 'قراءة فقط', none: 'بدون صلاحية' };

/* ---------------- سجل العمليات (Audit Log) ---------------- */

export interface AuditEntry {
  id: string;
  time: string;
  user: string;
  action: string;
  module: string;
  ip: string;
  status: string;
  device: string;
}

export const AUDIT_LOGS: AuditEntry[] = [
  { id: 'AU-9012', time: '2026-10-13 09:12:04', user: 'أحمد القيسي', action: 'تسجيل دخول ناجح مع MFA', module: 'المصادقة', ip: '10.20.4.11', status: 'ناجح', device: 'Chrome • Windows' },
  { id: 'AU-9011', time: '2026-10-13 09:05:41', user: 'فهد العجمي', action: 'تكليف فريق الانصاف 1 بالمهمة TSk-1042', module: 'المهام الميدانية', ip: '10.20.4.22', status: 'ناجح', device: 'Safari • iOS' },
  { id: 'AU-9010', time: '2026-10-13 08:57:19', user: 'النظام الآلي', action: 'تصنيف بلاغ BR-2026-1042 واقتراح أولوية فورية', module: 'الذكاء الاصطناعي', ip: '127.0.0.1', status: 'ناجح', device: 'خدمة داخلية' },
  { id: 'AU-9009', time: '2026-10-13 08:45:02', user: 'ريم الدوسري', action: 'إنشاء بلاغ BR-2026-1042 من قناة تطبيق الهاتف', module: 'البلاغات والطلبات', ip: '10.20.7.31', status: 'ناجح', device: 'Chrome • Windows' },
  { id: 'AU-9008', time: '2026-10-13 08:31:55', user: 'خالد الزامل', action: 'محاولة دخول بدون عامل التحقق', module: 'المصادقة', ip: '10.20.9.14', status: 'فشل', device: 'Chrome • Android' },
  { id: 'AU-9007', time: '2026-10-13 08:12:33', user: 'منصور الشمراني', action: 'تحميل محضر مخالفة رقم 4412', module: 'مركز الوثائق', ip: '10.20.5.40', status: 'ناجح', device: 'Edge • Windows' },
  { id: 'AU-9006', time: '2026-10-13 07:58:21', user: 'نورة الحمد', action: 'تعديل صلاحيات دور المفتش', module: 'المستخدمون والصلاحيات', ip: '10.20.6.19', status: 'ناجح', device: 'Chrome • macOS' },
  { id: 'AU-9005', time: '2026-10-13 07:40:08', user: 'مستخدم غير معروف', action: 'محاولة دخول على حساب مدير النظام', module: 'المصادقة', ip: '45.132.88.7', status: 'محظور', device: 'غير معروف' },
  { id: 'AU-9004', time: '2026-10-13 07:22:47', user: 'أمل الفهد', action: 'تصدير تقرير الأداء الشهري بصيغة Excel', module: 'التقارير', ip: '10.20.6.22', status: 'ناجح', device: 'Chrome • Windows' },
  { id: 'AU-9003', time: '2026-10-13 06:48:16', user: 'فهد العجمي', action: 'اعتماد قرار إغلاق الشارع مؤقتاً', module: 'إدارة الحوادث', ip: '10.20.4.22', status: 'ناجح', device: 'Safari • iOS' },
  { id: 'AU-9002', time: '2026-10-13 06:31:02', user: 'ريم الدوسري', action: 'تسجيل دخول ناجح مع MFA', module: 'المصادقة', ip: '10.20.7.31', status: 'ناجح', device: 'Chrome • Windows' },
  { id: 'AU-9001', time: '2026-10-12 23:14:39', user: 'النظام الآلي', action: 'نسخ احتياطي يومي للبيانات', module: 'النظام', ip: '127.0.0.1', status: 'ناجح', device: 'خدمة داخلية' },
];

/* ---------------- التكاملات مع منظومات التخطيط الحضري ---------------- */

export interface Integration {
  id: string;
  name: string;
  description: string;
  status: 'متصل' | 'جاهز للربط' | 'قيد التطوير';
  latency: string;
  icon: string;
}

export const INTEGRATIONS: Integration[] = [
  { id: 'INT-01', name: 'منظومة المعلومات والتوثيق', description: 'ربط البلاغات والوثائق المرجعية', status: 'متصل', latency: '120 م.ث', icon: 'fa-solid fa-database' },
  { id: 'INT-02', name: 'منظومة التفتيش والمتابعة', description: 'مزامنة المخالفات والمحاضر الميدانية', status: 'متصل', latency: '95 م.ث', icon: 'fa-solid fa-clipboard-check' },
  { id: 'INT-03', name: 'منظومة التصميم والتراث', description: 'مخططات التصميم والمواقع التراثية', status: 'متصل', latency: '140 م.ث', icon: 'fa-solid fa-landmark' },
  { id: 'INT-04', name: 'منظومة الاستملاكات', description: 'بيانات القطع والتعويضات', status: 'جاهز للربط', latency: '—', icon: 'fa-solid fa-file-contract' },
  { id: 'INT-05', name: 'منظومة GIS', description: 'طبقات الخرائط والحدود الإدارية', status: 'متصل', latency: '80 م.ث', icon: 'fa-solid fa-map-location-dot' },
  { id: 'INT-06', name: 'منظومة الأرشفة الإلكترونية', description: 'أرشفة التقارير والقرارات', status: 'قيد التطوير', latency: '—', icon: 'fa-solid fa-box-archive' },
  { id: 'INT-07', name: 'منصة الخدمات الإلكترونية', description: 'استقبال بلاغات المواطنين الرقمية', status: 'متصل', latency: '110 م.ث', icon: 'fa-solid fa-globe' },
  { id: 'INT-08', name: 'منصة التوأم الرقمي', description: 'محاكاة وتشغيل المدينة الرقمية', status: 'جاهز للربط', latency: '—', icon: 'fa-solid fa-cubes' },
];

/* ---------------- الأحداث الجارية ---------------- */

export interface LiveEvent {
  id: string;
  title: string;
  zone: string;
  level: string;
  teams: string;
  time: string;
  status: string;
}

export const LIVE_EVENTS: LiveEvent[] = [
  { id: 'EV-01', title: 'انسكاب مياه أمطار - النرجس', zone: 'حي النرجس', level: 'خطير', teams: '3 فرق', time: '07:30', status: 'جارية' },
  { id: 'EV-02', title: 'تسرب شبكة أمام مدرسة', zone: 'حي حطين', level: 'خطير', teams: '2 فريق', time: '04:40', status: 'جارية' },
  { id: 'EV-03', title: 'مخالفة بناء كبرى', zone: 'حي الياسمين', level: 'متوسط', teams: 'فريق تفتيش', time: 'أمس', status: 'تحت المراجعة' },
  { id: 'EV-04', title: 'هبوط إسفلتي - الدائري', zone: 'حي العليا', level: 'متوسط', teams: 'فريقان', time: 'أمس', status: 'جارية' },
  { id: 'EV-05', title: 'أعمال رصف ليلي', zone: 'حي الملقا', level: 'مستقر', teams: '1 فريق', time: '23:00', status: 'مجدولة' },
];

/* ---------------- مؤشرات لوحة القيادة ---------------- */

export const KPIS = {
  total: 1248,
  newToday: 36,
  critical: 8,
  closed: 964,
  inProgress: 187,
  inspectors: 24,
  teams: 12,
  avgResponse: 18,
  completion: 87,
  totalDelta: '12.4%',
  newDelta: '8%',
  criticalDelta: '2',
  closedDelta: '5.2%',
  inProgressDelta: '4%',
  responseDelta: '3 د',
  completionDelta: '4%',
};

/* ---------------- مجموعات بيانات الرسوم البيانية ---------------- */

export const CHARTS = {
  weekly: {
    labels: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
    created: [42, 55, 48, 63, 58, 71, 36],
    closed: [35, 47, 51, 52, 60, 58, 30],
    inProgress: [18, 22, 19, 25, 21, 27, 16],
  },
  byType: {
    labels: ['تصريف مياه', 'تسريبات مياه', 'إنارة', 'إسفلت', 'نفايات', 'مخالفات', 'أشجار'],
    data: [218, 176, 149, 132, 121, 108, 74],
  },
  byZone: {
    labels: ['النرجس', 'الياسمين', 'الملقا', 'العارض', 'حطين', 'العليا', 'السليمانية', 'الروضة', 'النخيل', 'المصيف'],
    data: [186, 164, 142, 131, 127, 118, 104, 96, 88, 92],
  },
  hourly: {
    labels: ['00', '02', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22'],
    data: [6, 4, 3, 9, 21, 18, 15, 17, 22, 19, 14, 10],
  },
  responseTime: {
    labels: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
    data: [24, 22, 21, 19, 18, 17, 18],
  },
  teamPerformance: {
    labels: ['الانصاف 1', 'الطوارئ المائي', 'التفتيش', 'السفلتة', 'الإنارة', 'الإخلاء 1', 'البستنة 3', 'التخطيط'],
    completion: [92, 95, 88, 90, 86, 91, 83, 89],
    response: [16, 14, 22, 19, 25, 18, 27, 31],
  },
  monthly: {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر'],
    reports: [820, 790, 860, 910, 980, 1040, 1120, 1090, 1180, 1248],
    closure: [81, 83, 82, 85, 84, 86, 85, 87, 86, 87],
  },
  channelShare: {
    labels: ['المواطنون', 'موظفو البلدية', 'الهاتف', 'البريد', 'النماذج', 'التطبيق', 'API'],
    data: [512, 208, 176, 64, 98, 143, 47],
  },
  severityShare: {
    labels: ['حرج', 'عالي', 'متوسط', 'منخفض'],
    data: [64, 297, 486, 401],
  },
  inspectorPerformance: {
    labels: ['منصور', 'أمل', 'بدر', 'نورة', 'سعود', 'ريم', 'فهد', 'لينا'],
    completion: [94, 91, 88, 96, 82, 93, 87, 95],
    tasks: [4, 3, 2, 5, 6, 1, 3, 2],
  },
  kpiRadar: {
    labels: ['جودة الاستجابة', 'الالتزام بالمواعيد', 'رضا المواطنين', 'السلامة الميدانية', 'دقة التوثيق'],
    data: [92, 88, 86, 94, 90],
  },
};

/* ---------------- محاكاة تحليل الذكاء الاصطناعي ---------------- */

export const AI_DEMO = {
  rawText: 'فيه تجمع مياه كبير عند تقاطع شارع 24 مع الأمير محمد بن سعد وسايقين يلوجون من الطريق السريع، من يوم أمس بعد المطر.',
  classification: 'انسداد تصريف مياه الأمطار',
  confidence: 96,
  duplicateCandidate: { id: 'BR-2026-1021', similarity: 91, note: 'نفس الموقع ونوع البلاغ قبل 6 أيام' },
  priority: 'فورية',
  department: 'إدارة الصيانة',
  team: 'فريق الانصاف 1',
  severity: 'حرج',
  summary: 'انسداد بالوعة رئيسية أدى لتجمّع مياه يعيق تقاطعاً حيوياً؛ يُقترح التدخل خلال ساعتين مع تحويل مروري.',
  ocr: 'شارع 24 - النرجس - منطقة ممنوعة الوقف',
  estimatedResponse: 'أقل من ساعتين',
  initialReport: 'بلاغ المواطن كما ورد',
};
