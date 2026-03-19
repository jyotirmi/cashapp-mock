import React, { useEffect } from 'react';
import { AUDIT_LOG } from '../constants';
import { Search, Filter, Download, Maximize2, X } from 'lucide-react';
import { cn } from '../utils';
import { useLayout } from '../LayoutContext';

export function AuditTrail() {
  const { isMaximized, setIsMaximized, setIsAgentPanelOpen, setAgentContext } = useLayout();

  useEffect(() => {
    setAgentContext('Audit Trail');
  }, [setAgentContext]);

  return (
    <div className={cn(
      "flex flex-col h-full bg-white overflow-hidden",
      isMaximized && "fixed inset-0 z-[200] h-screen w-screen"
    )}>
      <div className="px-6 py-4 border-b border-slate-200 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-900">Audit Trail</h1>
            <button 
              onClick={() => setIsAgentPanelOpen(true)}
              className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors"
            >
              Ask Agent →
            </button>
          </div>
          <button 
            onClick={() => setIsMaximized(!isMaximized)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-md transition-all",
              isMaximized 
                ? "bg-slate-900 text-white hover:bg-slate-800" 
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
            )}
          >
            {isMaximized ? (
              <>
                <X className="w-3.5 h-3.5" />
                <span>Exit</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Maximize</span>
              </>
            )}
          </button>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 border border-slate-200 rounded hover:bg-slate-50">
              Mar 9 – Mar 16, 2026 <Filter className="w-3 h-3" />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 border border-slate-200 rounded hover:bg-slate-50">
              All Modules <Filter className="w-3 h-3" />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 border border-slate-200 rounded hover:bg-slate-50">
              All Change Types <Filter className="w-3 h-3" />
            </button>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search audit logs..." 
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="finance-table">
          <thead className="sticky top-0 z-10">
            <tr>
              <th>Module</th>
              <th>Record</th>
              <th>Customer</th>
              <th>Timestamp</th>
              <th>Change Type</th>
              <th>Field</th>
              <th>Previous</th>
              <th>New</th>
              <th>Changed By</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {AUDIT_LOG.map((log) => (
              <tr key={log.id}>
                <td className="text-slate-500">{log.module}</td>
                <td className="mono-figure text-slate-900 font-medium">{log.record}</td>
                <td className="text-slate-900">{log.customer}</td>
                <td className="text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                <td>
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    log.changeType === 'Rolled-over' ? "bg-amber-50 text-amber-600 border border-amber-100" :
                    log.changeType === 'User-adjusted' ? "bg-indigo-50 text-indigo-600 border border-indigo-100" :
                    "bg-slate-50 text-slate-500 border border-slate-100"
                  )}>
                    {log.changeType}
                  </span>
                </td>
                <td className="text-slate-600">{log.field}</td>
                <td className="mono-figure text-slate-400">{log.previous}</td>
                <td className="mono-figure text-slate-900 font-bold">{log.new}</td>
                <td className="font-medium text-slate-900">{log.changedBy}</td>
                <td className="text-slate-500 italic max-w-xs truncate" title={log.reason}>{log.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 border-t border-slate-200 bg-slate-50/50 grid grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">This Week's Override Rate</div>
          <div className="flex items-baseline gap-2">
            <div className="text-2xl font-bold text-slate-900">8%</div>
            <div className="text-xs text-emerald-600 font-medium">↓ 6% from last wk</div>
          </div>
          <div className="text-xs text-slate-500 mt-1">12 of 147 agent decisions overridden by user</div>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Repeat Offenders</div>
          <div className="text-sm font-medium text-slate-900 mb-1">4 customers rolled over 3+ consecutive weeks</div>
          <div className="flex gap-2 mt-2">
            {['Cobalt Digital', 'Marble Arch', 'Patriot Energy'].map(c => (
              <span key={c} className="px-2 py-1 bg-rose-50 text-rose-600 text-[10px] font-bold rounded border border-rose-100 cursor-pointer hover:bg-rose-100 transition-colors">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
