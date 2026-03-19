import React, { useState, useEffect } from 'react';
import { INITIAL_FORECAST, WEEK_ENDING_DATES } from '../constants';
import { formatCurrency, cn } from '../utils';
import { Send, Maximize2, X, Sparkles, BarChart2 } from 'lucide-react';
import { useLayout } from '../LayoutContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

export function ForecastSummary() {
  const { isMaximized, setIsMaximized, setIsAgentPanelOpen, setAgentContext } = useLayout();
  const [showChart, setShowChart] = useState(true);

  useEffect(() => {
    setAgentContext('13-Week Summary');
  }, [setAgentContext]);

  // Mock data for variance chart
  const chartData = INITIAL_FORECAST.map((f, i) => ({
    name: `Wk ${i + 1}`,
    current: f.endingBalance,
    prior: f.endingBalance * (0.95 + Math.random() * 0.1)
  }));

  return (
    <div className={cn(
      "flex flex-col h-full bg-white overflow-hidden",
      isMaximized && "fixed inset-0 z-[200] h-screen w-screen"
    )}>
      <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-slate-900">13-Week Cash Forecast</h1>
          <button 
            onClick={() => setIsAgentPanelOpen(true)}
            className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors"
          >
            Ask Agent →
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowChart(!showChart)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors",
              showChart ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:bg-slate-50"
            )}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            {showChart ? "Hide Chart" : "Show Chart"}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-md text-sm font-medium hover:bg-slate-800 transition-colors">
            <Send className="w-4 h-4" />
            Send Report
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

      {showChart && (
        <div className="h-48 shrink-0 border-b border-slate-100 bg-slate-50/30 p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Forecast Variance (Current vs. Prior)</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-900" />
                <span className="text-[10px] text-slate-500 font-medium">Current</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-300" />
                <span className="text-[10px] text-slate-500 font-medium">Prior</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 500 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 500 }}
                tickFormatter={(val) => `$${val/1000}k`}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '11px' }}
                formatter={(val: number) => [formatCurrency(val), '']}
              />
              <Bar dataKey="current" fill="#0f172a" radius={[2, 2, 0, 0]} barSize={24} />
              <Bar dataKey="prior" fill="#cbd5e1" radius={[2, 2, 0, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs border-collapse">
          <thead className="sticky top-0 z-20">
            <tr className="bg-slate-50">
              <th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider sticky left-0 bg-slate-50 z-30 w-64 border-b border-slate-200">Line Item</th>
              {WEEK_ENDING_DATES.map((date) => (
                <th key={date} className="px-4 py-3 text-right font-mono text-slate-500 border-b border-slate-200 min-w-[110px]">{date}</th>
              ))}
              <th className="px-4 py-3 text-right font-bold text-slate-900 border-b border-slate-200 min-w-[130px]">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="bg-slate-50/30 font-bold">
              <td className="px-4 py-3 text-slate-900 sticky left-0 bg-slate-50/30 z-10">Beginning Cash Balance</td>
              {INITIAL_FORECAST.map((f, i) => (
                <td key={i} className="px-4 py-3 text-right font-mono text-slate-900">{formatCurrency(f.endingBalance - f.netFlow)}</td>
              ))}
              <td className="px-4 py-3 text-right font-mono text-slate-900">—</td>
            </tr>
            
            <tr className="bg-slate-50">
              <td colSpan={15} className="px-4 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cash Inflows</td>
            </tr>
            <tr className="bg-emerald-50/20">
              <td className="px-4 py-2.5 text-slate-700 pl-8 sticky left-0 bg-emerald-50/20 z-10">Collections from Open Invoices</td>
              {INITIAL_FORECAST.map((f, i) => (
                <td key={i} className="px-4 py-2.5 text-right font-mono text-emerald-600">{formatCurrency(f.inflows * 0.7)}</td>
              ))}
              <td className="px-4 py-2.5 text-right font-mono text-emerald-700">{formatCurrency(INITIAL_FORECAST.reduce((a, b) => a + b.inflows * 0.7, 0))}</td>
            </tr>
            <tr className="bg-emerald-50/20">
              <td className="px-4 py-2.5 text-slate-700 pl-8 sticky left-0 bg-emerald-50/20 z-10">Collections from Future Invoices</td>
              {INITIAL_FORECAST.map((f, i) => (
                <td key={i} className="px-4 py-2.5 text-right font-mono text-emerald-600">{formatCurrency(f.inflows * 0.3)}</td>
              ))}
              <td className="px-4 py-2.5 text-right font-mono text-emerald-700">{formatCurrency(INITIAL_FORECAST.reduce((a, b) => a + b.inflows * 0.3, 0))}</td>
            </tr>
            <tr className="bg-emerald-50/40 font-bold">
              <td className="px-4 py-3 text-slate-900 sticky left-0 bg-emerald-50/40 z-10">Total Cash Inflows</td>
              {INITIAL_FORECAST.map((f, i) => (
                <td key={i} className="px-4 py-3 text-right font-mono text-emerald-700">{formatCurrency(f.inflows)}</td>
              ))}
              <td className="px-4 py-3 text-right font-mono text-emerald-800">{formatCurrency(INITIAL_FORECAST.reduce((a, b) => a + b.inflows, 0))}</td>
            </tr>

            <tr className="bg-slate-50">
              <td colSpan={15} className="px-4 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cash Outflows</td>
            </tr>
            {[
              'Payroll', 'Contractor Payments', 'Other COGS Payments', 'Other OpEx Payments', 
              'Rent & Office', 'Bank Fees', 'Legal', 'Taxes', 'Capex', 'One-time Costs'
            ].map((label, idx) => (
              <tr key={label} className="bg-rose-50/20">
                <td className="px-4 py-2 text-slate-700 pl-8 sticky left-0 bg-rose-50/20 z-10">{label}</td>
                {INITIAL_FORECAST.map((f, i) => (
                  <td key={i} className="px-4 py-2 text-right font-mono text-rose-600">{formatCurrency(f.outflows / 10)}</td>
                ))}
                <td className="px-4 py-2 text-right font-mono text-rose-700">{formatCurrency(INITIAL_FORECAST.reduce((a, b) => a + b.outflows / 10, 0))}</td>
              </tr>
            ))}
            <tr className="bg-rose-50/40 font-bold">
              <td className="px-4 py-3 text-slate-900 sticky left-0 bg-rose-50/40 z-10">Total Cash Outflows</td>
              {INITIAL_FORECAST.map((f, i) => (
                <td key={i} className="px-4 py-3 text-right font-mono text-rose-700">{formatCurrency(f.outflows)}</td>
              ))}
              <td className="px-4 py-3 text-right font-mono text-rose-800">{formatCurrency(INITIAL_FORECAST.reduce((a, b) => a + b.outflows, 0))}</td>
            </tr>

            <tr className="bg-slate-100 font-bold border-t-2 border-slate-200">
              <td className="px-4 py-4 text-slate-900 sticky left-0 bg-slate-100 z-10">Net Cash Flow</td>
              {INITIAL_FORECAST.map((f, i) => (
                <td key={i} className={cn("px-4 py-4 text-right font-mono", f.netFlow >= 0 ? "text-emerald-700" : "text-rose-700")}>
                  {formatCurrency(f.netFlow)}
                </td>
              ))}
              <td className="px-4 py-4 text-right font-mono text-slate-900">—</td>
            </tr>
            <tr className="bg-slate-900 text-white font-bold">
              <td className="px-4 py-4 sticky left-0 bg-slate-900 z-10">Ending Cash Balance</td>
              {INITIAL_FORECAST.map((f, i) => (
                <td key={i} className="px-4 py-4 text-right font-mono">{formatCurrency(f.endingBalance)}</td>
              ))}
              <td className="px-4 py-4 text-right font-mono">—</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
