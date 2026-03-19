import React, { useState, useCallback, useRef, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Upload, 
  MoreHorizontal, 
  AlertCircle, 
  Calendar,
  CheckCircle2,
  ChevronRight,
  Download,
  X,
  ChevronDown,
  Info,
  ArrowRight,
  FileText,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { Invoice } from '../types';
import { INITIAL_INVOICES, INITIAL_FORECAST } from '../constants';
import { formatCurrency, cn } from '../utils';
import { ApprovalConfirmation } from './ApprovalConfirmation';
import { useLayout } from '../LayoutContext';

type WorkflowStep = 'default' | 'uploaded' | 'analyzed' | 'confirmed';

export function OpenInvoicesModule() {
  const [activeTab, setActiveTab] = useState<'table' | 'summary'>('table');
  const [workflowStep, setWorkflowStep] = useState<WorkflowStep>('default');
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [editingInvoiceId, setEditingInvoiceId] = useState<string | null>(null);
  const { isMaximized, setIsMaximized, setIsAgentPanelOpen, setAgentContext } = useLayout();

  useEffect(() => {
    setAgentContext(`Open Invoices — ${activeTab === 'table' ? 'Table View' : 'Summary & Variance'}`);
  }, [activeTab, setAgentContext]);

  const handleUpload = () => {
    setWorkflowStep('uploaded');
  };

  const handleRunAnalysis = () => {
    setWorkflowStep('analyzed');
    setShowUploadModal(false);
    
    // Mocking the analyzed state
    const updatedInvoices = invoices.map(inv => {
      if (inv.id === '1') {
        return { ...inv, expectedCollectionDate: '2026-03-27', wasExpectedDate: '2026-03-20' };
      }
      if (inv.id === '2') {
        return { ...inv, expectedCollectionDate: '2026-03-20', wasExpectedDate: '2026-03-13' };
      }
      return inv;
    });

    // Add some "NEW" invoices
    const newInvoices: Invoice[] = [
      {
        id: 'new-1',
        customerName: 'Atlas Freight',
        invoiceNumber: 'INV-11500',
        invoiceDate: '2026-03-10',
        dueDate: '2026-04-10',
        amountDue: 125000,
        status: 'Open',
        daysOverdue: 0,
        historicalDSO: 45,
        expectedCollectionDate: '2026-04-24',
        collectionsWeek: 'Wk 7',
        isNew: true
      }
    ];

    setInvoices([...newInvoices, ...updatedInvoices]);
  };

  const toggleSelect = (id: string) => {
    setSelectedInvoices(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleApprove = () => {
    setWorkflowStep('confirmed');
  };

  return (
    <div className={cn(
      "flex flex-col h-full bg-white relative",
      isMaximized && "fixed inset-0 z-[200] h-screen w-screen"
    )}>
      {workflowStep === 'confirmed' && (
        <ApprovalConfirmation 
          onClose={() => setWorkflowStep('default')} 
          forecast={INITIAL_FORECAST} 
        />
      )}
      {!isMaximized && (
        <div className="px-6 pt-4 border-b border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-slate-900">Open Invoices</h1>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => {
                  setWorkflowStep('default');
                  setShowUploadModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-md text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                <Upload className="w-4 h-4" />
                Upload CSV
              </button>
            </div>
          </div>

          <div className="flex gap-8">
            <button 
              onClick={() => setActiveTab('table')}
              className={cn(
                "pb-3 text-sm font-medium transition-colors relative",
                activeTab === 'table' ? "text-slate-900" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Table View
              {activeTab === 'table' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900" />}
            </button>
            <button 
              onClick={() => setActiveTab('summary')}
              className={cn(
                "pb-3 text-sm font-medium transition-colors relative",
                activeTab === 'summary' ? "text-slate-900" : "text-slate-500 hover:text-slate-700"
              )}
            >
              Summary & Variance
              {activeTab === 'summary' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900" />}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'table' ? (
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4 bg-slate-50/50">
            <div className="flex items-center gap-2">
              <div className="flex bg-white border border-slate-200 rounded-md p-0.5">
                {['All', 'Needs Attention', 'Agent Auto-handled', 'My Overrides'].map((filter) => (
                  <button 
                    key={filter}
                    className={cn(
                      "px-3 py-1 text-xs font-medium rounded transition-colors",
                      filter === 'All' ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <div className="h-6 w-px bg-slate-200 mx-2" />
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-slate-600 border border-slate-200 rounded hover:bg-white bg-slate-50">
                  Customer <ChevronDown className="w-3 h-3" />
                </button>
                <button className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-slate-600 border border-slate-200 rounded hover:bg-white bg-slate-50">
                  Status <ChevronDown className="w-3 h-3" />
                </button>
                <button className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-slate-600 border border-slate-200 rounded hover:bg-white bg-slate-50">
                  Flag <ChevronDown className="w-3 h-3" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search by invoice or customer..." 
                  className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all"
                />
              </div>
              <div className="h-6 w-px bg-slate-200 mx-1" />
              <button 
                onClick={() => setIsMaximized(!isMaximized)}
                className={cn(
                  "flex items-center gap-1.5 px-2 py-1.5 text-xs font-bold rounded-md transition-all",
                  isMaximized 
                    ? "bg-slate-900 text-white hover:bg-slate-800" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
                )}
                title={isMaximized ? "Exit immersive view" : "Maximize view"}
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
            <table className="finance-table">
              <thead className="sticky top-0 z-10">
                <tr>
                  <th className="w-10"><input type="checkbox" className="rounded border-slate-300" /></th>
                  <th>Customer Name</th>
                  <th>Invoice Number</th>
                  <th>Invoice Date</th>
                  <th>Due Date</th>
                  <th className="text-right">Amount Due ($)</th>
                  <th>Status</th>
                  <th className="text-right">Days Overdue</th>
                  <th className="text-right">Hist. DSO</th>
                  <th>Expected Collection</th>
                  <th>Wk</th>
                  <th>Flag</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id} className={cn(inv.flag === 'Severely Overdue' && "border-l-2 border-l-rose-500")}>
                    <td>
                      <input 
                        type="checkbox" 
                        className="rounded border-slate-300" 
                        checked={selectedInvoices.includes(inv.id)}
                        onChange={() => toggleSelect(inv.id)}
                      />
                    </td>
                    <td className="font-medium text-slate-900">
                      <div className="flex items-center gap-2">
                        {inv.customerName}
                        {inv.isNew && <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-[9px] font-bold rounded">NEW</span>}
                      </div>
                    </td>
                    <td className="mono-figure text-slate-500">{inv.invoiceNumber}</td>
                    <td className="text-slate-500">{inv.invoiceDate}</td>
                    <td className="text-slate-500">{inv.dueDate}</td>
                    <td className="text-right mono-figure font-medium">{formatCurrency(inv.amountDue)}</td>
                    <td>
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        inv.status === 'Overdue' ? "bg-rose-50 text-rose-600 border border-rose-100" : "bg-slate-50 text-slate-500 border border-slate-100"
                      )}>
                        {inv.status}
                      </span>
                    </td>
                    <td className={cn("text-right mono-figure", inv.daysOverdue > 0 ? "text-rose-600" : "text-slate-400")}>
                      {inv.daysOverdue}
                    </td>
                    <td className="text-right mono-figure text-slate-500">{inv.historicalDSO}</td>
                    <td className="relative group">
                      <div 
                        onClick={() => setEditingInvoiceId(inv.id)}
                        className={cn(
                          "px-2 py-1 rounded border font-medium cursor-pointer transition-colors",
                          inv.wasExpectedDate ? "bg-amber-50 border-amber-200 text-amber-700" : 
                          inv.isManual ? "bg-indigo-50 border-indigo-200 text-indigo-700" :
                          "bg-indigo-50/50 border-indigo-100/50 text-indigo-700"
                        )}
                      >
                        <div className="flex items-center gap-1">
                          {inv.expectedCollectionDate}
                          {inv.isManual && <span className="text-[9px] font-bold opacity-60">MANUAL</span>}
                        </div>
                        {inv.wasExpectedDate && (
                          <div className="text-[9px] font-normal opacity-70 mt-0.5 flex items-center gap-1">
                            was {inv.wasExpectedDate} <ArrowRight className="w-2 h-2" />
                          </div>
                        )}
                      </div>
                      
                      {editingInvoiceId === inv.id && (
                        <div className="absolute top-full left-0 mt-1 z-50 bg-white border border-slate-200 shadow-xl rounded-lg p-3 w-64">
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Set Collection Date</div>
                          <input type="date" className="w-full border border-slate-200 rounded px-2 py-1.5 text-sm mb-3" defaultValue={inv.expectedCollectionDate} />
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Add Note</div>
                          <textarea className="w-full border border-slate-200 rounded px-2 py-1.5 text-sm h-16 mb-3" placeholder="Reason for adjustment..." />
                          <div className="flex justify-end gap-2">
                            <button onClick={() => setEditingInvoiceId(null)} className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 rounded">Cancel</button>
                            <button onClick={() => setEditingInvoiceId(null)} className="px-3 py-1.5 text-xs font-medium bg-slate-900 text-white rounded">Save</button>
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="text-slate-500">{inv.collectionsWeek}</td>
                    <td>
                      {inv.flag && (
                        <div className={cn(
                          "flex items-center gap-1 text-[10px] font-bold",
                          inv.flag === 'Severely Overdue' ? "text-rose-600" : "text-amber-600"
                        )}>
                          <div className={cn("w-1.5 h-1.5 rounded-full", inv.flag === 'Severely Overdue' ? "bg-rose-600" : "bg-amber-600")} />
                          {inv.flag}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bulk Action Bar */}
          {selectedInvoices.length > 0 && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-6 z-40 animate-in fade-in slide-in-from-bottom-4">
              <div className="text-sm font-bold border-r border-slate-700 pr-6">
                {selectedInvoices.length} selected
              </div>
              <div className="flex items-center gap-4">
                <button className="text-xs font-bold hover:text-slate-300 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" /> Set Collection Date
                </button>
                <button className="text-xs font-bold hover:text-slate-300 flex items-center gap-1.5">
                  <ChevronRight className="w-4 h-4" /> Push Out by...
                </button>
                <button className="text-xs font-bold hover:text-slate-300 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" /> Add Note
                </button>
              </div>
              <button 
                onClick={() => setSelectedInvoices([])}
                className="ml-4 p-1 hover:bg-slate-800 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="h-12 border-t border-slate-200 bg-slate-50 flex items-center justify-between px-6">
            <div className="text-xs text-slate-500 font-medium">
              {invoices.length} invoices  |  $37.8M total  |  
              <span className={cn("ml-1 font-bold", workflowStep === 'analyzed' ? "text-indigo-600" : "text-slate-900")}>
                {workflowStep === 'analyzed' ? '214 pending changes' : '0 pending changes'}
              </span>
            </div>
            <div className="text-xs text-slate-500">
              {workflowStep === 'analyzed' ? (
                <div className="flex items-center gap-2">
                  <Info className="w-3 h-3 text-indigo-500" />
                  Approving will shift Wk1 by <span className="text-emerald-600 font-bold">+$1.2M</span>, Wk3 by <span className="text-rose-600 font-bold">-$200K</span>
                </div>
              ) : (
                <span className="text-slate-400 italic">No pending changes to forecast</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button className="px-3 py-1.5 text-xs font-semibold text-slate-600 border border-slate-200 rounded hover:bg-white transition-colors">
                Save Working Copy
              </button>
              <button 
                disabled={workflowStep !== 'analyzed'}
                onClick={handleApprove}
                className={cn(
                  "px-3 py-1.5 text-xs font-semibold rounded transition-colors",
                  workflowStep === 'analyzed' ? "bg-slate-900 text-white hover:bg-slate-800" : "bg-slate-300 text-white cursor-not-allowed"
                )}
              >
                Approve & Update Forecast
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-50/30">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex gap-4">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
            <div className="text-sm text-slate-600 leading-relaxed">
              <p className="mb-2">You have 999 open invoices totaling <span className="font-bold text-slate-900">$37.8M</span> in Amount Due. This week's biggest risk is <span className="font-bold text-rose-600">$1.8M</span> in rolled-over overdue invoices — 47 line items were expected to collect last week but remain unpaid.</p>
              <p>Three customers account for 40% of the overdue value: <span className="font-medium text-slate-900">Cobalt Digital Agency</span> ($73K), <span className="font-medium text-slate-900">Patriot Energy Corp</span> ($101K), and <span className="font-medium text-slate-900">Marble Arch Advisors</span> ($70K). On the positive side, 188 new invoices were added this week and accuracy remains high at 82%.</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Total Open Value', value: '$37.8M', sub: '999 invoices' },
              { label: 'Weighted Avg DSO', value: '47 days', sub: '+2 from last wk' },
              { label: 'Agent Accuracy', value: '82%', sub: '±5 days window' },
              { label: 'Overdue Value', value: '$4.2M', sub: '89 invoices', color: 'text-rose-600' }
            ].map((kpi, i) => (
              <div key={i} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</div>
                <div className={cn("text-2xl font-bold text-slate-900", kpi.color)}>{kpi.value}</div>
                <div className="text-xs text-slate-500 mt-1">{kpi.sub}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Severely Overdue', value: '$4.2M', count: '89', color: 'bg-rose-500' },
              { label: 'High Risk', value: '$680K', count: '12', color: 'bg-amber-500' },
              { label: 'Partial Payment', value: '$45K', count: '3', color: 'bg-emerald-500' }
            ].map((flag, i) => (
              <div key={i} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex items-center justify-between cursor-pointer hover:border-slate-300 transition-colors">
                <div>
                  <div className="text-xs font-semibold text-slate-900">{flag.label}</div>
                  <div className="text-lg font-bold text-slate-900">{flag.value}</div>
                  <div className="text-[10px] text-slate-500">{flag.count} invoices</div>
                </div>
                <div className={cn("w-2 h-12 rounded-full", flag.color)} />
              </div>
            ))}
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Weekly Collections Forecast</h3>
                <p className="text-[10px] text-slate-500 font-medium italic">Past week performance (Mar 6) vs. future projections</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-blue-600 rounded-sm" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Actual / Forecast</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-emerald-500 rounded-sm" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Variance (+)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-blue-200 rounded-sm" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Variance (-)</span>
                </div>
              </div>
            </div>
            
            <div className="h-64 flex items-end gap-3 px-2 border-b border-slate-100 pb-2">
              {INITIAL_FORECAST.map((f, i) => {
                const maxVal = 2000000;
                const isPast = f.actualInflows !== undefined;
                
                if (isPast) {
                  const actual = f.actualInflows!;
                  const forecast = f.inflows;
                  const variance = actual - forecast;
                  const baseHeight = (Math.min(actual, forecast) / maxVal) * 100;
                  const varHeight = (Math.abs(variance) / maxVal) * 100;
                  const totalHeight = `${Math.max(baseHeight + varHeight, 15)}%`;

                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative h-full justify-end">
                      <div className="w-full flex flex-col-reverse relative cursor-help shadow-sm rounded-t-md overflow-hidden border-x border-t border-slate-200" style={{ height: totalHeight }}>
                        {/* Base (Actual or Forecast) */}
                        <div className="w-full bg-blue-600" style={{ height: `${(Math.min(actual, forecast) / (Math.max(actual, forecast))) * 100}%` }} />
                        {/* Variance */}
                        <div className={cn(
                          "w-full",
                          variance >= 0 ? "bg-emerald-500" : "bg-blue-200"
                        )} style={{ height: `${(Math.abs(variance) / (Math.max(actual, forecast))) * 100}%` }} />
                        
                        {/* Tooltip */}
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-white bg-slate-900 px-2 py-1 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                          {f.weekEnding} (Past Week)<br/>
                          Actual: {formatCurrency(actual)}<br/>
                          Forecast: {formatCurrency(forecast)}<br/>
                          Variance: {variance >= 0 ? '+' : ''}{formatCurrency(variance)}
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                        </div>
                        
                        {/* Variance label */}
                        <div className={cn(
                          "absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold whitespace-nowrap",
                          variance >= 0 ? "text-emerald-600" : "text-rose-600"
                        )}>
                          {variance >= 0 ? '+' : ''}{formatCurrency(variance)}
                        </div>
                      </div>
                      
                      <div className="text-[9px] text-slate-900 font-bold font-mono rotate-45 origin-left mt-4 whitespace-nowrap">
                        {f.weekEnding}
                      </div>
                    </div>
                  );
                }

                const height = `${Math.max((f.inflows / maxVal) * 100, 15)}%`;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative h-full justify-end">
                    <div 
                      className="w-full bg-blue-600 group-hover:bg-blue-700 rounded-t-md relative cursor-help shadow-sm border-x border-t border-blue-700"
                      style={{ height, backgroundColor: '#2563eb' }}
                    >
                      {/* Tooltip */}
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-white bg-slate-900 px-2 py-1 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                        {f.weekEnding}: {formatCurrency(f.inflows)}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                      </div>
                      
                      {/* Value labels on hover */}
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        {formatCurrency(f.inflows)}
                      </div>
                    </div>
                    
                    <div className="text-[9px] text-slate-500 font-mono rotate-45 origin-left mt-4 whitespace-nowrap font-medium">
                      {f.weekEnding}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Historical Variance</h3>
            </div>
            <table className="finance-table">
              <thead>
                <tr>
                  <th>Week Ending</th>
                  <th className="text-right">Forecasted</th>
                  <th className="text-right">Actual</th>
                  <th className="text-right">Variance</th>
                  <th className="text-right">Variance %</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mar 6, 2026</td>
                  <td className="text-right mono-figure">$1,450,000</td>
                  <td className="text-right mono-figure">$1,280,000</td>
                  <td className="text-right mono-figure text-rose-600">-$170,000</td>
                  <td className="text-right mono-figure text-rose-600">-11.7%</td>
                </tr>
                <tr>
                  <td>Feb 27, 2026</td>
                  <td className="text-right mono-figure">$980,000</td>
                  <td className="text-right mono-figure">$1,020,000</td>
                  <td className="text-right mono-figure text-emerald-600">+$40,000</td>
                  <td className="text-right mono-figure text-emerald-600">+4.1%</td>
                </tr>
                <tr>
                  <td>Feb 20, 2026</td>
                  <td className="text-right mono-figure">$1,120,000</td>
                  <td className="text-right mono-figure">$1,115,000</td>
                  <td className="text-right mono-figure text-slate-400">-$5,000</td>
                  <td className="text-right mono-figure text-slate-400">-0.4%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-[500px] overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Upload Open Invoices</h2>
              <button onClick={() => setShowUploadModal(false)} className="p-1 hover:bg-slate-100 rounded">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className="p-8">
              {workflowStep === 'default' ? (
                <div 
                  onClick={handleUpload}
                  className="border-2 border-dashed border-slate-200 rounded-xl p-12 flex flex-col items-center justify-center bg-slate-50 group hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6 text-slate-400 group-hover:text-indigo-500" />
                  </div>
                  <div className="text-sm font-medium text-slate-900 mb-1">Drop your Netsuite export here, or click to browse</div>
                  <div className="text-xs text-slate-400">Supported formats: CSV, XLSX</div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="w-10 h-10 bg-white rounded border border-slate-200 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">open_invoices_mar16.csv</div>
                      <div className="text-xs text-slate-500">1,000 invoices parsed</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
                      <div className="text-lg font-bold text-slate-900">812</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Matched</div>
                    </div>
                    <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-center">
                      <div className="text-lg font-bold text-emerald-600">188</div>
                      <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">New</div>
                    </div>
                    <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg text-center">
                      <div className="text-lg font-bold text-amber-600">23</div>
                      <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Missing</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => { setShowUploadModal(false); setWorkflowStep('default'); }} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900">Cancel</button>
              <button 
                onClick={handleRunAnalysis}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  workflowStep === 'uploaded' ? "bg-slate-900 text-white hover:bg-slate-800" : "bg-slate-200 text-slate-400 cursor-not-allowed"
                )}
              >
                Run Analysis
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
