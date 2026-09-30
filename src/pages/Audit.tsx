import { useState } from 'react';
import { Search, ShieldAlert, ToggleLeft, ToggleRight } from 'lucide-react';

const mockAuditLogs = [
  { id: 'AL-101', timestamp: '2026-09-29 08:15:22', officer: 'WO-204 (Singh)', action: 'Viewed Record', target: 'A-2041' },
  { id: 'AL-102', timestamp: '2026-09-29 09:30:10', officer: 'WO-204 (Singh)', action: 'Scheduled Counselling', target: 'A-2041' },
  { id: 'AL-103', timestamp: '2026-09-28 14:20:05', officer: 'WO-105 (Patel)', action: 'Exported Report', target: 'Battalion 4' },
  { id: 'AL-104', timestamp: '2026-09-28 16:45:33', officer: 'SYS-AUTO', action: 'Data Anonymization Batch', target: 'All Units' },
];

export default function Audit() {
  const [search, setSearch] = useState('');
  const [anonymize, setAnonymize] = useState(true);

  const filteredLogs = mockAuditLogs.filter(log => 
    log.officer.toLowerCase().includes(search.toLowerCase()) || 
    log.target.toLowerCase().includes(search.toLowerCase()) ||
    log.action.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-headline font-bold text-navy-dark">Privacy & Security Audit</h1>
        <div className="flex items-center bg-white border border-surface-outline px-4 py-2 rounded-md">
          <ShieldAlert className="w-5 h-5 text-teal mr-2" />
          <span className="text-sm font-sans font-semibold text-slate-dark">System Secure</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-card border border-surface-outline">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate" />
            <input
              type="text"
              placeholder="Search logs by officer, action..."
              className="w-full pl-10 pr-4 py-2 border border-surface-outline rounded-md focus:outline-none focus:ring-2 focus:ring-teal"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3 bg-porcelain p-2 rounded-lg border border-surface-outline">
            <span className="text-sm font-sans font-semibold text-slate-dark">Global Anonymization</span>
            <button onClick={() => setAnonymize(!anonymize)} className="text-teal transition-colors">
              {anonymize ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-slate" />}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-porcelain text-slate text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 font-semibold">Timestamp</th>
                <th className="px-6 py-3 font-semibold">Log ID</th>
                <th className="px-6 py-3 font-semibold">Officer / System</th>
                <th className="px-6 py-3 font-semibold">Action Performed</th>
                <th className="px-6 py-3 font-semibold">Target Record</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-outline text-slate-dark">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-porcelain transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-slate">{log.timestamp}</td>
                  <td className="px-6 py-4 font-semibold">{log.id}</td>
                  <td className="px-6 py-4">
                    {anonymize && !log.officer.includes('SYS') ? log.officer.split(' ')[0] + ' (Redacted)' : log.officer}
                  </td>
                  <td className="px-6 py-4">{log.action}</td>
                  <td className="px-6 py-4 font-semibold">{log.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredLogs.length === 0 && (
            <div className="p-8 text-center text-slate font-sans">No audit logs match your search.</div>
          )}
        </div>
      </div>
    </div>
  );
}
