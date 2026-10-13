/* بيانات العمليات الميدانية: الفرق، المفتشون، المركبات، المهام، الحوادث */

export interface Team {
  id: string;
  name: string;
  code: string;
  type: string;
  status: string;
  lead: string;
  members: number;
  readiness: number;
  performance: number;
  zone: string;
  lat: number;
  lng: number;
  vehicle: string;
  shift: string;
  equipment: string[];
  lastUpdate: string;
}

export const TEAM_STATUSES = ['متاح', 'في المهمة', 'في الطريق', 'غير متاح', 'تحت الصيانة'] as const;

export const TEAMS: Team[] = [
  { id: 'TM-01', name: 'فريق الانصاف 1', code: 'FR-101', type: 'صيانة طوارئ', status: 'في المهمة', lead: 'ماجد القحطاني', members: 6, readiness: 95, performance: 92, zone: 'حي النرجس', lat: 24.791, lng: 46.641, vehicle: 'شاحنة صيانة 4281', shift: 'الصباحية (06:00 - 14:00)', equipment: ['مضخة شفط', 'معدات سفلتة', 'أجهزة كشف تسريب'], lastUpdate: 'قبل 3 دقائق' },
  { id: 'TM-02', name: 'فريق الطوارئ المائي', code: 'FR-102', type: 'طوارئ مياه', status: 'في المهمة', lead: 'سلطان العنزي', members: 5, readiness: 98, performance: 95, zone: 'حي حطين', lat: 24.741, lng: 46.583, vehicle: 'مركبة تسريبات 2210', shift: 'الصباحية (06:00 - 14:00)', equipment: ['حاجز مائي', 'مولد طوارئ', 'مكسّرات'], lastUpdate: 'قبل دقيقتين' },
  { id: 'TM-03', name: 'فريق التفتيش الميداني', code: 'FR-201', type: 'تفتيش ومتابعة', status: 'متاح', lead: 'منصور الشمراني', members: 4, readiness: 90, performance: 88, zone: 'حي الياسمين', lat: 24.826, lng: 46.641, vehicle: 'سيارة تفتيش 7734', shift: 'الصباحية (06:00 - 14:00)', equipment: ['مسطرة قياس', 'كاميرا ميدانية', 'جهاز تحديد إحداثيات'], lastUpdate: 'قبل 8 دقائق' },
  { id: 'TM-04', name: 'فريق السفلتة المتقدم', code: 'FR-103', type: 'أعمال إسفلت', status: 'في المهمة', lead: 'خالد الزامل', members: 8, readiness: 87, performance: 90, zone: 'حي العليا', lat: 24.69, lng: 46.678, vehicle: 'رود 9932', shift: 'المسائية (14:00 - 22:00)', equipment: ['رافعة إسفلت', 'هورنيت', 'بخاري'], lastUpdate: 'قبل 12 دقيقة' },
  { id: 'TM-05', name: 'فريق الإنارة الليلي', code: 'FR-104', type: 'إنارة عمومية', status: 'متاح', lead: 'بيتر جورج', members: 4, readiness: 92, performance: 86, zone: 'حي الملقا', lat: 24.779, lng: 46.582, vehicle: 'منصة رفع 5520', shift: 'الليلية (22:00 - 06:00)', equipment: ['منصة رفع', 'أجهزة قياس جهد', 'كابلات معتمدة'], lastUpdate: 'قبل 15 دقيقة' },
  { id: 'TM-06', name: 'فريق الإخلاء 1', code: 'FR-105', type: 'نظافة وإخلاء', status: 'في الطريق', lead: 'عبدالرحمن الزهراني', members: 7, readiness: 89, performance: 91, zone: 'حي المصيف', lat: 24.701, lng: 46.652, vehicle: 'شاحنة نفايات 3390', shift: 'الفجر (02:00 - 10:00)', equipment: ['حاوية متحركة', 'مضخة شفط', 'مواد امتصاص'], lastUpdate: 'قبل دقيقة' },
  { id: 'TM-07', name: 'فريق البستنة 3', code: 'FR-106', type: 'حدائق وبيئة', status: 'متاح', lead: 'يوسف الشهري', members: 6, readiness: 84, performance: 83, zone: 'حي النخيل', lat: 24.73, lng: 46.628, vehicle: 'شاحنة نقل 6112', shift: 'الصباحية (06:00 - 14:00)', equipment: ['منشار هولندي', 'رافعة أغصان', 'مذبلات'], lastUpdate: 'قبل 20 دقيقة' },
  { id: 'TM-08', name: 'فريق التخطيط الميداني', code: 'FR-202', type: 'تخطيط ومساحة', status: 'غير متاح', lead: 'أمل الفهد', members: 3, readiness: 70, performance: 89, zone: 'حي الروضة', lat: 24.719, lng: 46.728, vehicle: 'سيارة مساحة 1180', shift: 'الإجازة الأسبوعية', equipment: ['جهاز GNSS', 'تئودولايت', 'طائرة مساحية'], lastUpdate: 'أمس 17:40' },
];

