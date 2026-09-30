import React, { useState, useEffect } from 'react';
import { User, HeartPulse, Brain, Clock, ChevronRight, Activity, Calendar, CheckCircle } from 'lucide-react';

export default function WelfareDashboard() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8001/api/welfare/alerts')
      .then(res => res.json())
      .then(data => {
        setAlerts(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const handleReview = (id) => {
    fetch('http://localhost:8001/api/welfare/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ personnel_id: id })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setAlerts(alerts.map(a => a.id === id ? { ...a, status: 'In Review' } : a));
      }
    });
  };

  const getIcon = (iconName) => {
    switch(iconName) {
      case 'clock': return <Clock size={16}/>;
      case 'heart': return <HeartPulse size={16}/>;
      case 'brain': return <Brain size={16}/>;
      case 'calendar': return <Calendar size={16}/>;
      case 'activity': return <Activity size={16}/>;
      default: return <Activity size={16}/>;
    }
  };

  if (loading) return <div className="p-4">Loading secure data...</div>;

  return (
    <div className="dashboard">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1>Welfare Officer Portal</h1>
          <p className="text-muted">Confidential Actionable Welfare Alerts</p>
        </div>
        <div className="badge badge-warning flex items-center gap-2">
          <HeartPulse size={16} /> Secure Medical Access Tier
        </div>
      </div>

      <div className="grid grid-cols-3 mb-6">
        <div className="card" style={{borderColor: 'var(--danger)'}}>
          <h3 className="text-danger mb-1">Action Required</h3>
          <h2>{alerts.filter(a => a.status === 'Pending').length}</h2>
          <p className="text-muted text-sm mt-1">Personnel with Pending Risk</p>
        </div>
        <div className="card" style={{borderColor: 'var(--warning)'}}>
          <h3 className="text-warning mb-1">In Review</h3>
          <h2>{alerts.filter(a => a.status === 'In Review').length}</h2>
          <p className="text-muted text-sm mt-1">Cases actively managed</p>
        </div>
        <div className="card" style={{borderColor: 'var(--success)'}}>
          <h3 className="text-success mb-1">Successful Interventions</h3>
          <h2>24</h2>
          <p className="text-muted text-sm mt-1">In the last 30 days</p>
        </div>
      </div>

      <h2>AI Risk Explainability Layer (SHAP Output)</h2>
      <p className="text-muted mb-4 text-sm">The AI identifies patterns, you make the decisions. Risk does NOT equal Diagnosis.</p>
      
      <div className="grid grid-cols-2">
        {alerts.map(person => (
          <div key={person.id} className="card" style={{ opacity: person.status === 'In Review' ? 0.7 : 1 }}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div style={{background: 'var(--surface-hover)', padding: '0.75rem', borderRadius: '50%'}}>
                  <User size={24} className="text-primary"/>
                </div>
                <div>
                  <h3>Personnel {person.id}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className={`badge ${person.risk === 'Elevated' ? 'badge-danger' : 'badge-warning'}`}>
                      {person.risk} Risk Signal
                    </span>
                    {person.status === 'In Review' && (
                      <span className="badge badge-success flex items-center gap-1">
                        <CheckCircle size={12}/> In Review
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button 
                className="btn btn-primary" 
                onClick={() => handleReview(person.id)}
                disabled={person.status === 'In Review'}
                style={{opacity: person.status === 'In Review' ? 0.5 : 1}}
              >
                {person.status === 'In Review' ? 'Reviewed' : 'Review Case'} 
                {person.status !== 'In Review' && <ChevronRight size={16}/>}
              </button>
            </div>

            <h4 className="text-muted mb-3" style={{fontSize: '0.875rem'}}>AI EXPLANATION FACTORS</h4>
            <div className="flex flex-col gap-2 mb-4">
              {person.reasons.map((r, i) => (
                <div key={i} className="flex items-center gap-3 p-2" style={{background: 'var(--surface-hover)', borderRadius: '6px'}}>
                  <span className="text-warning">{getIcon(r.icon)}</span>
                  <span className="text-sm">{r.label}</span>
                </div>
              ))}
            </div>

            <div className="p-3" style={{background: 'rgba(37, 99, 235, 0.1)', border: '1px solid var(--border)', borderRadius: '8px'}}>
              <h4 className="text-primary text-sm mb-1">Suggested Intervention</h4>
              <p className="text-sm">{person.recommendation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
