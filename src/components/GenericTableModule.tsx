import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreHorizontal,
  Maximize2,
  X,
  ArrowUpDown
} from 'lucide-react';
import { formatCurrency, cn } from '../utils';
import { useLayout } from '../LayoutContext';

interface GenericTableModuleProps {
  title: string;
  data: any[];
  columns: {
    key: string;
    label: string;
    align?: 'left' | 'right' | 'center';
    isCurrency?: boolean;
    isDate?: boolean;
  }[];
}

export function GenericTableModule({ title, data, columns }: GenericTableModuleProps) {
  const { isMaximized, setIsMaximized, setIsAgentPanelOpen, setAgentContext } = useLayout();
  const [activeTab, setActiveTab] = useState('Table View');

  useEffect(() => {
    setAgentContext(`${title} — ${activeTab}`);
  }, [setAgentContext, title, activeTab]);

  return (
    <div className={cn(
      "flex flex-col h-full bg-slate-50 overflow-hidden",
      isMaximized && "fixed inset-0 z-[200] h-screen w-screen bg-white"
    )}>
      {!isMaximized && (
        <div className="bg-white px-6 py-4 border-b border-slate-200 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-slate-900">{title}</h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm">
                <Download className="w-3.5 h-3.5" />
                Export
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm">
                <Plus className="w-3.5 h-3.5" />
                Add Record
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {['Table View', 'Analytics', 'Settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "pb-2 text-sm font-medium transition-all relative",
                  activeTab === tab 
                    ? "text-slate-900" 
                    : "text-slate-400 hover:text-slate-600"
                )}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={cn(
        "flex-1 flex flex-col overflow-hidden",
        isMaximized ? "p-0" : "p-6"
      )}>
        <div className={cn(
          "bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden flex-1",
          isMaximized && "rounded-none border-none shadow-none"
        )}>
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search records..." 
                  className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-64"
                />
              </div>
              <button className="flex items-center gap-2 px-3 py-1.5 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-medium transition-colors">
                <Filter className="w-3.5 h-3.5" />
                Filters
              </button>
            </div>
            <div className="flex items-center gap-3">
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

          <div className="flex-1 overflow-auto">
            <table className="w-full text-xs border-collapse">
              <thead className="sticky top-0 bg-slate-50 z-10">
                <tr>
                  {columns.map((col) => (
                    <th 
                      key={col.key}
                      className={cn(
                        "px-6 py-3 font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200",
                        col.align === 'right' ? "text-right" : "text-left"
                      )}
                    >
                      <div className={cn(
                        "flex items-center gap-1.5",
                        col.align === 'right' && "justify-end"
                      )}>
                        {col.label}
                        <ArrowUpDown className="w-3 h-3 text-slate-300" />
                      </div>
                    </th>
                  ))}
                  <th className="px-6 py-3 border-b border-slate-200" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                    {columns.map((col) => (
                      <td 
                        key={col.key}
                        className={cn(
                          "px-6 py-4 text-slate-600",
                          col.align === 'right' && "text-right font-mono",
                          col.key === columns[0].key && "font-medium text-slate-900"
                        )}
                      >
                        {col.isCurrency ? formatCurrency(row[col.key]) : row[col.key]}
                      </td>
                    ))}
                    <td className="px-6 py-4 text-right">
                      <button className="p-1 text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-all">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between shrink-0">
            <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
              Showing {data.length} records
            </div>
            <div className="flex items-center gap-2">
              <button className="px-2 py-1 text-[10px] font-bold text-slate-400 hover:text-slate-600 disabled:opacity-50" disabled>Previous</button>
              <div className="flex items-center gap-1">
                <button className="w-6 h-6 flex items-center justify-center rounded bg-slate-900 text-white text-[10px] font-bold">1</button>
                <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 text-slate-600 text-[10px] font-bold">2</button>
              </div>
              <button className="px-2 py-1 text-[10px] font-bold text-slate-600 hover:text-slate-900">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
