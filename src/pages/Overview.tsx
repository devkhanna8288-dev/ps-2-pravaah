import { useEffect, useState } from 'react';
import { api } from '../services/mockApi';
import type { PersonnelRecord } from '../data/personnel';
import type { UnitRecord } from '../data/units';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Activity, ShieldCheck, HeartPulse, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// We'll quickly inline types to avoid circular/missing imports
interface OverviewStats {
  totalPersonnel: number;
  stable: number;
  watch: number;
  support: number;
}

export default function Overview() {
  const [personnel, setPersonnel] = useState<PersonnelRecord[]>([]);
  const [units, setUnits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([api.getPersonnel(), api.getUnits()]).then(([p, u]) => {
      setPersonnel(p);
      setUnits(u);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="animate-pulse flex space-x-4">Loading overview metrics...</div>;
  }

  const stats: OverviewStats = {
    totalPersonnel: personnel.length,
    stable: personnel.filter(p => p.wellbeingStatus === 'Stable').length,
    watch: personnel.filter(p => p.wellbeingStatus === 'Watch').length,
    support: personnel.filter(p => p.wellbeingStatus === 'Needs Support').length,
  };

  // Prepare chart data (mocking a global trend based on personnel data)
  const trendData = [
    { month: 'Apr', score: 85 },
    { month: 'May', score: 83 },
    { month: 'Jun', score: 80 },
    { month: 'Jul', score: 76 },
    { month: 'Aug', score: 72 },
    { month: 'Sep', score: 70 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-headline font-bold text-navy-dark">Welfare Overview</h1>
        <span className="text-sm text-slate">Last updated: Today, 0800 HRS</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Personnel" value={stats.totalPersonnel} icon={Activity} color="text-navy" bg="bg-porcelain" />
        <StatCard title="Optimal Readiness" value={stats.stable} icon={ShieldCheck} color="text-teal" bg="bg-teal-tint" />
        <StatCard title="Monitoring" value={stats.watch} icon={HeartPulse} color="text-amber" bg="bg-amber-tint" />
        <StatCard title="Care Priority" value={stats.support} icon={AlertCircle} color="text-coral" bg="bg-coral-tint" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-card border border-surface-outline">
          <h2 className="text-lg font-headline font-semibold text-navy mb-4">6-Month Wellbeing Trend (Aggregate)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#2A9D8F" strokeWidth={3} dot={{ r: 4, fill: '#2A9D8F' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-card border border-surface-outline">
          <h2 className="text-lg font-headline font-semibold text-navy mb-4">Unit Strain Levels</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={units} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" stroke="#64748B" fontSize={12} domain={[0, 100]} />
                <YAxis dataKey="name" type="category" stroke="#1E293B" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="strainScore" fill="#F4A261" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-card border border-surface-outline overflow-hidden">
        <div className="p-6 border-b border-surface-outline flex justify-between items-center">
          <h2 className="text-lg font-headline font-semibold text-navy">Priority Support Queue</h2>
          <button onClick={() => navigate('/queue')} className="text-teal font-sans font-semibold text-sm hover:text-teal-hover">View Full Registry &rarr;</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans">
            <thead className="bg-porcelain text-slate text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 font-semibold">ID</th>
                <th className="px-6 py-3 font-semibold">Unit</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold">Key Factors</th>
                <th className="px-6 py-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-outline text-sm text-slate-dark">
              {personnel.filter(p => p.wellbeingStatus === 'Needs Support').map((person) => (
                <tr key={person.id} className="hover:bg-porcelain transition-colors">
                  <td className="px-6 py-4 font-semibold">{person.id}</td>
                  <td className="px-6 py-4">{person.unit}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-coral-tint text-coral">
                      <span className="w-1.5 h-1.5 rounded-full bg-coral mr-2"></span>
                      Care Priority
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate">{person.contributingFactors.join(', ')}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-teal font-medium hover:underline">Review Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, bg }: { title: string, value: number, icon: any, color: string, bg: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-card border border-surface-outline flex items-center">
      <div className={`w-12 h-12 rounded-full ${bg} flex items-center justify-center mr-4`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div>
        <p className="text-sm text-slate font-sans mb-1">{title}</p>
        <p className={`text-2xl font-headline font-bold ${color}`}>{value}</p>
      </div>
    </div>
  );
}
