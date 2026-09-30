import { Outlet, Navigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { LayoutDashboard, Users, Activity, FileText, ShieldAlert, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';

const Sidebar = ({ isOpen, toggle }: { isOpen: boolean, toggle: () => void }) => {
  const { logout } = useStore();
  
  const navItems = [
    { name: 'Overview', icon: LayoutDashboard, path: '/' },
    { name: 'Support Queue', icon: Users, path: '/queue' },
    { name: 'Workload Balancing', icon: Activity, path: '/workload' },
    { name: 'Analytics Reports', icon: FileText, path: '/reports' },
    { name: 'Privacy & Audit', icon: ShieldAlert, path: '/audit' },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 bg-navy text-white w-64 transform transition-transform duration-300 ease-in-out z-20 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block`}>
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-8 h-8 text-teal" />
          <span className="text-xl font-headline font-bold text-white tracking-wide">SAHAYAK</span>
        </div>
      </div>
      <nav className="mt-6">
        {navItems.map((item) => (
          <a key={item.name} href={item.path} className="flex items-center px-6 py-3 text-porcelain hover:bg-navy-dark hover:text-teal-tint transition-colors">
            <item.icon className="w-5 h-5 mr-3" />
            <span className="font-sans font-medium">{item.name}</span>
          </a>
        ))}
      </nav>
      <div className="absolute bottom-0 w-full p-6">
        <button onClick={logout} className="flex items-center text-slate hover:text-white transition-colors w-full">
          <LogOut className="w-5 h-5 mr-3" />
          <span className="font-sans font-medium">Secure Logout</span>
        </button>
      </div>
    </div>
  );
};

export default function DashboardLayout() {
  const { isAuthenticated, user } = useStore();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-porcelain overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} toggle={() => setSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-surface-outline h-16 flex items-center justify-between px-4 md:px-6 z-10">
          <button className="md:hidden p-2 text-slate-dark" onClick={() => setSidebarOpen(!isSidebarOpen)}>
            <Menu className="w-6 h-6" />
          </button>
          <div className="ml-auto flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-headline font-semibold text-slate-dark">{user?.name}</p>
              <p className="text-xs font-sans text-slate">{user?.role}</p>
            </div>
            <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center text-white font-bold">
              {user?.name.charAt(0)}
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
