import React, { useState, useEffect } from 'react';
import { Shield, Activity, Users, AlertTriangle, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Week 1', stress: 30, readiness: 85 },
  { name: 'Week 2', stress: 35, readiness: 82 },
  { name: 'Week 3', stress: 45, readiness: 78 },
  { name: 'Week 4', stress: 40, readiness: 80 },
  { name: 'Week 5', stress: 60, readiness: 70 },
  { name: 'Week 6', stress: 55, readiness: 72 },
];

export default function CommanderDashboard() {
  const [stats, setStats] = useState(null);
  
  useEffect(() => {
    fetch('http://localhost:8001/api/commander/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));
  }, []);

  if (!stats) return <div className="p-4">Loading secure stats...</div>;

  return (
    <div className="dashboard">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1>Commander Overview</h1>
          <p className="text-muted">Aggregate Unit Welfare & Readiness (Alpha Coy)</p>
        </div>
        <div className="badge badge-success flex items-center gap-2">
          <Shield size={16} /> Privacy Active - Individual Data Masked
        </div>
      </div>

      <div className="grid grid-cols-4 mb-6">
        <div className="card">
          <div className="card-header">
            <h3 className="text-muted text-sm">Total Strength</h3>
            <Users size={20} className="text-primary" />
          </div>
          <h2>{stats.total_strength}</h2>
          <p className="text-success text-sm flex items-center mt-2"><TrendingUp size={14} /> Active Deployment</p>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h3 className="text-muted text-sm">Force Readiness</h3>
            <Activity size={20} className="text-success" />
          </div>
          <h2>{stats.readiness}%</h2>
          <p className="text-warning text-sm flex items-center mt-2"><TrendingUp size={14} style={{transform: 'rotate(90deg)'}}/> -8% from last month</p>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-muted text-sm">Elevated Risk Flags</h3>
            <AlertTriangle size={20} className="text-warning" />
          </div>
          <h2>{stats.elevated_risks}</h2>
          <p className="text-muted text-sm mt-2">Routed to Welfare Officer</p>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h3 className="text-muted text-sm">Avg Duty Hours/Wk</h3>
            <Activity size={20} className="text-primary" />
          </div>
          <h2>{stats.avg_duty_hours}h</h2>
          <p className="text-danger text-sm flex items-center mt-2"><TrendingUp size={14} /> +12h over baseline</p>
        </div>
      </div>

      <div className="grid grid-cols-3">
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div className="card-header">
            <h3>Unit Stress vs Readiness Trend</h3>
          </div>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
                <Area type="monotone" dataKey="stress" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} name="Avg Stress Index" />
                <Area type="monotone" dataKey="readiness" stroke="#10b981" fill="#10b981" fillOpacity={0.2} name="Readiness Score" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Key Insights (AI Generated)</h3>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <div className="p-3" style={{background: 'var(--surface-hover)', borderRadius: '8px', borderLeft: '4px solid var(--danger)'}}>
              <strong>Fatigue Alert:</strong> 2nd Platoon showing significant drop in sleep scores over the last 14 days, correlating with continuous night patrols.
            </div>
            <div className="p-3" style={{background: 'var(--surface-hover)', borderRadius: '8px', borderLeft: '4px solid var(--warning)'}}>
              <strong>Leave Deficit:</strong> 15 personnel in HQ Company have not utilized leave in &gt;8 months. Recommended for rotation planning.
            </div>
            <div className="p-3" style={{background: 'var(--surface-hover)', borderRadius: '8px', borderLeft: '4px solid var(--primary)'}}>
              <strong>Intervention Success:</strong> Unit wellness score improved by 12% following recent workload rebalancing.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
