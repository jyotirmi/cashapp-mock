import React, { useEffect } from 'react';
import { 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight, 
  Filter, 
  Download,
  Calendar,
  Search,
  Maximize2,
  X
} from 'lucide-react';
import { INITIAL_FORECAST } from '../constants';
import { formatCurrency, cn } from '../utils';
import { useLayout } from '../LayoutContext';

export function VarianceReport() {
  const { isMaximized, setIsMaximized, setIsAgentPanelOpen, setAgentContext } = useLayout();

  useEffect(() => {
    setAgentContext('Variance Report');
  }, [setAgentContext]);

  // Mocking actuals for variance
  const data = INITIAL_FORECAST.map(f => ({
    ...f,
    actualInflows: f.inflows * (0.9 + Math.random() * 0.2),
    actualOutflows: f.outflows * (0.95 + Math.random() * 0.1),
  })).map(f => ({
    ...f,
    inflowVariance: f.actualInflows - f.inflows,
    outflowVariance: f.actualOutflows - f.outflows,
    actualNetFlow: f.actualInflows - f.actualOutflows,
  }));

  return (
    <div className={cn(
      "flex flex-col h-full bg-slate-50 overflow-hidden",
      isMaximized && "fixed inset-0 z-[200] h-screen w-screen"
    )}>
      <div className="bg-white px-6 py-4 border-b border-slate-200 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Variance Report</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Comparing Forecast vs. Actuals for the current 13-week period</p>
          </div>
          <button 
            onClick={() => setIsAgentPanelOpen(true)}
            className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors mt-1"
          >
            Ask Agent →
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-medium text-slate-600">Mar 16, 2026 - Jun 15, 2026</span>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm">
            <Filter className="w-3.5 h-3.5" />
            Filters
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm">
            <Download className="w-3.5 h-3.5" />
            Export Report
          </button>
          <div className="w-px h-6 bg-slate-200 mx-1" />
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
      </div>

      <div className={cn(
        "flex-1 overflow-y-auto p-6 space-y-6",
        isMaximized && "p-0 space-y-0"
      )}>
        {!isMaximized && (
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Inflow Variance</div>
              <div className="flex items-baseline gap-2">
                <div className="text-2xl font-bold text-slate-900">$142,500</div>
                <div className="flex items-center text-emerald-600 text-xs font-bold">
                  <ArrowUpRight className="w-3 h-3" />
                  +4.2%
                </div>
              </div>
              <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '65%' }} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Outflow Variance</div>
              <div className="flex items-baseline gap-2">
                <div className="text-2xl font-bold text-slate-900">-$28,400</div>
                <div className="flex items-center text-rose-600 text-xs font-bold">
                  <ArrowDownRight className="w-3 h-3" />
                  -1.1%
                </div>
              </div>
              <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: '45%' }} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Net Cash Flow Variance</div>
              <div className="flex items-baseline gap-2">
                <div className="text-2xl font-bold text-slate-900">$114,100</div>
                <div className="flex items-center text-emerald-600 text-xs font-bold">
                  <ArrowUpRight className="w-3 h-3" />
                  +12.4%
                </div>
              </div>
              <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '80%' }} />
              </div>
            </div>
          </div>
        )}

        <div className={cn(
          "bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden",
          isMaximized && "rounded-none border-none shadow-none h-full flex flex-col"
        )}>
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
            <h2 className="text-sm font-bold text-slate-900">Weekly Variance Breakdown</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search weeks..." 
                className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-64"
              />
            </div>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-[11px] border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Week Ending</th>
                  <th className="px-6 py-3 text-right font-bold text-slate-500 uppercase tracking-wider">Forecast Inflow</th>
                  <th className="px-6 py-3 text-right font-bold text-slate-500 uppercase tracking-wider">Actual Inflow</th>
                  <th className="px-6 py-3 text-right font-bold text-slate-500 uppercase tracking-wider">Variance</th>
                  <th className="px-6 py-3 text-right font-bold text-slate-500 uppercase tracking-wider">Forecast Outflow</th>
                  <th className="px-6 py-3 text-right font-bold text-slate-500 uppercase tracking-wider">Actual Outflow</th>
                  <th className="px-6 py-3 text-right font-bold text-slate-500 uppercase tracking-wider">Variance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{row.weekEnding}</td>
                    <td className="px-6 py-4 text-right font-mono text-slate-600">{formatCurrency(row.inflows)}</td>
                    <td className="px-6 py-4 text-right font-mono text-slate-900">{formatCurrency(row.actualInflows)}</td>
                    <td className={cn(
                      "px-6 py-4 text-right font-mono font-bold",
                      row.inflowVariance >= 0 ? "text-emerald-600" : "text-rose-600"
                    )}>
                      {row.inflowVariance >= 0 ? '+' : ''}{formatCurrency(row.inflowVariance)}
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-slate-600">{formatCurrency(row.outflows)}</td>
                    <td className="px-6 py-4 text-right font-mono text-slate-900">{formatCurrency(row.actualOutflows)}</td>
                    <td className={cn(
                      "px-6 py-4 text-right font-mono font-bold",
                      row.outflowVariance <= 0 ? "text-emerald-600" : "text-rose-600"
                    )}>
                      {row.outflowVariance > 0 ? '+' : ''}{formatCurrency(row.outflowVariance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
