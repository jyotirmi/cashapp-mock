import React from 'react';
import { 
  CheckCircle2, 
  Download, 
  ArrowRight, 
  TrendingUp, 
  TrendingDown, 
  FileText,
  X,
  ChevronRight
} from 'lucide-react';
import { formatCurrency, cn } from '../utils';
import { WeeklyForecast } from '../types';

interface ApprovalConfirmationProps {
  onClose: () => void;
  forecast: WeeklyForecast[];
}

export function ApprovalConfirmation({ onClose, forecast }: ApprovalConfirmationProps) {
  // Mocking the "before" data
  const beforeCollections = forecast.map(f => f.inflows * 0.95);
  const afterCollections = forecast.map(f => f.inflows);
  
  const beforeEndingBalance = forecast.map(f => f.endingBalance - 500000);
  const afterEndingBalance = forecast.map(f => f.endingBalance);

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-[900px] max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Forecast Updated Successfully</h2>
              <p className="text-xs text-slate-500 font-medium">
                Week 12 — Monday March 16, 2026 — <span className="text-slate-900 font-bold">Committed Forecast</span>
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <div className="text-xs font-bold text-indigo-900 uppercase tracking-wider">Model Updated</div>
                <div className="text-sm font-medium text-indigo-700">Primary 13-Week Forecast</div>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-indigo-200 text-indigo-700 rounded-lg text-sm font-bold hover:bg-indigo-50 transition-colors shadow-sm">
              <Download className="w-4 h-4" />
              Download Updated Model (.xlsx)
            </button>
          </div>

          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Impact Analysis: Collections from Open Invoices</h3>
            <div className="overflow-x-auto border border-slate-100 rounded-xl">
              <table className="w-full text-[11px] border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-4 py-2 text-left font-bold text-slate-500 w-32">Week</th>
                    {forecast.map((f, i) => (
                      <th key={i} className="px-4 py-2 text-right font-mono text-slate-500 min-w-[100px]">{f.weekEnding}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-400">Before</td>
                    {beforeCollections.map((val, i) => (
                      <td key={i} className="px-4 py-3 text-right font-mono text-slate-400">{formatCurrency(val)}</td>
                    ))}
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-bold text-slate-900">After</td>
                    {afterCollections.map((val, i) => (
                      <td key={i} className="px-4 py-3 text-right font-mono font-bold text-slate-900">{formatCurrency(val)}</td>
                    ))}
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="px-4 py-2 font-bold text-slate-500 italic">Delta</td>
                    {forecast.map((f, i) => {
                      const delta = afterCollections[i] - beforeCollections[i];
                      return (
                        <td key={i} className={cn(
                          "px-4 py-2 text-right font-mono font-bold",
                          delta > 0 ? "text-emerald-600" : delta < 0 ? "text-rose-600" : "text-slate-400"
                        )}>
                          {delta > 0 ? '+' : ''}{formatCurrency(delta)}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Cascading Forecast Impact</h3>
            <div className="grid grid-cols-1 gap-4">
              {[
                { label: 'Total Cash Inflows', before: forecast.map(f => f.inflows - 200000), after: forecast.map(f => f.inflows) },
                { label: 'Net Cash Flow', before: forecast.map(f => f.netFlow - 200000), after: forecast.map(f => f.netFlow) },
                { label: 'Ending Cash Balance', before: beforeEndingBalance, after: afterEndingBalance }
              ].map((row, idx) => (
                <div key={idx} className="border border-slate-100 rounded-xl overflow-hidden">
                  <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {row.label}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-[11px] border-collapse">
                      <tbody>
                        <tr className="bg-white">
                          <td className="px-4 py-2 font-medium text-slate-400 w-32">Before</td>
                          {row.before.map((val, i) => (
                            <td key={i} className="px-4 py-2 text-right font-mono text-slate-400 min-w-[100px]">{formatCurrency(val)}</td>
                          ))}
                        </tr>
                        <tr className="bg-white">
                          <td className="px-4 py-2 font-bold text-slate-900 w-32">After</td>
                          {row.after.map((val, i) => (
                            <td key={i} className="px-4 py-2 text-right font-mono font-bold text-slate-900 min-w-[100px]">{formatCurrency(val)}</td>
                          ))}
                        </tr>
                        <tr className="bg-slate-50/30">
                          <td className="px-4 py-1.5 font-bold text-slate-500 italic w-32">Delta</td>
                          {row.after.map((val, i) => {
                            const delta = val - row.before[i];
                            return (
                              <td key={i} className={cn(
                                "px-4 py-1.5 text-right font-mono font-bold",
                                delta > 0 ? "text-emerald-600" : delta < 0 ? "text-rose-600" : "text-slate-400"
                              )}>
                                {delta > 0 ? '+' : ''}{formatCurrency(delta)}
                              </td>
                            );
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Ending Cash Balance Trajectory</h3>
            <div className="bg-white border border-slate-100 rounded-xl p-6 h-64 relative">
              <div className="absolute top-4 right-6 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-slate-300 border-t border-dashed border-slate-400" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Old Forecast</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-indigo-600" />
                  <span className="text-[10px] font-bold text-slate-900 uppercase">New Forecast</span>
                </div>
              </div>
              
              <div className="h-full w-full flex items-end gap-2 px-4">
                {forecast.map((f, i) => {
                  const oldHeight = 30 + (i * 4);
                  const newHeight = 40 + (i * 5);
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center justify-end h-full relative group">
                      {/* Old line (dashed) */}
                      <div 
                        className="absolute w-full border-t-2 border-dashed border-slate-300 z-0" 
                        style={{ bottom: `${oldHeight}%` }}
                      />
                      {/* New line (solid) */}
                      <div 
                        className="absolute w-full border-t-2 border-indigo-500 z-10" 
                        style={{ bottom: `${newHeight}%` }}
                      />
                      {/* Points */}
                      <div 
                        className="absolute w-1.5 h-1.5 bg-slate-400 rounded-full z-20" 
                        style={{ bottom: `calc(${oldHeight}% - 3px)` }}
                      />
                      <div 
                        className="absolute w-2 h-2 bg-indigo-600 rounded-full z-30 shadow-sm" 
                        style={{ bottom: `calc(${newHeight}% - 4px)` }}
                      />
                      
                      <div className="text-[9px] text-slate-400 font-mono rotate-45 origin-left mt-2 whitespace-nowrap">
                        {f.weekEnding}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 flex items-center gap-2"
          >
            Done
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
