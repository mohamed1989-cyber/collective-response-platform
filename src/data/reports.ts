/* بيانات البلاغات وقنوات الاستقبال والأحياء */

export const REPORT_STATUSES = ['جديد', 'قيد المراجعة', 'مجدول', 'قيد التنفيذ', 'مغلق'] as const;
export const SEVERITIES = ['حرج', 'عالي', 'متوسط', 'منخفض'] as const;
export const PRIORITIES = ['فورية', 'عالية', 'عادية', 'منخفضة'] as const;

export const REPORT_TYPES = [
  'انسداد تصريف مياه الأمطار',
  'تسرب في شبكة المياه',
  'عطل إنارة عمومية',
  'طبقات إسفلتية تالفة',
  'مخلفات بناء في الشارع',
  'انحراف في تنفيذ مخطط',
  'بناء بدون ترخيص',
  'شجرة مائتة أو مائلة',
  'تجمع نفايات',
  'انسكاب زيت على الطريق',
  'تلف رصيف مشاة',
  'حاجز مروري تالف',
] as const;

export const DEPARTMENTS = [
  'إدارة الصيانة',
  'إدارة المشاريع',
  'إدارة التخطيط',
  'إدارة التفتيش والمتابعة',
  'إدارة النظافة',
  'إدارة الحدائق والمساحات الخضراء',
  'إدارة التراث والتصميم',
  'إدارة الاستملاكات',
] as const;

export const ZONES = ['حي النرجس', 'حي الياسمين', 'حي الملقا', 'حي العارض', 'حي حطين', 'حي العليا', 'حي السليمانية', 'حي الروضة', 'حي النخيل', 'حي المصيف'] as const;

export interface Channel {
  id: string;
  name: string;
  icon: string;
  count: number;
  trend: number;
}

export const CHANNELS: Channel[] = [
  { id: 'citizen', name: 'المواطنون', icon: 'fa-solid fa-users', count: 512, trend: 8 },
  { id: 'staff', name: 'موظفو البلدية', icon: 'fa-solid fa-id-badge', count: 208, trend: 3 },
  { id: 'phone', name: 'الهاتف', icon: 'fa-solid fa-phone-volume', count: 176, trend: -2 },
  { id: 'email', name: 'البريد الإلكتروني', icon: 'fa-solid fa-envelope-open-text', count: 64, trend: 1 },
  { id: 'forms', name: 'النماذج الإلكترونية', icon: 'fa-solid fa-file-signature', count: 98, trend: 12 },
  { id: 'app', name: 'تطبيق الهاتف', icon: 'fa-solid fa-mobile-screen-button', count: 143, trend: 21 },
  { id: 'api', name: 'واجهات API', icon: 'fa-solid fa-code', count: 47, trend: 5 },
];

export interface AiInsight {
  classification: string;
  confidence: number;
  duplicateOf?: string;
  suggestedPriority: string;
  suggestedDepartment: string;
  suggestedTeam: string;
  summary: string;
  ocrText?: string;
  initialReport?: string;
}

export interface Report {
  id: string;
  type: string;
  severity: string;
  priority: string;
  status: string;
  zone: string;
  address: string;
  lat: number;
  lng: number;
  reporter: string;
  channel: string;
  createdAt: string;
  department: string;
  team?: string;
  assignee?: string;
  photos: number;
  videos: number;
  attachments: number;
  description: string;
  ai: AiInsight;
}

