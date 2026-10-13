import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

const dom = new JSDOM('<!doctype html><html lang="ar" dir="rtl"><body><div id="root"></div></body></html>', {
  url: 'http://localhost:3000/#/',
  pretendToBeVisual: true,
  runScripts: 'outside-only',
});

const { window } = dom;
const g = globalThis;
const assign = (k, v) => { try { Object.defineProperty(g, k, { value: v, configurable: true, writable: true }); } catch (e) { g[k] = v; } };

assign('window', window);
assign('document', window.document);
assign('localStorage', window.localStorage);
assign('HTMLElement', window.HTMLElement);
assign('HTMLCanvasElement', window.HTMLCanvasElement);
assign('SVGElement', window.SVGElement);
assign('Element', window.Element);
assign('Node', window.Node);
assign('Event', window.Event);
assign('MouseEvent', window.MouseEvent);
assign('KeyboardEvent', window.KeyboardEvent);
assign('getComputedStyle', window.getComputedStyle.bind(window));
assign('requestAnimationFrame', window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : (cb) => setTimeout(cb, 16));
assign('cancelAnimationFrame', window.cancelAnimationFrame ? window.cancelAnimationFrame.bind(window) : clearTimeout);
assign('ResizeObserver', class { observe() {} unobserve() {} disconnect() {} });
assign('MutationObserver', window.MutationObserver);
assign('customElements', window.customElements);
window.matchMedia = window.matchMedia || (() => ({ matches: false, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} }));
window.scrollTo = () => {};
g.location = window.location;
try { g.navigator = window.navigator; } catch (e) { /* read-only in Node */ }

const errors = [];
window.addEventListener('error', (e) => errors.push('window.onerror: ' + (e.error?.stack || e.message)));
const origError = console.error;
console.error = (...args) => { errors.push('console.error: ' + args.map(String).join(' ').slice(0, 400)); origError(...args); };

const distDir = path.resolve('dist/assets');
const jsFile = fs.readdirSync(distDir).find((f) => /^index-.*\.js$/.test(f));
await import(path.join(distDir, jsFile));
await new Promise((r) => setTimeout(r, 500));

const routes = [
  ['#/', 'لوحة القيادة الرئيسية'],
  ['#/intake', 'مركز استقبال البلاغات'],
  ['#/reports', 'سجل البلاغات'],
  ['#/incidents', 'إدارة الحوادث'],
  ['#/incidents/INC-2026-018', 'سجل الأحداث'],
  ['#/map', 'طبقات'],
  ['#/teams', 'المناوبات'],
  ['#/inspectors', 'أداء المفتشين'],
  ['#/tasks', 'المهام الميدانية'],
  ['#/analytics', 'البلاغات حسب المنطقة'],
  ['#/documents', 'مركز الوثائق'],
  ['#/communications', 'القنوات'],
  ['#/notifications', 'تفضيلات الإشعارات'],
  ['#/reports-center', 'قوالب التقارير'],
  ['#/users', 'مصفوفة الصلاحيات'],
  ['#/audit', 'سجل العمليات التفصيلي'],
  ['#/settings', 'أنواع البلاغات'],
  ['#/login', 'تسجيل الدخول'],
];

const results = [];
for (const [hash, marker] of routes) {
  errors.length = 0;
  window.location.hash = hash;
  window.dispatchEvent(new window.Event('hashchange'));
  await new Promise((r) => setTimeout(r, 450));
  const text = window.document.body.textContent || '';
  const ok = text.includes(marker) && text.length > 400;
  results.push({ hash, ok, markerFound: text.includes(marker), len: text.length, errors: [...errors] });
}

let fail = 0;
for (const r of results) {
  if (r.ok) { console.log(`PASS ${r.hash} (${r.len} chars)`); }
  else {
    fail++;
    console.log(`FAIL ${r.hash} marker=${r.markerFound} len=${r.len}`);
    r.errors.slice(0, 3).forEach((e) => console.log('   ' + e.slice(0, 300)));
  }
}
console.log(fail === 0 ? 'ALL ROUTES PASSED' : `${fail} ROUTE(S) FAILED`);
process.exit(fail === 0 ? 0 : 1);
