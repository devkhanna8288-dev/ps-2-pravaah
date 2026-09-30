import { useState } from 'react';
import { Activity, ArrowRight, RefreshCw, CheckCircle } from 'lucide-react';

const mockWorkload = [
  { id: 'Roster-A', unit: 'Battalion 4', currentAvgHrs: 65, proposedAvgHrs: 52, currentStrain: 78, proposedStrain: 55 },
  { id: 'Roster-B', unit: 'District Unit 12', currentAvgHrs: 58, proposedAvgHrs: 48, currentStrain: 65, proposedStrain: 45 }
];

export default function Workload() {
  const [simulated, setSimulated] = useState<string | null>(null);

  const handleSimulate = (id: string) => {
    setSimulated(id);
    setTimeout(() => setSimulated(null), 2000); // Reset for demo purposes
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-headline font-bold text-navy-dark">Workload Balancing</h1>
        <span className="text-sm text-slate">Roster Equity Simulator</span>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {mockWorkload.map((roster) => (
          <div key={roster.id} className="bg-white p-6 rounded-xl shadow-card border border-surface-outline">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-headline font-semibold text-navy">{roster.unit} - {roster.id}</h2>
              <button 
                onClick={() => handleSimulate(roster.id)}
                className="bg-teal text-white px-4 py-2 rounded-md font-sans font-semibold hover:bg-teal-hover transition-colors flex items-center"
              >
                {simulated === roster.id ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Activity className="w-4 h-4 mr-2" />}
                {simulated === roster.id ? 'Simulating...' : 'Simulate Rebalancing'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Current State */}
              <div className="bg-porcelain p-6 rounded-lg border border-surface-outline">
                <h3 className="text-md font-headline font-semibold text-slate-dark mb-4">Current Schedule</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-sans text-slate">Avg Duty Hours/Week</span>
                  <span className="text-lg font-headline font-bold text-coral">{roster.currentAvgHrs}h</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 mb-4">
                  <div className="bg-coral h-2.5 rounded-full" style={{ width: `${roster.currentAvgHrs}%` }}></div>
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-sans text-slate">Unit Strain Indicator</span>
                  <span className="text-lg font-headline font-bold text-coral">{roster.currentStrain}/100</span>
                </div>
              </div>

              {/* Proposed State */}
              <div className={`p-6 rounded-lg border transition-all duration-500 ${simulated === roster.id ? 'bg-teal-tint border-teal shadow-hover' : 'bg-white border-surface-outline'}`}>
                <h3 className="text-md font-headline font-semibold text-slate-dark mb-4 flex items-center">
                  Proposed Schedule
                  {simulated === roster.id && <CheckCircle className="w-4 h-4 ml-2 text-teal" />}
                </h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-sans text-slate">Avg Duty Hours/Week</span>
                  <span className="text-lg font-headline font-bold text-teal flex items-center">
                    {roster.proposedAvgHrs}h
                    <ArrowRight className="w-4 h-4 mx-2 text-slate" />
                    <span className="text-sm text-slate line-through">{roster.currentAvgHrs}h</span>
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 mb-4">
                  <div className={`bg-teal h-2.5 rounded-full transition-all duration-1000 ${simulated === roster.id ? 'w-1/2' : 'w-0'}`} style={{ width: `${roster.proposedAvgHrs}%` }}></div>
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-sans text-slate">Predicted Strain</span>
                  <span className="text-lg font-headline font-bold text-teal">{roster.proposedStrain}/100</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