export const REPORTS: Report[] = [
  {
    id: 'BR-2026-1042', type: 'انسداد تصريف مياه الأمطار', severity: 'حرج', priority: 'فورية', status: 'قيد التنفيذ',
    zone: 'حي النرجس', address: 'طريق الأمير محمد بن سعد مع شارع 24', lat: 24.7912, lng: 46.6402,
    reporter: 'عبدالله الحربي', channel: 'تطبيق الهاتف', createdAt: '2026-10-13 08:42', department: 'إدارة الصيانة',
    team: 'فريق الانصاف 1', assignee: 'ماجد القحطاني', photos: 4, videos: 1, attachments: 2,
    description: 'تجمّع مياه أمطار يعيق حركة المرور عند التقاطع منذ الساعات الأولى من الصباح.',
    ai: { classification: 'انسداد تصريف مياه الأمطار', confidence: 96, suggestedPriority: 'فورية', suggestedDepartment: 'إدارة الصيانة', suggestedTeam: 'فريق الانصاف 1', summary: 'انسداد بالوعة رئيسية يعيق تقاطعاً حيوياً؛ يُقترح التدخل خلال ساعتين.', ocrText: 'شارع 24 - النرجس - ممنوع الوقف' },
  },
  {
    id: 'BR-2026-1041', type: 'بناء بدون ترخيص', severity: 'عالي', priority: 'عالية', status: 'قيد المراجعة',
    zone: 'حي الياسمين', address: 'شارع أنس بن مالك، قطعة 118', lat: 24.8264, lng: 46.6412,
    reporter: 'سارة العتيبي', channel: 'النماذج الإلكترونية', createdAt: '2026-10-13 07:55', department: 'إدارة التفتيش والمتابعة',
    team: 'فريق التفتيش الميداني', photos: 6, videos: 0, attachments: 1,
    description: 'إنشاء طابق إضافي بدون ترخيص ويتجاوز ارتفاع المخطط المعتمد للقطعة.',
    ai: { classification: 'بناء بدون ترخيص', confidence: 92, suggestedPriority: 'عالية', suggestedDepartment: 'إدارة التفتيش والمتابعة', suggestedTeam: 'فريق التفتيش الميداني', summary: 'مخالفة ارتفاع مكشوفة في الصور مع تجاوز حدود القطعة؛ يُوصى بمحضر ميداني فوري.' },
  },
  {
    id: 'BR-2026-1040', type: 'عطل إنارة عمومية', severity: 'متوسط', priority: 'عادية', status: 'جديد',
    zone: 'حي الملقا', address: 'شارع التخصصي، مخرج 5', lat: 24.7792, lng: 46.5821,
    reporter: 'موحد الدوسري', channel: 'الهاتف', createdAt: '2026-10-13 06:30', department: 'إدارة الصيانة',
    photos: 0, videos: 0, attachments: 0,
    description: 'أعمدة إنارة متوقفة عن العمل على مسافة 300 متر تقريباً.',
    ai: { classification: 'عطل إنارة عمومية', confidence: 88, suggestedPriority: 'عادية', suggestedDepartment: 'إدارة الصيانة', suggestedTeam: 'فريق الإنارة الليلي', summary: 'انقطاع متتابع لأعمدة إنارة يرجح فيه عطل في لوحة توزيع مجاورة.', initialReport: 'فيه كهرباء مقطوعة من يومين' },
  },
  {
    id: 'BR-2026-1039', type: 'طبقات إسفلتية تالفة', severity: 'عالي', priority: 'عالية', status: 'قيد التنفيذ',
    zone: 'حي العليا', address: 'طريق الملك عبدالله الفرعي الدائري الشمالي', lat: 24.6902, lng: 46.6784,
    reporter: 'ناصر الشمري', channel: 'البريد الإلكتروني', createdAt: '2026-10-12 22:14', department: 'إدارة الصيانة',
    team: 'فريق السفلتة المتقدم', assignee: 'خالد الزامل', photos: 3, videos: 0, attachments: 0,
    description: 'هبوط في الطبقة الإسفلتية وتكوّن حفرة بعرض نصف متر تشكل خطرة على المركبات.',
    ai: { classification: 'طبقات إسفلتية تالفة', confidence: 94, suggestedPriority: 'عالية', suggestedDepartment: 'إدارة الصيانة', suggestedTeam: 'فريق السفلتة المتقدم', summary: 'حفرة خطرة على مسار مروري سريع؛ يتطلب سقفاً مؤقتاً ثم رصفاً كاملاً.' },
  },
  {
    id: 'BR-2026-1038', type: 'مخلفات بناء في الشارع', severity: 'متوسط', priority: 'عادية', status: 'مغلق',
    zone: 'حي العارض', address: 'شارع العارض، قطعة 45', lat: 24.7591, lng: 46.6712,
    reporter: 'هند القرني', channel: 'النماذج الإلكترونية', createdAt: '2026-10-12 16:05', department: 'إدارة النظافة',
    team: 'فريق الإخلاء 2', photos: 2, videos: 0, attachments: 0,
    description: 'رمي مخلفات بناء أمام القطاع يعيق المشاة.',
    ai: { classification: 'مخلفات بناء في الشارع', confidence: 90, suggestedPriority: 'عادية', suggestedDepartment: 'إدارة النظافة', suggestedTeam: 'فريق الإخلاء 2', summary: 'مخلفات بناء في ممر المشاة؛ تم الإخلاء خلال 6 ساعات.' },
  },
  {
    id: 'BR-2026-1037', type: 'تسرب في شبكة المياه', severity: 'حرج', priority: 'فورية', status: 'قيد التنفيذ',
    zone: 'حي حطين', address: 'شارع حطين الرئيسي أمام مدرسة الرواد', lat: 24.7411, lng: 46.5833,
    reporter: 'ياسر الغامدي', channel: 'تطبيق الهاتف', createdAt: '2026-10-13 05:12', department: 'إدارة الصيانة',
    team: 'فريق الطوارئ المائي', assignee: 'سلطان العنزي', photos: 5, videos: 2, attachments: 1,
    description: 'انسكاب مياه كبير من شبكة رئيسية يهدد أساسات مبنى مدرسي مجاور.',
    ai: { classification: 'تسرب في شبكة المياه', confidence: 97, suggestedPriority: 'فورية', suggestedDepartment: 'إدارة الصيانة', suggestedTeam: 'فريق الطوارئ المائي', summary: 'تسرب في خط رئيسي أمام مبنى تعليمي؛ إغلاق مقطع وإصلاح عاجل مطلوب.' },
  },
  {
    id: 'BR-2026-1036', type: 'شجرة مائتة أو مائلة', severity: 'عالي', priority: 'عالية', status: 'مجدول',
    zone: 'حي النخيل', address: 'حديقة النخيل الشمالية', lat: 24.7305, lng: 46.6284,
    reporter: 'راشد المطيري', channel: 'المواطنون', createdAt: '2026-10-12 11:47', department: 'إدارة الحدائق والمساحات الخضراء',
    team: 'فريق البستنة 3', photos: 3, videos: 0, attachments: 0,
    description: 'شجرة كبيرة مائلة نحو ممر المشاة بسبب تراكم التربة.',
    ai: { classification: 'شجرة مائتة أو مائلة', confidence: 91, suggestedPriority: 'عالية', suggestedDepartment: 'إدارة الحدائق والمساحات الخضراء', suggestedTeam: 'فريق البستنة 3', summary: 'خطر سقوط على ممر مكتظ؛ يُنصح بتشذيب فوري وتثبيت الجذع.' },
  },
  {
    id: 'BR-2026-1035', type: 'تجمع نفايات', severity: 'منخفض', priority: 'منخفضة', status: 'مغلق',
    zone: 'حي السليمانية', address: 'خلف سوق السليمانية الشعبي', lat: 24.6624, lng: 46.7085,
    reporter: 'منى الشهري', channel: 'الهاتف', createdAt: '2026-10-11 19:20', department: 'إدارة النظافة',
    team: 'فريق الإخلاء 1', photos: 1, videos: 0, attachments: 0,
    description: 'تجمع نفايات منزلية خلف السوق.',
    ai: { classification: 'تجمع نفايات', confidence: 86, suggestedPriority: 'منخفضة', suggestedDepartment: 'إدارة النظافة', suggestedTeam: 'فريق الإخلاء 1', summary: 'دورة جمع متأخرة؛ تمت المعالجة.' },
  },
  {
    id: 'BR-2026-1034', type: 'انحراف في تنفيذ مخطط', severity: 'حرج', priority: 'فورية', status: 'قيد المراجعة',
    zone: 'حي الروضة', address: 'مشروع أرض رقم 302، طريق الروضة', lat: 24.7195, lng: 46.7284,
    reporter: 'لجنة المتابعة', channel: 'موظفو البلدية', createdAt: '2026-10-12 09:33', department: 'إدارة التخطيط',
    team: 'فريق التخطيط الميداني', photos: 8, videos: 1, attachments: 3,
    description: 'انحراف في مسار الشوارع المنفذ مقارنة بالمخطط المعتمد.',
    ai: { classification: 'انحراف في تنفيذ مخطط', confidence: 93, suggestedPriority: 'فورية', suggestedDepartment: 'إدارة التخطيط', suggestedTeam: 'فريق التخطيط الميداني', summary: 'تباعد 4.5 م عن مسار المخطط المعتمد؛ يُوصى بإيقاف العمل ورفع تقرير للجنة.' },
  },
  {
    id: 'BR-2026-1033', type: 'انسكاب زيت على الطريق', severity: 'متوسط', priority: 'عالية', status: 'قيد التنفيذ',
    zone: 'حي المصيف', address: 'طريق المصيف الدائري', lat: 24.7012, lng: 46.6521,
    reporter: 'فيصل العمري', channel: 'تطبيق الهاتف', createdAt: '2026-10-13 04:48', department: 'إدارة النظافة',
    team: 'فريق الإخلاء 1', photos: 2, videos: 0, attachments: 0,
    description: 'انسكاب زيت على مسافة 20 متر يقلل التماسك الإطارات.',
    ai: { classification: 'انسكاب زيت على الطريق', confidence: 89, suggestedPriority: 'عالية', suggestedDepartment: 'إدارة النظافة', suggestedTeam: 'فريق الإخلاء 1', summary: 'انسكاب زيتي خطر على المرور ليلًا؛ تنظيف ومصب إشارات تحذيرية.' },
  },
  {
    id: 'BR-2026-1032', type: 'تلف رصيف مشاة', severity: 'منخفض', priority: 'عادية', status: 'جديد',
    zone: 'حي الياسمين', address: 'شارع الياسمين، مقابل المكتبة', lat: 24.8302, lng: 46.6389,
    reporter: 'لمياء السبيعي', channel: 'البريد الإلكتروني', createdAt: '2026-10-13 09:05', department: 'إدارة الصيانة',
    photos: 2, videos: 0, attachments: 0,
    description: 'كسر في بلاط الرصيف وارتفاع غير مطابق لمعايير المسطحات.',
    ai: { classification: 'تلف رصيف مشاة', confidence: 85, suggestedPriority: 'عادية', suggestedDepartment: 'إدارة الصيانة', suggestedTeam: 'فريق الأرصفة', summary: 'تلف سطحي في ممر مشاة؛ أولوية عادية مع توصية إصلاح ضمن الدورة القادمة.' },
  },
  {
    id: 'BR-2026-1031', type: 'حاجز مروري تالف', severity: 'متوسط', priority: 'عادية', status: 'قيد التنفيذ',
    zone: 'حي العليا', address: 'مخرج 7 من طريق الملك فهد', lat: 24.6875, lng: 46.6712,
    reporter: 'دورية المرور', channel: 'واجهات API', createdAt: '2026-10-12 14:10', department: 'إدارة الصيانة',
    team: 'فريق المرور الميداني', photos: 1, videos: 0, attachments: 0,
    description: 'انكسار أعمدة حاجز الفاصل الأوسط.',
    ai: { classification: 'حاجز مروري تالف', confidence: 87, suggestedPriority: 'عادية', suggestedDepartment: 'إدارة الصيانة', suggestedTeam: 'فريق المرور الميداني', summary: 'أعمدة فاصل مكسورة بعد حادث مروري؛ إعادة تثبيت وفق كود السلامة.' },
  },
  {
    id: 'BR-2026-1030', type: 'تسرب في شبكة المياه', severity: 'متوسط', priority: 'عادية', status: 'مغلق',
    zone: 'حي النرجس', address: 'شارع 30، قطعة 77', lat: 24.7871, lng: 46.6465,
    reporter: 'تركي السالم', channel: 'المواطنون', createdAt: '2026-10-11 13:26', department: 'إدارة الصيانة',
    team: 'فريق الطوارئ المائي', photos: 2, videos: 0, attachments: 0,
    description: 'ماء نازف من وصلة توزيع أمام منزل.',
    ai: { classification: 'تسرب في شبكة المياه', confidence: 84, suggestedPriority: 'عادية', suggestedDepartment: 'إدارة الصيانة', suggestedTeam: 'فريق الطوارئ المائي', summary: 'تسرب صغير أُصلح خلال 4 ساعات.' },
  },
  {
    id: 'BR-2026-1029', type: 'عطل إنارة عمومية', severity: 'متوسط', priority: 'عادية', status: 'قيد المراجعة',
    zone: 'حي الروضة', address: 'شارع الأمير تركي الأول', lat: 24.7241, lng: 46.7302,
    reporter: 'أحمد باوزير', channel: 'تطبيق الهاتف', createdAt: '2026-10-13 02:17', department: 'إدارة الصيانة',
    photos: 1, videos: 0, attachments: 0,
    description: 'ثلاثة أعمدة إنارة لا تعمل.',
    ai: { classification: 'عطل إنارة عمومية', confidence: 81, duplicateOf: 'BR-2026-1040', suggestedPriority: 'عادية', suggestedDepartment: 'إدارة الصيانة', suggestedTeam: 'فريق الإنارة الليلي', summary: 'قد يتطابق مع بلاغ مفتوح لنفس المنطقة؛ يُوصى بالدمج.', initialReport: 'الانارة مطفية كلها' },
  },
  {
    id: 'BR-2026-1028', type: 'انحراف في تنفيذ مخطط', severity: 'عالي', priority: 'عالية', status: 'مجدول',
    zone: 'حي الملقا', address: 'قطعة 210، مخطط الملقا الشرقي', lat: 24.7834, lng: 46.5791,
    reporter: 'مكتب هندسي معتمد', channel: 'النماذج الإلكترونية', createdAt: '2026-10-11 10:02', department: 'إدارة التخطيط',
    photos: 4, videos: 0, attachments: 5,
    description: 'مظلة خارج حدود المبنى بمقدار 1.2 متر.',
    ai: { classification: 'انحراف في تنفيذ مخطط', confidence: 90, suggestedPriority: 'عالية', suggestedDepartment: 'إدارة التخطيط', suggestedTeam: 'فريق التخطيط الميداني', summary: 'تجاوز مسطح معماري لحدود القطعة؛ مراجعة لجنة المسطحات مطلوبة.' },
  },
  {
    id: 'BR-2026-1027', type: 'تجمع نفايات', severity: 'متوسط', priority: 'عالية', status: 'قيد التنفيذ',
    zone: 'حي حطين', address: 'سوق حطين التجاري - المدخل الشرقي', lat: 24.7445, lng: 46.5867,
    reporter: 'مجموعة تجار', channel: 'الهاتف', createdAt: '2026-10-13 03:41', department: 'إدارة النظافة',
    team: 'فريق الإخلاء 2', photos: 3, videos: 1, attachments: 0,
    description: 'حاويات ممتلئة وتجمع نفايات منذ يومين.',
    ai: { classification: 'تجمع نفايات', confidence: 93, suggestedPriority: 'عالية', suggestedDepartment: 'إدارة النظافة', suggestedTeam: 'فريق الإخلاء 2', summary: 'ارتفاع نفايات في منطقة تجارية كثيفة؛ زيادة دورة الجمع مؤقتاً.' },
  },
];