export interface Inspector {
  id: string;
  name: string;
  role: string;
  department: string;
  zone: string;
  status: string;
  activeTasks: number;
  completionRate: number;
  rating: number;
  phone: string;
  lat: number;
  lng: number;
  joinedAt: string;
}

export const INSPECTOR_STATUSES = ['متاح', 'جولة ميدانية', 'مهمة ميدانية', 'اجتماع', 'إجازة'] as const;

export const INSPECTORS: Inspector[] = [
  { id: 'IN-01', name: 'منصور الشمراني', role: 'مفتش أول', department: 'إدارة التفتيش والمتابعة', zone: 'حي الياسمين', status: 'جولة ميدانية', activeTasks: 4, completionRate: 94, rating: 4.8, phone: '0501234567', lat: 24.825, lng: 46.639, joinedAt: '2019-03-12' },
  { id: 'IN-02', name: 'أمل الفهد', role: 'مهندسة مساحة', department: 'إدارة التخطيط', zone: 'حي الروضة', status: 'مهمة ميدانية', activeTasks: 3, completionRate: 91, rating: 4.7, phone: '0502345678', lat: 24.721, lng: 46.727, joinedAt: '2020-09-01' },
  { id: 'IN-03', name: 'بدر العتيبي', role: 'مفتش مواقع', department: 'إدارة التفتيش والمتابعة', zone: 'حي النرجس', status: 'متاح', activeTasks: 2, completionRate: 88, rating: 4.5, phone: '0503456789', lat: 24.789, lng: 46.643, joinedAt: '2021-01-17' },
  { id: 'IN-04', name: 'نورة الحمد', role: 'مراقبة مطابقة مخططات', department: 'إدارة التخطيط', zone: 'حي الملقا', status: 'اجتماع', activeTasks: 5, completionRate: 96, rating: 4.9, phone: '0504567890', lat: 24.78, lng: 46.583, joinedAt: '2018-06-20' },
  { id: 'IN-05', name: 'سعود المطيري', role: 'مفتش بلديات فرعية', department: 'إدارة التفتيش والمتابعة', zone: 'حي حطين', status: 'مهمة ميدانية', activeTasks: 6, completionRate: 82, rating: 4.2, phone: '0505678901', lat: 24.743, lng: 46.585, joinedAt: '2022-02-11' },
  { id: 'IN-06', name: 'ريم الدوسري', role: 'مختصة تراث', department: 'إدارة التراث والتصميم', zone: 'حي السليمانية', status: 'متاح', activeTasks: 1, completionRate: 93, rating: 4.6, phone: '0506789012', lat: 24.662, lng: 46.707, joinedAt: '2020-11-05' },
  { id: 'IN-07', name: 'فهد الشمري', role: 'مفتش مساحات خضراء', department: 'إدارة الحدائق والمساحات الخضراء', zone: 'حي النخيل', status: 'جولة ميدانية', activeTasks: 3, completionRate: 87, rating: 4.4, phone: '0507890123', lat: 24.731, lng: 46.63, joinedAt: '2021-08-29' },
  { id: 'IN-08', name: 'طارق البقمي', role: 'مفتش استملاكات', department: 'إدارة الاستملاكات', zone: 'حي العليا', status: 'إجازة', activeTasks: 0, completionRate: 90, rating: 4.5, phone: '0508901234', lat: 24.689, lng: 46.677, joinedAt: '2017-04-02' },
  { id: 'IN-09', name: 'لينا العسيري', role: 'مهندسة مدنية', department: 'إدارة الصيانة', zone: 'حي العارض', status: 'متاح', activeTasks: 2, completionRate: 95, rating: 4.8, phone: '0509012345', lat: 24.758, lng: 46.67, joinedAt: '2019-12-08' },
  { id: 'IN-10', name: 'راكان الجهني', role: 'مفتش سلامة مواقع', department: 'إدارة التفتيش والمتابعة', zone: 'حي المصيف', status: 'جولة ميدانية', activeTasks: 4, completionRate: 85, rating: 4.3, phone: '0500123456', lat: 24.7, lng: 46.651, joinedAt: '2023-05-14' },
];

