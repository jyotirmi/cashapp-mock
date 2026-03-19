import React, { useState } from 'react';
import { MessageSquare, X, Send, Minus, Undo } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils';

export function ChatPanel() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {!isExpanded && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsExpanded(true)}
            className="w-14 h-14 bg-slate-900 text-white rounded-full shadow-xl flex items-center justify-center relative hover:bg-slate-800 transition-colors"
          >
            <MessageSquare className="w-6 h-6" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
              3
            </div>
          </motion.button>
        )}

        {isExpanded && (
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            className="w-[380px] h-[550px] bg-white rounded-xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">AI</span>
                </div>
                <span className="font-semibold text-sm text-slate-900">Cash Agent</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsExpanded(false)} className="p-1 hover:bg-slate-200 rounded transition-colors">
                  <Minus className="w-4 h-4 text-slate-500" />
                </button>
                <button onClick={() => setIsExpanded(false)} className="p-1 hover:bg-slate-200 rounded transition-colors">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-slate-900 rounded flex-shrink-0 flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">AI</span>
                </div>
                <div className="bg-white border border-slate-200 p-3 rounded-lg rounded-tl-none text-sm text-slate-700 shadow-sm">
                  <p className="mb-2">Good morning. I've analyzed this week's invoice upload — 812 matched to prior records, 188 are new. 47 invoices that were forecasted for last week are still unpaid and have been rolled forward.</p>
                  <p className="font-medium text-slate-900 mb-2">Here's what needs your attention:</p>
                  <ul className="space-y-1 mb-3">
                    <li className="flex items-center gap-2">• 47 rolled-over invoices ($1.8M)</li>
                    <li className="flex items-center gap-2">• 3 severely overdue customers</li>
                    <li className="flex items-center gap-2">• 188 new invoices assigned dates</li>
                  </ul>
                  <button className="text-xs font-semibold text-indigo-600 hover:underline">View Rolled-Over Invoices →</button>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <div className="bg-indigo-600 text-white p-3 rounded-lg rounded-tr-none text-sm shadow-sm max-w-[80%]">
                  Push the rolled-over invoices to Week 2 instead of Week 1. And flag the top 3 severely overdue for the AR team.
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 bg-slate-900 rounded flex-shrink-0 flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">AI</span>
                </div>
                <div className="bg-white border border-slate-200 p-3 rounded-lg rounded-tl-none text-sm text-slate-700 shadow-sm">
                  <p className="mb-2">Done. Here's what I changed:</p>
                  <ul className="space-y-1 mb-3">
                    <li className="flex items-center gap-2">• 47 invoices ($1.8M) moved to Week 2</li>
                    <li className="flex items-center gap-2">• Week 1 collections: -$1.8M</li>
                    <li className="flex items-center gap-2">• Week 2 collections: +$1.8M</li>
                    <li className="flex items-center gap-2">• Flagged 3 customers for AR</li>
                  </ul>
                  <div className="flex gap-2 mb-3">
                    <button className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-600 hover:bg-slate-200">View Changes</button>
                    <button className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-600 hover:bg-slate-200 flex items-center gap-1">
                      <Undo className="w-3 h-3" /> Undo
                    </button>
                  </div>
                  <p>Want me to draft a note to send to the AR team?</p>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-white">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ask the agent..." 
                  className="w-full pl-4 pr-10 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-900 transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
