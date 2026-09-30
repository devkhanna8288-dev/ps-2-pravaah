import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';

// Layout
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Login from './pages/Login';
import Overview from './pages/Overview';
import SupportQueue from './pages/SupportQueue';
import PersonnelDetail from './pages/PersonnelDetail';
import Workload from './pages/Workload';
import Reports from './pages/Reports';
import Audit from './pages/Audit';

function App() {
  const { isAuthenticated } = useStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />}>
          <Route index element={<Overview />} />
          <Route path="queue" element={<SupportQueue />} />
          <Route path="personnel/:id" element={<PersonnelDetail />} />
          <Route path="workload" element={<Workload />} />
          <Route path="reports" element={<Reports />} />
          <Route path="audit" element={<Audit />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