export interface Vehicle {
  id: string;
  plate: string;
  type: string;
  team: string;
  status: string;
  fuel: number;
  lat: number;
  lng: number;
  lastPing: string;
}

export const VEHICLES: Vehicle[] = [
  { id: 'VH-01', plate: 'ر ط ح 4281', type: 'شاحنة صيانة', team: 'فريق الانصاف 1', status: 'في مهمة', fuel: 72, lat: 24.792, lng: 46.642, lastPing: 'قبل دقيقة' },
  { id: 'VH-02', plate: 'ب ك ل 2210', type: 'مركبة تسريبات', team: 'فريق الطوارئ المائي', status: 'في مهمة', fuel: 58, lat: 24.742, lng: 46.584, lastPing: 'قبل دقيقتين' },
  { id: 'VH-03', plate: 'أ د ن 7734', type: 'سيارة تفتيش', team: 'فريق التفتيش الميداني', status: 'جاهزة', fuel: 90, lat: 24.827, lng: 46.642, lastPing: 'قبل 4 دقائق' },
  { id: 'VH-04', plate: 'ح س ي 9932', type: 'رود إسفلت', team: 'فريق السفلتة المتقدم', status: 'في مهمة', fuel: 45, lat: 24.691, lng: 46.679, lastPing: 'قبل 3 دقائق' },
  { id: 'VH-05', plate: 'ك ل م 5520', type: 'منصة رفع', team: 'فريق الإنارة الليلي', status: 'جاهزة', fuel: 81, lat: 24.78, lng: 46.583, lastPing: 'قبل 6 دقائق' },
  { id: 'VH-06', plate: 'ه و ي 3390', type: 'شاحنة نفايات', team: 'فريق الإخلاء 1', status: 'في الطريق', fuel: 63, lat: 24.702, lng: 46.653, lastPing: 'قبل دقيقة' },
  { id: 'VH-07', plate: 'ن ص ع 6112', type: 'شاحنة نقل', team: 'فريق البستنة 3', status: 'جاهزة', fuel: 77, lat: 24.731, lng: 46.629, lastPing: 'قبل 9 دقائق' },
  { id: 'VH-08', plate: 'ي ب ت 1180', type: 'سيارة مساحة', team: 'فريق التخطيط الميداني', status: 'صيانة', fuel: 30, lat: 24.72, lng: 46.727, lastPing: 'أمس 16:20' },
];

export interface FieldTask {
  id: string;
  title: string;
  type: string;
  priority: string;
  status: string;
  assignee: string;
  team: string;
  dueDate: string;
  zone: string;
  progress: number;
  createdAt: string;
  reportId?: string;
}

export const TASK_STATUSES = ['جديدة', 'قيد التنفيذ', 'متأخرة', 'مكتملة', 'معلقة'] as const;

