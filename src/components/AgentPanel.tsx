import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Undo, Check, MessageSquare } from 'lucide-react';
import { cn } from '../utils';
import { useLayout } from '../LayoutContext';

interface Message {
  id: string;
  role: 'agent' | 'user';
  content: React.ReactNode;
  timestamp: Date;
}

export function AgentPanel() {
  const { setIsAgentPanelOpen, agentContext, agentPanelWidth, setAgentPanelWidth } = useLayout();
  const isResizing = useRef(false);
  const [input, setInput] = useState('');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'agent',
      timestamp: new Date(),
      content: (
        <div className="space-y-4">
          <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
            <p className="text-xs font-bold text-amber-900 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" /> Proactive Alert
            </p>
            <p className="text-xs text-amber-800 leading-relaxed">
              Good morning. I've analyzed this week's invoice upload — 812 matched to prior records, 188 are new. 47 invoices that were forecasted for last week are still unpaid and have been rolled forward.
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-slate-700">Here's what needs your attention:</p>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
              <li>47 rolled-over invoices ($1.8M) — I've moved them to Week 1</li>
              <li>3 severely overdue customers flagged for escalation</li>
              <li>188 new invoices assigned collection dates based on customer DSO</li>
            </ul>
          </div>
          <button className="text-xs font-bold text-slate-900 hover:underline flex items-center gap-1">
            View Rolled-Over Invoices →
          </button>
        </div>
      )
    },
    {
      id: '2',
      role: 'user',
      timestamp: new Date(),
      content: "Push the rolled-over invoices to Week 2 instead of Week 1. And flag the top 3 severely overdue for the AR team."
    },
    {
      id: '3',
      role: 'agent',
      timestamp: new Date(),
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs text-slate-700">Done. Here's what I changed:</p>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
              <li>47 invoices ($1.8M) moved from Week 1 to Week 2</li>
              <li>Week 1 collections decreased by $1.8M → now $29.4M</li>
              <li>Week 2 collections increased by $1.8M → now $3.3M</li>
              <li>Flagged 3 customers for AR: Cobalt Digital ($73K), Patriot Energy ($101K), Marble Arch ($70K)</li>
            </ul>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-xs font-bold text-slate-900 hover:underline">View Changes in Table →</button>
            <button className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1">
              <Undo className="w-3 h-3" /> Undo
            </button>
          </div>
          <p className="text-xs text-slate-700">Want me to draft a note to send to the AR team?</p>
        </div>
      )
    },
    {
      id: '4',
      role: 'user',
      timestamp: new Date(),
      content: "Yes, draft it"
    },
    {
      id: '5',
      role: 'agent',
      timestamp: new Date(),
      content: (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-slate-50 px-3 py-2 border-b border-slate-200">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Draft Email</p>
            </div>
            <div className="p-3 space-y-3">
              <p className="text-xs font-bold text-slate-900">Subject: Action Required — Overdue Invoice Escalation (Week of Mar 16)</p>
              <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
                <p>Hi team, the following customer invoices are 170+ days overdue and need direct follow-up:</p>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>Cobalt Digital Agency — INV-10639 — $73,408 (175 days)</li>
                  <li>Patriot Energy Corp — INV-10857, INV-11006 — $100,626 total (170-175 days)</li>
                  <li>Marble Arch Advisors — INV-10079 — $69,753 (171 days)</li>
                </ol>
                <p>Please confirm expected payment dates by Thursday so we can update this week's forecast.</p>
                <p>Thanks,<br />[User Name]</p>
              </div>
            </div>
            <div className="p-2 bg-slate-50 border-t border-slate-200 flex gap-2">
              <button className="flex-1 bg-slate-900 text-white py-1.5 rounded text-[10px] font-bold hover:bg-slate-800 transition-colors">
                Send to AR Team
              </button>
              <button className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded text-[10px] font-bold hover:bg-white transition-colors">
                Edit
              </button>
              <button className="px-3 py-1.5 text-slate-400 rounded text-[10px] font-bold hover:text-slate-600 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )
    }
  ]);

  const startResizing = (e: React.MouseEvent) => {
    isResizing.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopResizing);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const stopResizing = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopResizing);
    document.body.style.cursor = 'default';
    document.body.style.userSelect = 'auto';
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;
    const newWidth = window.innerWidth - e.clientX;
    if (newWidth > 300 && newWidth < 800) {
      setAgentPanelWidth(newWidth);
    }
  };

  return (
    <div 
      style={{ width: `${agentPanelWidth}px` }}
      className="flex flex-col bg-white border-l border-slate-200 h-full relative shrink-0 shadow-2xl"
    >
      {/* Resize Handle */}
      <div 
        onMouseDown={startResizing}
        className="absolute left-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-slate-300 transition-colors z-10"
      />

      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-slate-900" />
            Agent
          </h2>
          <p className="text-[10px] text-slate-500 font-medium">Context: {agentContext}</p>
        </div>
        <button 
          onClick={() => setIsAgentPanelOpen(false)}
          className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50/30">
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={cn(
              "flex flex-col max-w-[90%]",
              msg.role === 'user' ? "ml-auto items-end" : "items-start"
            )}
          >
            <div className={cn(
              "rounded-2xl px-4 py-3 text-sm shadow-sm",
              msg.role === 'user' 
                ? "bg-slate-900 text-white rounded-tr-none" 
                : "bg-white border border-slate-200 text-slate-800 rounded-tl-none"
            )}>
              {msg.content}
            </div>
            <span className="text-[9px] text-slate-400 mt-1.5 font-medium">
              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 bg-white shrink-0">
        <div className="relative">
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask or instruct the agent..."
            className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all resize-none h-20"
          />
          <button className="absolute right-3 bottom-3 p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {['Analyze variance', 'Draft email', 'Find overdue', 'Update forecast'].map((suggestion) => (
            <button 
              key={suggestion}
              className="whitespace-nowrap px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold hover:bg-slate-200 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
