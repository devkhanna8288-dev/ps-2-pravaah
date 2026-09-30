import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/mockApi';
import type { PersonnelRecord } from '../data/personnel';
import { ArrowLeft, CheckCircle, Clock, FileText, ShieldCheck, HeartPulse, AlertCircle, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PersonnelDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [person, setPerson] = useState<PersonnelRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (id) {
      api.getPersonnelById(id).then(data => {
        setPerson(data || null);
        setLoading(false);
      });
    }
  }, [id]);

  const handleAction = (actionName: string) => {
    setToast(`Action "${actionName}" marked as done.`);
    setTimeout(() => setToast(''), 3000);
  };

  if (loading) return <div className="animate-pulse p-8">Loading detail for {id}...</div>;
  if (!person) return <div className="p-8">Personnel not found.</div>;

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Stable': return { bg: 'bg-teal-tint', text: 'text-teal', dot: 'bg-teal', icon: ShieldCheck, label: 'Optimal Readiness' };
      case 'Watch': return { bg: 'bg-amber-tint', text: 'text-amber', dot: 'bg-amber', icon: HeartPulse, label: 'Monitoring' };
      case 'Needs Support': return { bg: 'bg-coral-tint', text: 'text-coral', dot: 'bg-coral', icon: AlertCircle, label: 'Care Priority' };
      default: return { bg: 'bg-slate-100', text: 'text-slate', dot: 'bg-slate-400', icon: Info, label: 'Unknown' };
    }
  };

  const statusInfo = getStatusStyle(person.wellbeingStatus);

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 bg-navy text-white px-6 py-3 rounded-md shadow-modal z-50 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 text-teal" />
          <span className="font-sans font-medium">{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-slate hover:text-navy transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-headline font-bold text-navy-dark">Personnel Record: {person.id}</h1>
          {person.selfReportShared && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-tint text-teal border border-teal/20">
              <ShieldCheck className="w-3 h-3 mr-1" />
              Consent Active
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Summary & Factors */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-card border border-surface-outline text-center">
            <div className={`w-20 h-20 mx-auto rounded-full ${statusInfo.bg} flex items-center justify-center mb-4`}>
              <statusInfo.icon className={`w-10 h-10 ${statusInfo.text}`} />
            </div>
            <h2 className="text-xl font-headline font-bold text-navy-dark">{statusInfo.label}</h2>
            <p className="text-sm font-sans text-slate mt-1">Score: {person.supportScore}/100</p>
            
            <div className="mt-6 pt-6 border-t border-surface-outline text-left space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate font-sans">Unit</span>
                <span className="font-semibold text-navy">{person.unit}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate font-sans">Deployment Days</span>
                <span className="font-semibold text-navy">{person.deploymentDays}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate font-sans">Duty Hrs/Wk</span>
                <span className="font-semibold text-navy">{person.avgDutyHoursPerWeek}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-card border border-surface-outline">
            <h3 className="text-lg font-headline font-semibold text-navy mb-3 flex items-center">
              <Info className="w-5 h-5 mr-2 text-teal" />
              Why this suggestion?
            </h3>
            <p className="text-sm font-sans text-slate mb-4">
              System flags indicate elevated workload and reduced leave intervals over the past 90 days.
            </p>
            <ul className="list-disc pl-5 text-sm font-sans text-slate-dark space-y-1 mb-4">
              {person.contributingFactors.map(f => <li key={f}>{f}</li>)}
            </ul>
            <div className="bg-porcelain p-3 rounded-md border border-surface-outline">
              <p className="text-xs text-slate-dark italic text-center font-sans">
                "This is a support prompt, not a diagnosis."
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Charts & Actions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-card border border-surface-outline">
            <h2 className="text-lg font-headline font-semibold text-navy mb-4">6-Month Factor Timeline</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={person.history}>
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
            <h2 className="text-lg font-headline font-semibold text-navy mb-4">Welfare Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ActionCard 
                title="Schedule Counselling" 
                desc="Recommend a preventive session with the unit counselor."
                onDone={() => handleAction('Schedule Counselling')}
              />
              <ActionCard 
                title="Rebalance Workload" 
                desc="Simulate roster adjustment to reduce average duty hours."
                onDone={() => handleAction('Rebalance Workload')}
              />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

function ActionCard({ title, desc, onDone }: { title: string, desc: string, onDone: () => void }) {
  return (
    <div className="border border-surface-outline rounded-lg p-4 hover:shadow-hover transition-shadow bg-porcelain">
      <h4 className="font-headline font-semibold text-navy mb-1">{title}</h4>
      <p className="text-sm font-sans text-slate mb-4">{desc}</p>
      <div className="flex gap-2">
        <button 
          onClick={onDone}
          className="bg-teal text-white px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-teal-hover transition-colors"
        >
          Mark as Done
        </button>
        <button 
          onClick={onDone}
          className="border border-navy text-navy px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-white transition-colors"
        >
          Add Note
        </button>
      </div>
    </div>
  );
}