/* ---------------- الأحياء والإحداثيات ---------------- */

export interface ZoneStat {
  name: string;
  lat: number;
  lng: number;
  reports: number;
  open: number;
  teams: number;
  completion: number;
}

export const ZONE_STATS: ZoneStat[] = [
  { name: 'حي النرجس', lat: 24.79, lng: 46.64, reports: 186, open: 21, teams: 2, completion: 89 },
  { name: 'حي الياسمين', lat: 24.828, lng: 46.64, reports: 164, open: 18, teams: 2, completion: 86 },
  { name: 'حي الملقا', lat: 24.781, lng: 46.581, reports: 142, open: 15, teams: 1, completion: 88 },
  { name: 'حي العارض', lat: 24.759, lng: 46.671, reports: 131, open: 12, teams: 1, completion: 91 },
  { name: 'حي حطين', lat: 24.742, lng: 46.584, reports: 127, open: 24, teams: 2, completion: 79 },
  { name: 'حي العليا', lat: 24.69, lng: 46.678, reports: 118, open: 14, teams: 1, completion: 90 },
  { name: 'حي السليمانية', lat: 24.663, lng: 46.708, reports: 104, open: 9, teams: 1, completion: 93 },
  { name: 'حي الروضة', lat: 24.721, lng: 46.729, reports: 96, open: 11, teams: 1, completion: 85 },
  { name: 'حي النخيل', lat: 24.73, lng: 46.628, reports: 88, open: 7, teams: 1, completion: 94 },
  { name: 'حي المصيف', lat: 24.701, lng: 46.652, reports: 92, open: 8, teams: 1, completion: 92 },
];

