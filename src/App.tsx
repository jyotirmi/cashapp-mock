import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { SummaryBar } from './components/SummaryBar';
import { OpenInvoicesModule } from './components/OpenInvoicesModule';
import { ForecastSummary } from './components/ForecastSummary';
import { AuditTrail } from './components/AuditTrail';
import { VarianceReport } from './components/VarianceReport';
import { HomePage } from './components/HomePage';
import { INITIAL_FORECAST, GENERIC_MOCK_DATA, GENERIC_COLUMNS } from './constants';
import { useLayout } from './LayoutContext';
import { AgentPanel } from './components/AgentPanel';
import { GenericTableModule } from './components/GenericTableModule';
import { Sparkles, Send, Filter, Download, Calendar, Search, ChevronLeft, ChevronRight, Plus, MoreHorizontal, ArrowUpDown, Upload, FileText, CreditCard, Briefcase, ShieldCheck, HardHat, Layers, Home, TrendingUp, Users, Database, UserPlus, ArrowRightLeft, Clock } from 'lucide-react';

export default function App() {
  const [activeModule, setActiveModule] = useState('Home');
  const { isMaximized, isAgentPanelOpen } = useLayout();

  const renderModule = () => {
    switch (activeModule) {
      case 'Home':
        return <HomePage />;
      case 'Open Invoices':
        return <OpenInvoicesModule />;
      case 'Future Invoices':
        return <GenericTableModule title="Future Invoices" data={GENERIC_MOCK_DATA} columns={GENERIC_COLUMNS} />;
      case 'Other Inflows':
        return <GenericTableModule title="Other Inflows" data={GENERIC_MOCK_DATA} columns={GENERIC_COLUMNS} />;
      case 'Vendor Payments':
        return <GenericTableModule title="Vendor Payments" data={GENERIC_MOCK_DATA} columns={GENERIC_COLUMNS} />;
      case 'Operating Expenses':
        return <GenericTableModule title="Operating Expenses" data={GENERIC_MOCK_DATA} columns={GENERIC_COLUMNS} />;
      case 'Payroll':
        return <GenericTableModule title="Payroll" data={GENERIC_MOCK_DATA} columns={GENERIC_COLUMNS} />;
      case 'Tax & Legal':
        return <GenericTableModule title="Tax & Legal" data={GENERIC_MOCK_DATA} columns={GENERIC_COLUMNS} />;
      case 'Capex':
        return <GenericTableModule title="Capex" data={GENERIC_MOCK_DATA} columns={GENERIC_COLUMNS} />;
      case 'Other Outflows':
        return <GenericTableModule title="Other Outflows" data={GENERIC_MOCK_DATA} columns={GENERIC_COLUMNS} />;
      case '13-Week Summary':
        return <ForecastSummary />;
      case 'Variance Report':
        return <VarianceReport />;
      case 'Audit Trail':
        return <AuditTrail />;
      case 'Agent':
        return (
          <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
            <div className="p-8 max-w-5xl mx-auto w-full flex-1 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                    <Sparkles className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900">Agent Chat</h1>
                    <p className="text-sm text-slate-500">Immersive assistant experience</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">JB</div>
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600">AI</div>
                  </div>
                  <div className="h-8 w-px bg-slate-200 mx-1" />
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-sm">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Agent Online</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col relative">
                <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
                  {/* Mock Conversation */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 shadow-md">
                      <Sparkles className="text-white w-5 h-5" />
                    </div>
                    <div className="space-y-4 max-w-[85%]">
                      <div className="bg-slate-100 rounded-2xl rounded-tl-none p-5 text-sm text-slate-800 leading-relaxed shadow-sm">
                        <p className="font-medium mb-2">Good morning, Jyoti!</p>
                        <p>I've analyzed your cash flow for the upcoming week. You have a projected net outflow of <span className="font-bold text-rose-600">$1.2M</span>, primarily due to quarterly tax payments. However, I've identified <span className="font-bold text-emerald-600">$450k</span> in open invoices from high-reliability customers that could be accelerated.</p>
                      </div>
                      
                      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-slate-900">Recommended Accelerations</h3>
                          <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded uppercase tracking-wider">High Confidence</span>
                        </div>
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-slate-400 text-left border-b border-slate-100">
                              <th className="pb-2 font-medium">Customer</th>
                              <th className="pb-2 font-medium">Invoice #</th>
                              <th className="pb-2 font-medium text-right">Amount</th>
                              <th className="pb-2 font-medium text-right">Due Date</th>
                            </tr>
                          </thead>
                          <tbody className="text-slate-700">
                            <tr className="border-b border-slate-50">
                              <td className="py-3 font-medium">Acme Corp</td>
                              <td className="py-3 text-slate-500">INV-2024-001</td>
                              <td className="py-3 text-right font-mono">$125,000</td>
                              <td className="py-3 text-right">Mar 25</td>
                            </tr>
                            <tr className="border-b border-slate-50">
                              <td className="py-3 font-medium">Global Tech</td>
                              <td className="py-3 text-slate-500">INV-2024-012</td>
                              <td className="py-3 text-right font-mono">$210,000</td>
                              <td className="py-3 text-right">Mar 28</td>
                            </tr>
                            <tr>
                              <td className="py-3 font-medium">Starlight Inc</td>
                              <td className="py-3 text-slate-500">INV-2024-045</td>
                              <td className="py-3 text-right font-mono">$115,000</td>
                              <td className="py-3 text-right">Apr 02</td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="flex gap-3 pt-2">
                          <button className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200 flex items-center justify-center gap-2">
                            <Send className="w-3 h-3" /> Send Payment Reminders
                          </button>
                          <button className="px-4 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 transition-all">
                            View All
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 justify-end">
                    <div className="space-y-4 max-w-[80%]">
                      <div className="bg-indigo-600 rounded-2xl rounded-tr-none p-5 text-sm text-white leading-relaxed shadow-lg shadow-indigo-200">
                        That looks great. Please send the reminders to Acme and Global Tech, but hold off on Starlight for now as they just closed a new contract with us.
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center shrink-0 border-2 border-white shadow-sm">
                      <span className="text-slate-600 text-xs font-bold">JB</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 shadow-md">
                      <Sparkles className="text-white w-5 h-5" />
                    </div>
                    <div className="space-y-4 max-w-[85%]">
                      <div className="bg-slate-100 rounded-2xl rounded-tl-none p-5 text-sm text-slate-800 leading-relaxed shadow-sm">
                        Understood. I've queued the reminders for Acme Corp and Global Tech. I've also updated the forecast to reflect the expected acceleration of <span className="font-bold text-emerald-600">$335k</span>.
                      </div>
                      
                      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                          <TrendingUp className="text-emerald-600 w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">Forecast Impact</p>
                          <p className="text-sm text-emerald-700 leading-tight">Ending Cash Balance for Week 1 increased by <span className="font-bold">$335,000</span>. New projected balance: <span className="font-bold">$69.7M</span>.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input Bar */}
                <div className="p-6 border-t border-slate-100 bg-slate-50/80 backdrop-blur-sm">
                  <div className="max-w-3xl mx-auto relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-10 group-focus-within:opacity-25 transition-opacity duration-500"></div>
                    <div className="relative flex items-center gap-3 bg-white border border-slate-200 rounded-2xl p-2 shadow-lg transition-all group-focus-within:border-indigo-400 group-focus-within:ring-4 group-focus-within:ring-indigo-500/10">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                        <Plus className="w-5 h-5" />
                      </button>
                      <input 
                        type="text" 
                        placeholder="Ask anything about your cash flow..."
                        className="flex-1 bg-transparent border-none text-sm focus:outline-none placeholder:text-slate-400"
                      />
                      <button className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200 flex items-center justify-center">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex gap-2 mt-3 px-2">
                      <button className="text-[10px] font-bold text-slate-500 hover:text-indigo-600 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm transition-all hover:border-indigo-200">Analyze Variance</button>
                      <button className="text-[10px] font-bold text-slate-500 hover:text-indigo-600 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm transition-all hover:border-indigo-200">Run Scenario</button>
                      <button className="text-[10px] font-bold text-slate-500 hover:text-indigo-600 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm transition-all hover:border-indigo-200">Export Forecast</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex-1 flex items-center justify-center bg-slate-50 text-slate-400 italic">
            Module "{activeModule}" is under development for this mockup.
          </div>
        );
    }
  };

  const showSummaryBar = !['Home', '13-Week Summary', 'Variance Report', 'Audit Trail', 'Version History', 'Agent'].includes(activeModule);

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      {!isMaximized && <TopBar />}
      <div className="flex flex-1 overflow-hidden">
        {!isMaximized && <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {!isMaximized && showSummaryBar && <SummaryBar forecast={INITIAL_FORECAST} />}
          <div className="flex-1 flex flex-row overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden">
              {renderModule()}
            </div>
            {isAgentPanelOpen && <AgentPanel />}
          </div>
        </main>
      </div>
    </div>
  );
}
