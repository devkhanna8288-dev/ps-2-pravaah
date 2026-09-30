import { Download, Calendar } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const reportData = [
  { month: 'Apr', fatigue: 60, workload: 70, wellbeing: 85 },
  { month: 'May', fatigue: 65, workload: 75, wellbeing: 82 },
  { month: 'Jun', fatigue: 75, workload: 80, wellbeing: 75 },
  { month: 'Jul', fatigue: 80, workload: 85, wellbeing: 70 },
  { month: 'Aug', fatigue: 85, workload: 90, wellbeing: 65 },
  { month: 'Sep', fatigue: 82, workload: 85, wellbeing: 68 },
];

export default function Reports() {
  const handleExportCSV = () => {
    // Generate a simple CSV blob
    const header = "Month,Fatigue,Workload,Wellbeing\n";
    const rows = reportData.map(r => `${r.month},${r.fatigue},${r.workload},${r.wellbeing}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sahayak_analytics_report.csv';
    a.click();
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-headline font-bold text-navy-dark">Monthly Welfare Analytics</h1>
        <div className="flex gap-2">
          <button 
            onClick={handleExportCSV}
            className="flex items-center px-4 py-2 bg-white border border-surface-outline rounded-md text-slate-dark hover:bg-porcelain transition-colors font-sans text-sm font-semibold"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
          <button 
            onClick={handleExportPDF}
            className="flex items-center px-4 py-2 bg-teal text-white rounded-md hover:bg-teal-hover transition-colors font-sans text-sm font-semibold"
          >
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-card border border-surface-outline">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-headline font-semibold text-navy">Aggregate Force Wellbeing vs. Workload</h2>
          <div className="flex items-center text-sm text-slate bg-porcelain px-3 py-1.5 rounded-md border border-surface-outline">
            <Calendar className="w-4 h-4 mr-2" />
            Last 6 Months
          </div>
        </div>
        
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={reportData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorWellbeing" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2A9D8F" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2A9D8F" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorWorkload" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E76F51" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#E76F51" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <Tooltip />
              <Area type="monotone" dataKey="wellbeing" stroke="#2A9D8F" fillOpacity={1} fill="url(#colorWellbeing)" />
              <Area type="monotone" dataKey="workload" stroke="#E76F51" fillOpacity={1} fill="url(#colorWorkload)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center text-sm font-sans text-slate-dark">
            <span className="w-3 h-3 rounded-full bg-teal mr-2"></span>
            Aggregate Wellbeing Score
          </div>
          <div className="flex items-center text-sm font-sans text-slate-dark">
            <span className="w-3 h-3 rounded-full bg-coral mr-2"></span>
            Operational Workload Index
          </div>
        </div>
      </div>
    </div>
  );
}