export const TASKS: FieldTask[] = [
  { id: 'TSK-1042', title: 'فك انسداد بالوعة تقاطع شارع 24', type: 'صيانة طوارئ', priority: 'فورية', status: 'قيد التنفيذ', assignee: 'ماجد القحطاني', team: 'فريق الانصاف 1', dueDate: '2026-10-13 12:00', zone: 'حي النرجس', progress: 65, createdAt: '2026-10-13 08:50', reportId: 'BR-2026-1042' },
  { id: 'TSK-1041', title: 'إغلاق مقطع المياه وإصلاح التسرب', type: 'طوارئ مياه', priority: 'فورية', status: 'قيد التنفيذ', assignee: 'سلطان العنزي', team: 'فريق الطوارئ المائي', dueDate: '2026-10-13 11:00', zone: 'حي حطين', progress: 40, createdAt: '2026-10-13 05:25', reportId: 'BR-2026-1037' },
  { id: 'TSK-1040', title: 'محضر ميداني لمخالفة الارتفاع', type: 'تفتيش', priority: 'عالية', status: 'جديدة', assignee: 'منصور الشمراني', team: 'فريق التفتيش الميداني', dueDate: '2026-10-13 16:00', zone: 'حي الياسمين', progress: 0, createdAt: '2026-10-13 08:10', reportId: 'BR-2026-1041' },
  { id: 'TSK-1039', title: 'سقف مؤقت للحفرة الدائري الشمالي', type: 'إسفلت', priority: 'عالية', status: 'قيد التنفيذ', assignee: 'خالد الزامل', team: 'فريق السفلتة المتقدم', dueDate: '2026-10-13 15:00', zone: 'حي العليا', progress: 55, createdAt: '2026-10-12 22:30', reportId: 'BR-2026-1039' },
  { id: 'TSK-1038', title: 'استبدال لوحات الإنارة المتعطلة', type: 'إنارة', priority: 'عادية', status: 'جديدة', assignee: 'بيتر جورج', team: 'فريق الإنارة الليلي', dueDate: '2026-10-14 02:00', zone: 'حي الملقا', progress: 0, createdAt: '2026-10-13 06:45', reportId: 'BR-2026-1040' },
  { id: 'TSK-1037', title: 'إخلاء مخلفات البناء - قطعة 45', type: 'نظافة', priority: 'عادية', status: 'مكتملة', assignee: 'عبدالرحمن الزهراني', team: 'فريق الإخلاء 1', dueDate: '2026-10-12 20:00', zone: 'حي العارض', progress: 100, createdAt: '2026-10-12 16:20', reportId: 'BR-2026-1038' },
  { id: 'TSK-1036', title: 'تشذيب وتثبيت الشجرة المائلة', type: 'بستنة', priority: 'عالية', status: 'متأخرة', assignee: 'يوسف الشهري', team: 'فريق البستنة 3', dueDate: '2026-10-12 18:00', zone: 'حي النخيل', progress: 30, createdAt: '2026-10-12 12:00', reportId: 'BR-2026-1036' },
  { id: 'TSK-1035', title: 'رفع تقرير انحراف المخطط للجنة', type: 'تخطيط', priority: 'فورية', status: 'قيد التنفيذ', assignee: 'أمل الفهد', team: 'فريق التخطيط الميداني', dueDate: '2026-10-13 17:00', zone: 'حي الروضة', progress: 75, createdAt: '2026-10-12 10:05', reportId: 'BR-2026-1034' },
  { id: 'TSK-1034', title: 'تنظيف مسار زيت المصيف', type: 'نظافة', priority: 'عالية', status: 'قيد التنفيذ', assignee: 'عبدالرحمن الزهراني', team: 'فريق الإخلاء 1', dueDate: '2026-10-13 10:00', zone: 'حي المصيف', progress: 85, createdAt: '2026-10-13 05:05', reportId: 'BR-2026-1033' },
  { id: 'TSK-1033', title: 'إصلاح بلاط الرصيف - المكتبة', type: 'أرصفة', priority: 'عادية', status: 'معلقة', assignee: 'لينا العسيري', team: 'فريق الأرصفة', dueDate: '2026-10-15 12:00', zone: 'حي الياسمين', progress: 10, createdAt: '2026-10-13 09:15', reportId: 'BR-2026-1032' },
  { id: 'TSK-1032', title: 'تثبيت أعمدة الحاجز الفاصل', type: 'مرور', priority: 'عادية', status: 'قيد التنفيذ', assignee: 'ماجد القحطاني', team: 'فريق المرور الميداني', dueDate: '2026-10-14 09:00', zone: 'حي العليا', progress: 25, createdAt: '2026-10-12 14:30', reportId: 'BR-2026-1031' },
  { id: 'TSK-1031', title: 'زيادة دورة جمع نفايات السوق', type: 'نظافة', priority: 'عالية', status: 'قيد التنفيذ', assignee: 'عبدالرحمن الزهراني', team: 'فريق الإخلاء 2', dueDate: '2026-10-14 06:00', zone: 'حي حطين', progress: 50, createdAt: '2026-10-13 04:00', reportId: 'BR-2026-1027' },
  { id: 'TSK-1030', title: 'معاينة تجاوز المظلة لحدود القطعة', type: 'تخطيط', priority: 'عالية', status: 'جديدة', assignee: 'نورة الحمد', team: 'فريق التخطيط الميداني', dueDate: '2026-10-14 11:00', zone: 'حي الملقا', progress: 0, createdAt: '2026-10-11 10:30', reportId: 'BR-2026-1028' },
  { id: 'TSK-1029', title: 'أرشفة تقرير مشروع المرآب الذكي', type: 'وثائق', priority: 'منخفضة', status: 'مكتملة', assignee: 'ريم الدوسري', team: 'فريق التوثيق', dueDate: '2026-10-12 14:00', zone: 'حي العليا', progress: 100, createdAt: '2026-10-11 09:00' },
];

