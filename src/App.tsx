import { HashRouter, Route, Routes, useLocation, Link } from 'react-router-dom';
import { Layout } from './layout/Layout';
import Dashboard from './pages/Dashboard';
import IntakeCenter from './pages/IntakeCenter';
import Reports from './pages/Reports';
import Incidents from './pages/Incidents';
import IncidentDetail from './pages/IncidentDetail';
import SmartMap from './pages/SmartMap';
import Teams from './pages/Teams';
import Inspectors from './pages/Inspectors';
import Tasks from './pages/Tasks';
import Analytics from './pages/Analytics';
import Documents from './pages/Documents';
import Communications from './pages/Communications';
import Notifications from './pages/Notifications';
import ReportsCenter from './pages/ReportsCenter';
import Users from './pages/Users';
import AuditLog from './pages/AuditLog';
import Settings from './pages/Settings';
import Login from './pages/Login';

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-4">
      <span className="icon-box h-20 w-20 text-3xl bg-navy-100 text-navy-800 dark:bg-navy-800/50 dark:text-navy-200">
        <i className="fa-solid fa-compass" />
      </span>
      <h1 className="text-2xl font-extrabold text-slate-700 dark:text-slate-200">الصفحة غير موجودة</h1>
      <p className="text-sm text-slate-400">الرابط المطلوب غير متاح أو تم نقله.</p>
      <Link to="/" className="btn btn-primary">
        <i className="fa-solid fa-gauge-high" />
        العودة إلى لوحة التحكم
      </Link>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/intake" element={<IntakeCenter />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/incidents/:id" element={<IncidentDetail />} />
          <Route path="/map" element={<SmartMap />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/inspectors" element={<Inspectors />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/communications" element={<Communications />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/reports-center" element={<ReportsCenter />} />
          <Route path="/users" element={<Users />} />
          <Route path="/audit" element={<AuditLog />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