function box(lat: number, lng: number, d = 0.011): [number, number][] {
  return [
    [lat + d, lng - d],
    [lat + d, lng + d],
    [lat - d, lng + d],
    [lat - d, lng - d],
  ];
}

/** حدود الأحياء للخريطة الذكية */
export const ZONE_POLYGONS: { name: string; points: [number, number][] }[] = ZONE_STATS.map((z) => ({
  name: z.name,
  points: box(z.lat, z.lng),
}));

/** استعمالات الأراضي */
export const LAND_USES: { name: string; color: string; points: [number, number][]; area: string }[] = [
  { name: 'سكني', color: '#2c5fa2', points: box(24.79, 46.64, 0.014), area: '12.4 كم²' },
  { name: 'تجاري', color: '#f59e0b', points: box(24.744, 46.586, 0.008), area: '3.1 كم²' },
  { name: 'حكومي', color: '#8b5cf6', points: box(24.69, 46.678, 0.008), area: '2.6 كم²' },
  { name: 'أخضر', color: '#10b981', points: box(24.73, 46.628, 0.01), area: '4.8 كم²' },
  { name: 'صناعي', color: '#64748b', points: box(24.663, 46.708, 0.009), area: '5.2 كم²' },
  { name: 'تعليمي', color: '#06b6d4', points: box(24.721, 46.729, 0.007), area: '1.9 كم²' },
];