/* ---------------- المناوبات ---------------- */

export interface Shift {
  id: string;
  name: string;
  time: string;
  team: string;
  crew: number;
  supervisor: string;
  status: string;
}

export const SHIFTS: Shift[] = [
  { id: 'SH-01', name: 'مناوبة الصباحية', time: '06:00 - 14:00', team: 'فريق الانصاف 1', crew: 6, supervisor: 'ماجد القحطاني', status: 'جارية' },
  { id: 'SH-02', name: 'مناوبة الطوارئ المائي', time: '06:00 - 14:00', team: 'فريق الطوارئ المائي', crew: 5, supervisor: 'سلطان العنزي', status: 'جارية' },
  { id: 'SH-03', name: 'مناوبة التفتيش', time: '07:00 - 15:00', team: 'فريق التفتيش الميداني', crew: 4, supervisor: 'منصور الشمراني', status: 'جارية' },
  { id: 'SH-04', name: 'مناوبة المسائية', time: '14:00 - 22:00', team: 'فريق السفلتة المتقدم', crew: 8, supervisor: 'خالد الزامل', status: 'قادمة' },
  { id: 'SH-05', name: 'مناوبة الإنارة الليلية', time: '22:00 - 06:00', team: 'فريق الإنارة الليلي', crew: 4, supervisor: 'بيتر جورج', status: 'قادمة' },
  { id: 'SH-06', name: 'مناوبة الفجر', time: '02:00 - 10:00', team: 'فريق الإخلاء 1', crew: 7, supervisor: 'عبدالرحمن الزهراني', status: 'جارية' },
];

/* ---------------- إدارة الحوادث ---------------- */

export interface IncidentEvent {
  id: string;
  time: string;
  title: string;
  description?: string;
  actor?: string;
  icon?: string;
  tone?: 'navy' | 'emerald' | 'amber' | 'red' | 'sky' | 'violet' | 'slate' | 'rose' | 'teal';
}

export interface IncidentDecision {
  id: string;
  date: string;
  title: string;
  by: string;
  note: string;
}

export interface IncidentNote {
  author: string;
  role: string;
  time: string;
  text: string;
}

export interface Incident {
  id: string;
  title: string;
  category: string;
  severity: string;
  status: string;
  zone: string;
  address: string;
  lat: number;
  lng: number;
  reportedAt: string;
  startedAt: string;
  commander: string;
  teams: string[];
  affected: string;
  description: string;
  progress: number;
  photos: number;
  videos: number;
  docs: { name: string; type: string; date: string }[];
  events: IncidentEvent[];
  decisions: IncidentDecision[];
  notes: IncidentNote[];
}

