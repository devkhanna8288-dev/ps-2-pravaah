import { useEffect, useState, useMemo } from 'react';
import { api } from '../services/mockApi';
import type { PersonnelRecord } from '../data/personnel';
import { Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SupportQueue() {
  const [personnel, setPersonnel] = useState<PersonnelRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState<keyof PersonnelRecord>('supportScore');
  const [sortAsc, setSortAsc] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.getPersonnel().then(data => {
      setPersonnel(data);
      setLoading(false);
    });
  }, []);

  const filteredAndSorted = useMemo(() => {
    let result = personnel;

    if (search) {
      result = result.filter(p => p.id.toLowerCase().includes(search.toLowerCase()));
    }

    if (statusFilter !== 'All') {
      result = result.filter(p => p.wellbeingStatus === statusFilter);
    }

    result.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (aVal < bVal) return sortAsc ? -1 : 1;
      if (aVal > bVal) return sortAsc ? 1 : -1;
      return 0;
    });

    return result;
  }, [personnel, search, statusFilter, sortField, sortAsc]);

  const toggleSort = (field: keyof PersonnelRecord) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Stable': return 'bg-teal-tint text-teal';
      case 'Watch': return 'bg-amber-tint text-amber';
      case 'Needs Support': return 'bg-coral-tint text-coral';
      default: return 'bg-slate-100 text-slate';
    }
  };

  if (loading) return <div className="animate-pulse">Loading Support Queue...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-headline font-bold text-navy-dark">Support Queue</h1>
        <span className="text-sm text-slate">Total Records: {filteredAndSorted.length}</span>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-card border border-surface-outline flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate" />
          <input
            type="text"
            placeholder="Search by ID..."
            className="w-full pl-10 pr-4 py-2 border border-surface-outline rounded-md focus:outline-none focus:ring-2 focus:ring-teal"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="h-5 w-5 text-slate" />
          <select
            className="w-full md:w-auto border border-surface-outline rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Stable">Stable</option>
            <option value="Watch">Watch</option>
            <option value="Needs Support">Care Priority</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-card border border-surface-outline overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-porcelain text-slate text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 font-semibold cursor-pointer" onClick={() => toggleSort('id')}>
                  ID {sortField === 'id' && (sortAsc ? <ChevronUp className="inline w-4 h-4"/> : <ChevronDown className="inline w-4 h-4"/>)}
                </th>
                <th className="px-6 py-3 font-semibold cursor-pointer" onClick={() => toggleSort('unit')}>
                  Unit {sortField === 'unit' && (sortAsc ? <ChevronUp className="inline w-4 h-4"/> : <ChevronDown className="inline w-4 h-4"/>)}
                </th>
                <th className="px-6 py-3 font-semibold cursor-pointer" onClick={() => toggleSort('wellbeingStatus')}>
                  Status {sortField === 'wellbeingStatus' && (sortAsc ? <ChevronUp className="inline w-4 h-4"/> : <ChevronDown className="inline w-4 h-4"/>)}
                </th>
                <th className="px-6 py-3 font-semibold cursor-pointer" onClick={() => toggleSort('supportScore')}>
                  Score {sortField === 'supportScore' && (sortAsc ? <ChevronUp className="inline w-4 h-4"/> : <ChevronDown className="inline w-4 h-4"/>)}
                </th>
                <th className="px-6 py-3 font-semibold">Key Factors</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-outline text-slate-dark">
              {filteredAndSorted.map((person) => (
                <tr 
                  key={person.id} 
                  className="hover:bg-porcelain transition-colors cursor-pointer"
                  onClick={() => navigate(`/personnel/${person.id}`)}
                >
                  <td className="px-6 py-4 font-semibold">{person.id}</td>
                  <td className="px-6 py-4">{person.unit}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(person.wellbeingStatus)}`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${person.wellbeingStatus === 'Stable' ? 'bg-teal' : person.wellbeingStatus === 'Watch' ? 'bg-amber' : 'bg-coral'}`}></span>
                      {person.wellbeingStatus === 'Needs Support' ? 'Care Priority' : person.wellbeingStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">{person.supportScore}/100</td>
                  <td className="px-6 py-4 text-slate">{person.contributingFactors.join(', ') || 'None'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
