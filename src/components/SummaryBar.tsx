import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { formatCurrency, cn } from '../utils';
import { WEEK_ENDING_DATES } from '../constants';

interface SummaryBarProps {
  forecast: any[];
}

export function SummaryBar({ forecast }: SummaryBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Generate realistic numbers based on user request
  // beginning cash ~$30M, weekly inflows $500K–$2M, weekly outflows $400K–$700K, ending cash trending toward ~$69M.
  const summaryData = WEEK_ENDING_DATES.map((date, i) => {
    const inflow = 500000 + (Math.random() * 1500000);
    const outflow = 400000 + (Math.random() * 300000);
    const net = inflow - outflow;
    return {
      date,
      inflow,
      outflow,
      net,
    };
  });

  // Calculate cumulative ending balance
  let currentBalance = 30000000;
  const dataWithBalance = summaryData.map(d => {
    currentBalance += d.net;
    return { ...d, balance: currentBalance };
  });

  const totals = {
    inflow: dataWithBalance.reduce((sum, d) => sum + d.inflow, 0),
    outflow: dataWithBalance.reduce((sum, d) => sum + d.outflow, 0),
    net: dataWithBalance.reduce((sum, d) => sum + d.net, 0),
    balance: dataWithBalance[dataWithBalance.length - 1].balance
  };

  const finalEndingCash = totals.balance;

  return (
    <div className="bg-white border-b border-slate-200 shrink-0 transition-all duration-300">
      {/* Collapsed State / Header */}
      <div 
        className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 flex items-center justify-center rounded bg-slate-100 text-slate-500">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
          {!isExpanded && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-end gap-0.5 h-4 items-center">
                  {dataWithBalance.map((d, i) => (
                    <div 
                      key={i} 
                      className="w-1 bg-indigo-500 rounded-t-sm" 
                      style={{ height: `${(d.balance / finalEndingCash) * 100}%`, minHeight: '2px' }} 
                    />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">13-Week Cash Trend</span>
              </div>
            </div>
          )}
        </div>
        
        {!isExpanded && (
          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-2">Ending Cash:</span>
              <span className="text-sm font-bold text-slate-900">{formatCurrency(finalEndingCash)}</span>
            </div>
          </div>
        )}

        {isExpanded && (
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">13-Week Forecast Summary</span>
        )}
      </div>

      {/* Expanded State */}
      {isExpanded && (
        <div className="px-4 pb-4 overflow-x-auto">
          <table className="w-full text-[10px] border-collapse">
            <thead>
              <tr>
                <th className="text-left py-2 font-bold text-slate-400 uppercase tracking-wider w-32">Metric</th>
                {WEEK_ENDING_DATES.map(date => (
                  <th key={date} className="text-right py-2 font-bold text-slate-400 uppercase tracking-wider px-2 min-w-[70px]">{date}</th>
                ))}
                <th className="text-right py-2 font-bold text-slate-900 uppercase tracking-wider px-2 min-w-[80px] bg-slate-50">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-2 font-medium text-slate-600">Total Inflows</td>
                {dataWithBalance.map((d, i) => (
                  <td key={i} className="text-right py-2 px-2 text-slate-500 font-mono">{formatCurrency(d.inflow)}</td>
                ))}
                <td className="text-right py-2 px-2 font-bold text-slate-900 bg-slate-50 font-mono">{formatCurrency(totals.inflow)}</td>
              </tr>
              <tr>
                <td className="py-2 font-medium text-slate-600">Total Outflows</td>
                {dataWithBalance.map((d, i) => (
                  <td key={i} className="text-right py-2 px-2 text-slate-500 font-mono">{formatCurrency(d.outflow)}</td>
                ))}
                <td className="text-right py-2 px-2 font-bold text-slate-900 bg-slate-50 font-mono">{formatCurrency(totals.outflow)}</td>
              </tr>
              <tr>
                <td className="py-2 font-medium text-slate-600">Net Cash Flow</td>
                {dataWithBalance.map((d, i) => (
                  <td key={i} className={cn(
                    "text-right py-2 px-2 font-mono",
                    d.net >= 0 ? "text-emerald-600" : "text-rose-600"
                  )}>
                    {formatCurrency(d.net)}
                  </td>
                ))}
                <td className={cn(
                  "text-right py-2 px-2 font-bold bg-slate-50 font-mono",
                  totals.net >= 0 ? "text-emerald-600" : "text-rose-600"
                )}>
                  {formatCurrency(totals.net)}
                </td>
              </tr>
              <tr className="bg-slate-50/50">
                <td className="py-2 font-bold text-slate-900">Ending Balance</td>
                {dataWithBalance.map((d, i) => (
                  <td key={i} className="text-right py-2 px-2 font-bold text-slate-900 font-mono">{formatCurrency(d.balance)}</td>
                ))}
                <td className="text-right py-2 px-2 font-black text-slate-900 bg-slate-100 font-mono">{formatCurrency(totals.balance)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