export const INCIDENTS: Incident[] = [
  {
    id: 'INC-2026-018', title: 'انسكاب مياه أمطار وقطع للمرور - النرجس', category: 'كوارث طبيعية', severity: 'حرج', status: 'قيد التنفيذ',
    zone: 'حي النرجس', address: 'طريق الأمير محمد بن سعد مع شارع 24', lat: 24.7912, lng: 46.6402,
    reportedAt: '2026-10-13 08:42', startedAt: '2026-10-13 07:30', commander: 'م. فهد العجمي',
    teams: ['فريق الانصاف 1', 'فريق المرور الميداني', 'فريق الإخلاء 1'], affected: 'حوالي 4,000 مستفيد • 3 شوارع مقطوعة',
    description: 'تجمّع مياه أمطار كثيف بسبب انسداد شبكة تصريف رئيسية أدى إلى قطع مؤقت لثلاثة شوارع وتعطيل حركة المرور في المحطة الشمالية.',
    progress: 65, photos: 12, videos: 3,
    docs: [
      { name: 'تقرير الحادث الأولي.pdf', type: 'PDF', date: '2026-10-13' },
      { name: 'مخطط شبكات التصريف.dwg', type: 'DWG', date: '2026-10-13' },
      { name: 'محضر إغلاق الشوارع.docx', type: 'Word', date: '2026-10-13' },
    ],
    events: [
      { id: 'e1', time: '07:30', title: 'بداية الحادث', description: 'ارتفاع منسوب المياه بعد مطر غزيف', icon: 'fa-solid fa-cloud-showers-heavy', tone: 'sky' },
      { id: 'e2', time: '08:42', title: 'استلام البلاغ', description: 'بلاغ مواطن عبر تطبيق الهاتف رقم BR-2026-1042', actor: 'مركز الاستقبال', icon: 'fa-solid fa-inbox', tone: 'navy' },
      { id: 'e3', time: '08:55', title: 'تصنيف آلي وتكليف فريق', description: 'الذكاء الاصطناعي صنّف البلاغ كحرج واقترح فريق الانصاف 1', actor: 'وحدة الذكاء الاصطناعي', icon: 'fa-solid fa-robot', tone: 'violet' },
      { id: 'e4', time: '09:10', title: 'وصول الفريق الميداني', description: 'بدء أعمال الشفط وفك الالتباس', actor: 'فريق الانصاف 1', icon: 'fa-solid fa-truck', tone: 'emerald' },
      { id: 'e5', time: '09:40', title: 'إغلاق مروري مؤقت', description: 'تحويل المرور عن الشارع المتأثر', actor: 'فريق المرور الميداني', icon: 'fa-solid fa-road-barrier', tone: 'amber' },
    ],
    decisions: [
      { id: 'd1', date: '2026-10-13', title: 'إغلاق الشارع حتى انتهاء الشفط', by: 'م. فهد العجمي', note: 'اعتماد بموافقة غرفة العمليات' },
      { id: 'd2', date: '2026-10-13', title: 'تكليف فريق إضافي بالサポート', by: 'قائد العمليات', note: 'إسناد فريق الإخلاء 1 لدعم العمليات' },
    ],
    notes: [
      { author: 'ماجد القحطاني', role: 'قائد الفريق', time: '09:25', text: 'المنسوب يتراجع بمعدل جيد بعد فتح البالوعة الرئيسية.' },
      { author: 'بدر العتيبي', role: 'مفتش ميداني', time: '09:52', text: 'تم توثيق الموقع بالصور قبل أعمال الصيانة.' },
    ],
  },
  {
    id: 'INC-2026-017', title: 'تسرب خطير في شبكة المياه أمام مدرسة', category: 'بنية تحتية', severity: 'حرج', status: 'قيد التنفيذ',
    zone: 'حي حطين', address: 'شارع حطين الرئيسي أمام مدرسة الرواد', lat: 24.7411, lng: 46.5833,
    reportedAt: '2026-10-13 05:12', startedAt: '2026-10-13 04:40', commander: 'م. سارة النعيمي',
    teams: ['فريق الطوارئ المائي', 'فريق التفتيش الميداني'], affected: 'مدرسة واحدة • 850 طالب • 12 منزل',
    description: 'تسرب في خط مياه رئيسي بالقرب من أساسات مبنى مدرسي، مع احتمال هبوط في الرصيف المقابل.',
    progress: 40, photos: 9, videos: 2,
    docs: [
      { name: 'تقرير فني - التسرب.pdf', type: 'PDF', date: '2026-10-13' },
      { name: 'خريطة خطوط المياه.xlsx', type: 'Excel', date: '2026-10-13' },
    ],
    events: [
      { id: 'e1', time: '04:40', title: 'بدء التسرب', description: 'ملاحظة انسكاب منخفض قرب المدرسة', icon: 'fa-solid fa-droplet', tone: 'sky' },
      { id: 'e2', time: '05:12', title: 'بلاغ عبر التطبيق', description: 'بلاغ مواطن مع صور وفيديو', actor: 'ياسر الغامدي', icon: 'fa-solid fa-mobile-screen', tone: 'navy' },
      { id: 'e3', time: '05:30', title: 'تكليف فريق الطوارئ', description: 'إرسال فريق الطوارئ المائي فوراً', actor: 'غرفة العمليات', icon: 'fa-solid fa-truck-fast', tone: 'red' },
      { id: 'e4', time: '06:05', title: 'إغلاق المقطع', description: 'إيقاف الضخ في الخط المتأثر', actor: 'فريق الطوارئ المائي', icon: 'fa-solid fa-valve', tone: 'emerald' },
    ],
    decisions: [
      { id: 'd1', date: '2026-10-13', title: 'إخلاء المدرسة مؤقتاً كإجراء احترازي', by: 'مدير التعليم بالمدينة', note: 'حتى انتهاء أعمال الإصلاح' },
    ],
    notes: [{ author: 'سلطان العنزي', role: 'قائد الفريق', time: '06:20', text: 'تم فصل الخط وسيبدأ الإصلاح خلال ساعة.' }],
  },
  {
    id: 'INC-2026-016', title: 'مخالفة بناء كبيرة تحت التنفيذ - الياسمين', category: 'مخالفات عمرانية', severity: 'عالي', status: 'قيد المراجعة',
    zone: 'حي الياسمين', address: 'شارع أنس بن مالك، قطعة 118', lat: 24.8264, lng: 46.6412,
    reportedAt: '2026-10-13 07:55', startedAt: '2026-10-10 09:00', commander: 'م. منصور الشمراني',
    teams: ['فريق التفتيش الميداني'], affected: 'قطعة سكنية واحدة • 3 مبانٍ مجاورة',
    description: 'إنشاء طابق إضافي وتوسعة بدون ترخيص يتجاوز ارتفاع المخطط المعتمد مقدار طابقين.',
    progress: 55, photos: 16, videos: 4,
    docs: [
      { name: 'محضر مخالفة رقم 4412.pdf', type: 'PDF', date: '2026-10-13' },
      { name: 'المخطط المعتمد للقطعة.dwg', type: 'DWG', date: '2026-10-08' },
      { name: 'خطاب إيقاف العمل.docx', type: 'Word', date: '2026-10-13' },
    ],
    events: [
      { id: 'e1', time: '10/10', title: 'بدء أعمال البناء', description: 'رصد أولي من جولة المتابعة', icon: 'fa-solid fa-hard-hat', tone: 'amber' },
      { id: 'e2', time: '07:55', title: 'بلاغ مواطن', description: 'بلاغ إلكتروني مرفق بصور', actor: 'سارة العتيبي', icon: 'fa-solid fa-envelope', tone: 'navy' },
      { id: 'e3', time: '09:30', title: 'زيارة ميدانية', description: 'توثيق المخالفة وتحرير محضر', actor: 'فريق التفتيش الميداني', icon: 'fa-solid fa-clipboard-check', tone: 'red' },
    ],
    decisions: [
      { id: 'd1', date: '2026-10-13', title: 'إيقاف العمل فوراً', by: 'رئيس إدارة التفتيش', note: 'وفق المادة 64 من أنظمة البناء' },
    ],
    notes: [{ author: 'منصور الشمراني', role: 'قائد التفتيش', time: '10:05', text: 'الجاور الرئيسي غير مطابق للمخطط، طلب توثيق إضافي.' }],
  },
  {
    id: 'INC-2026-015', title: 'هبوط إسفلتي وخطر على المرور - العليا', category: 'بنية تحتية', severity: 'عالي', status: 'قيد التنفيذ',
    zone: 'حي العليا', address: 'طريق الملك عبدالله الفرعي', lat: 24.6902, lng: 46.6784,
    reportedAt: '2026-10-12 22:14', startedAt: '2026-10-12 21:00', commander: 'م. خالد الزامل',
    teams: ['فريق السفلتة المتقدم', 'فريق المرور الميداني'], affected: 'محور مروري رئيسي • 12,000 مركبة/يوم',
    description: 'هبوط في الطبقة الإسفلتية تكوّن حفرة عمقها نصف متر على مسار مروري سريع.',
    progress: 70, photos: 7, videos: 1,
    docs: [
      { name: 'تقرير معالجة الحفرة.pdf', type: 'PDF', date: '2026-10-13' },
      { name: 'كتلة الرصف - المواصفات.xlsx', type: 'Excel', date: '2026-10-12' },
    ],
    events: [
      { id: 'e1', time: '21:00', title: 'رصد الحفرة', description: 'دورية ليلية أبلغت عن هبوط', icon: 'fa-solid fa-car', tone: 'amber' },
      { id: 'e2', time: '22:14', title: 'استلام البلاغ', description: 'بلاغ بريد إلكتروني رسمي', actor: 'ناصر الشمري', icon: 'fa-solid fa-envelope-open', tone: 'navy' },
      { id: 'e3', time: '23:00', title: 'سقفاً مؤقتاً', description: 'وضع كتلة كاسحة مؤقتة', actor: 'فريق السفلتة المتقدم', icon: 'fa-solid fa-helmet-safety', tone: 'emerald' },
      { id: 'e4', time: '08:00', title: 'بدء الرصف النهائي', description: 'تجهيز الموقع لرصف كلي', actor: 'فريق السفلتة المتقدم', icon: 'fa-solid fa-road', tone: 'sky' },
    ],
    decisions: [{ id: 'd1', date: '2026-10-13', title: 'رصف كلي ليلاً مع إغلاق جزئي', by: 'مدير الصيانة', note: 'نافذة العمل 23:00 - 05:00' }],
    notes: [{ author: 'خالد الزامل', role: 'قائد الفريق', time: '08:30', text: 'تم تحضير المعدات وسيبدأ الرصف بعد صعود المرور.' }],
  },
  {
    id: 'INC-2026-014', title: 'انحراف مسار شوارع عن المخطط - الروضة', category: 'مخالفات تخطيطية', severity: 'عالي', status: 'مجدول',
    zone: 'حي الروضة', address: 'مشروع أرض رقم 302', lat: 24.7195, lng: 46.7284,
    reportedAt: '2026-10-12 09:33', startedAt: '2026-09-28 08:00', commander: 'م. أمل الفهد',
    teams: ['فريق التخطيط الميداني'], affected: 'مشروع عمراني قيد التنفيذ',
    description: 'تنفيذ مسار شوارع ينحرف عن المخطط المعتمد بمقدار 4.5 متر، مما يؤثر على أداءات القطع المجاورة.',
    progress: 25, photos: 11, videos: 0,
    docs: [
      { name: 'تقرير المطابقة الفنية.pdf', type: 'PDF', date: '2026-10-12' },
      { name: 'المخطط العام المعتمد.dwg', type: 'DWG', date: '2026-08-15' },
      { name: 'محضر لجنة المسطحات.docx', type: 'Word', date: '2026-10-12' },
    ],
    events: [
      { id: 'e1', time: '09/28', title: 'رصد أولي', description: 'تباعد في مسار الشارع المنفذ', icon: 'fa-solid fa-ruler-combined', tone: 'amber' },
      { id: 'e2', time: '09:33', title: 'رفع التقرير', description: 'بلاغ داخلي من لجنة المتابعة', actor: 'لجنة المتابعة', icon: 'fa-solid fa-file-circle-exclamation', tone: 'navy' },
      { id: 'e3', time: '10/12', title: 'قياس GNSS ميداني', description: 'تأكيد الانحراف 4.5 م', actor: 'فريق التخطيط الميداني', icon: 'fa-solid fa-satellite-dish', tone: 'violet' },
    ],
    decisions: [{ id: 'd1', date: '2026-10-12', title: 'إيقاف الدفعة التنفيذية القادمة', by: 'لجنة المسطحات', note: 'حتى تقديم تصحيح إجرائي' }],
    notes: [{ author: 'أمل الفهد', role: 'مهندسة المساحة', time: '14:15', text: 'الانحراف مؤكّد بالقياس، جارٍ تجهيز التصحيح.' }],
  },
  {
    id: 'INC-2026-013', title: 'تجمع نفايات وشبه صحية - سوق السليمانية', category: 'بيئة ونظافة', severity: 'متوسط', status: 'مغلق',
    zone: 'حي السليمانية', address: 'خلف سوق السليمانية الشعبي', lat: 24.6624, lng: 46.7085,
    reportedAt: '2026-10-11 19:20', startedAt: '2026-10-11 12:00', commander: 'م. عبدالرحمن الزهراني',
    teams: ['فريق الإخلاء 1'], affected: 'سوق شعبي • 60 محلاً',
    description: 'تراكم نفايات خلف السوق لأربعة أيام بسبب تعطل جدول الجمع.',
    progress: 100, photos: 5, videos: 0,
    docs: [{ name: 'تقرير الإغلاق.pdf', type: 'PDF', date: '2026-10-12' }],
    events: [
      { id: 'e1', time: '19:20', title: 'بلاغ هاتفي', description: 'بلاغ من أحد التجار', actor: 'منى الشهري', icon: 'fa-solid fa-phone', tone: 'navy' },
      { id: 'e2', time: '20:10', title: 'وصول الفريق', description: 'بدء أعمال الإخلاء', actor: 'فريق الإخلاء 1', icon: 'fa-solid fa-trash-can', tone: 'emerald' },
      { id: 'e3', time: '10/12', title: 'إغلاق البلاغ', description: 'توثيق الإغلاق بالصور', actor: 'إدارة النظافة', icon: 'fa-solid fa-circle-check', tone: 'emerald' },
    ],
    decisions: [{ id: 'd1', date: '2026-10-12', title: 'إعادة جدولة الجمع مرتين أسبوعياً', by: 'مدير النظافة', note: 'لمنع التكرار' }],
    notes: [{ author: 'عبدالرحمن الزهراني', role: 'قائد الفريق', time: '10/12', text: 'تم الإخلاء الكامل ورُفعت الصور للمراجعة.' }],
  },
];
