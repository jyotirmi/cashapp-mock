import React from 'react';
import { ChevronDown, User, Sparkles } from 'lucide-react';
import { useLayout } from '../LayoutContext';
import { cn } from '../utils';

export function TopBar() {
  const { isAgentPanelOpen, setIsAgentPanelOpen } = useLayout();

  return (
    <header className="h-14 border-b border-slate-200 bg-white flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="font-semibold text-slate-900 tracking-tight">CashFlow AI</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md cursor-pointer hover:bg-slate-100 transition-colors">
          <span className="text-xs font-medium text-slate-600">
            v12 — Mar 16, 2026 — <span className="text-slate-900">Committed</span>
          </span>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsAgentPanelOpen(!isAgentPanelOpen)}
          className={cn(
            "p-2 rounded-lg transition-all relative group",
            isAgentPanelOpen ? "bg-indigo-50 text-indigo-600 shadow-inner" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
          )}
          title="Open Agent Panel"
        >
          <Sparkles className="w-5 h-5" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-slate-900 text-white text-[8px] font-bold rounded-full flex items-center justify-center border-2 border-white">
            3
          </div>
        </button>

        <div className="h-6 w-px bg-slate-200 mx-1" />

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-medium text-slate-900">Jyoti B.</div>
            <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">CFO</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 border border-slate-300">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