export interface ProjectItem {
  id: string;
  name: string;
  zone: string;
  status: string;
  progress: number;
  lat: number;
  lng: number;
  budget: string;
}

export const PROJECTS: ProjectItem[] = [
  { id: 'PRJ-201', name: 'تطوير محور حي النرجس الشمالي', zone: 'حي النرجس', status: 'قيد التنفيذ', progress: 64, lat: 24.796, lng: 46.645, budget: '42 مليون ريال' },
  { id: 'PRJ-202', name: 'إعادة تأهيل شوارع الملقا', zone: 'حي الملقا', status: 'قيد التنفيذ', progress: 38, lat: 24.784, lng: 46.585, budget: '27 مليون ريال' },
  { id: 'PRJ-203', name: 'حديقة الياسمين المركزية', zone: 'حي الياسمين', status: 'مكتمل', progress: 100, lat: 24.824, lng: 46.636, budget: '15 مليون ريال' },
  { id: 'PRJ-204', name: 'مركز خدمات حطين الاجتماعي', zone: 'حي حطين', status: 'متأخر', progress: 52, lat: 24.746, lng: 46.589, budget: '31 مليون ريال' },
  { id: 'PRJ-205', name: 'مرآب ذكي - العليا', zone: 'حي العليا', status: 'قيد التنفيذ', progress: 76, lat: 24.693, lng: 46.681, budget: '54 مليون ريال' },
  { id: 'PRJ-206', name: 'توسعة طريق السليمانية', zone: 'حي السليمانية', status: 'مخطط', progress: 12, lat: 24.666, lng: 46.711, budget: '38 مليون ريال' },
];

export const HERITAGE_SITES: { id: string; name: string; zone: string; status: string; lat: number; lng: number }[] = [
  { id: 'HR-11', name: 'قصر المصيف التاريخي', zone: 'حي المصيف', status: 'محمي', lat: 24.703, lng: 46.655 },
  { id: 'HR-12', name: 'سوق السليمانية القديم', zone: 'حي السليمانية', status: 'مجدول للتأهيل', lat: 24.661, lng: 46.706 },
  { id: 'HR-13', name: 'برج المراقبة الأثري', zone: 'حي الروضة', status: 'محمي', lat: 24.723, lng: 46.726 },
  { id: 'HR-14', name: 'بيت الطين التراثي', zone: 'حي النخيل', status: 'قيد الترميم', lat: 24.733, lng: 46.631 },
];
