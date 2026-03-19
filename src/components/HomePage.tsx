import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { 
  Send, 
  MessageSquare, 
  TrendingUp, 
  AlertCircle, 
  Clock, 
  ArrowUpRight,
  ChevronRight,
  CheckCircle2,
  Circle
} from 'lucide-react';
import { cn } from '../utils';

const FORECAST_DATA = [
  { name: 'Wk1', current: 60.6, prior: 59.8 },
  { name: 'Wk2', current: 61.4, prior: 60.5 },
  { name: 'Wk3', current: 61.7, prior: 60.9 },
  { name: 'Wk4', current: 62.2, prior: 61.3 },
  { name: 'Wk5', current: 63.5, prior: 62.4 },
  { name: 'Wk6', current: 64.6, prior: 63.2 },
  { name: 'Wk7', current: 64.8, prior: 63.5 },
  { name: 'Wk8', current: 65.9, prior: 64.5 },
  { name: 'Wk9', current: 66.1, prior: 64.8 },
  { name: 'Wk10', current: 67.6, prior: 66.1 },
  { name: 'Wk11', current: 67.7, prior: 66.3 },
  { name: 'Wk12', current: 68.4, prior: 67.0 },
  { name: 'Wk13', current: 69.4, prior: 68.2 },
];

const VARIANCE_DATA = [
  { week: 'W7', value: 8.7 },
  { week: 'W8', value: 7.2 },
  { week: 'W9', value: 5.9 },
  { week: 'W10', value: 4.8 },
  { week: 'W11', value: 4.1 },
  { week: 'W12', value: 3.2 },
];

const getVarianceColor = (value: number) => {
  if (value > 5) return '#ef4444'; // red-500
  if (value >= 3.5) return '#f59e0b'; // amber-500
  return '#10b981'; // emerald-500
};

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  subtitleColor?: 'green' | 'muted';
}

function MetricCard({ title, value, subtitle, subtitleColor = 'muted' }: MetricCardProps) {
  return (
    <div className="bg-slate-50 p-4 rounded-lg flex flex-col gap-1">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</span>
      <span className="text-2xl font-bold text-slate-900">{value}</span>
      <span className={cn(
        "text-[11px] font-medium",
        subtitleColor === 'green' ? "text-emerald-600" : "text-slate-500"
      )}>
        {subtitle}
      </span>
    </div>
  );
}

interface AttentionRowProps {
  label: string;
  subtitle: string;
  amount: string;
  variant: 'red' | 'amber' | 'neutral';
}

function AttentionRow({ label, subtitle, amount, variant }: AttentionRowProps) {
  return (
    <button className={cn(
      "w-full flex items-center justify-between p-3 rounded-md transition-colors text-left group",
      variant === 'red' && "bg-rose-50/50 hover:bg-rose-50",
      variant === 'amber' && "bg-amber-50/50 hover:bg-amber-50",
      variant === 'neutral' && "bg-slate-50 hover:bg-slate-100"
    )}>
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-1 h-8 rounded-full",
          variant === 'red' && "bg-rose-500",
          variant === 'amber' && "bg-amber-500",
          variant === 'neutral' && "bg-slate-300"
        )} />
        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-900">{label}</span>
          <span className="text-xs text-slate-500">{subtitle}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-slate-900">{amount}</span>
        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-400" />
      </div>
    </button>
  );
}

interface ModuleStatusCardProps {
  title: string;
  status: 'green' | 'amber' | 'gray';
  subtitle: string;
  amount: string;
}

function ModuleStatusCard({ title, status, subtitle, amount }: ModuleStatusCardProps) {
  return (
    <button className={cn(
      "flex-1 bg-white border border-slate-200 rounded-lg p-4 text-left transition-all hover:shadow-md group relative overflow-hidden",
      status === 'green' && "border-l-4 border-l-emerald-500",
      status === 'amber' && "border-l-4 border-l-amber-500",
      status === 'gray' && "border-l-4 border-l-slate-300"
    )}>
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</span>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-slate-900">{amount}</span>
          <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
        </div>
        <span className="text-xs text-slate-500">{subtitle}</span>
      </div>
    </button>
  );
}

export function HomePage() {
  return (
    <div className="h-full overflow-y-auto bg-white">
      <div className="max-w-[1440px] mx-auto p-8 space-y-8">
        {/* Section 1: Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Cash forecast overview</h1>
            <p className="text-sm text-slate-500 font-medium">v12 — Mar 16, 2026 — Committed</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <Send className="w-4 h-4" />
              Send report
            </button>
          </div>
        </div>

        {/* Section 2: KPI Cards */}
        <div className="grid grid-cols-4 gap-4">
          <MetricCard 
            title="Ending cash (Wk 13)" 
            value="$69.4M" 
            subtitle="+$1.2M vs last week" 
            subtitleColor="green" 
          />
          <MetricCard 
            title="Open invoice exposure" 
            value="$37.8M" 
            subtitle="999 invoices across 102 customers" 
          />
          <MetricCard 
            title="Forecast variance (last 4 wks)" 
            value="3.2%" 
            subtitle="Down from 8.7% four weeks ago" 
            subtitleColor="green" 
          />
          <MetricCard 
            title="Agent autonomy" 
            value="Level 2" 
            subtitle="92% auto-handled, 8% override rate" 
          />
        </div>

        {/* Section 3: Two-Column Layout (Chart + Agent Briefing) */}
        <div className="grid grid-cols-10 gap-6">
          {/* Left Column: Forecast trajectory chart */}
          <div className="col-span-6 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Forecast trajectory</h3>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-blue-600 rounded-full" />
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Current (v12)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 border-t-2 border-dashed border-slate-300" />
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Prior week (v11)</span>
                </div>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={FORECAST_DATA} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
                    dy={10}
                  />
                  <YAxis 
                    domain={[58, 72]} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
                    tickFormatter={(val) => `$${val}M`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }}
                    formatter={(value: number) => [`$${value}M`, '']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="current" 
                    stroke="#2563eb" 
                    strokeWidth={2.5} 
                    dot={{ r: 3, fill: '#2563eb', strokeWidth: 0 }}
                    activeDot={{ r: 5, strokeWidth: 0 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="prior" 
                    stroke="#cbd5e1" 
                    strokeWidth={1.5} 
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Column: Agent briefing */}
          <div className="col-span-4 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Agent briefing</h3>
            </div>

            <div className="flex-1 space-y-6">
              <div className="text-sm leading-relaxed text-slate-600 space-y-4">
                <p>
                  Your biggest risk this week is <span className="font-bold text-rose-600">$1.8M in rolled-over invoices</span> from 47 line items expected last week that didn't come in.
                </p>
                <p>
                  Three customers account for 40% of overdue exposure: <span className="font-bold text-slate-900">Cobalt Digital</span>, <span className="font-bold text-slate-900">Patriot Energy</span>, and <span className="font-bold text-slate-900">Marble Arch</span>.
                </p>
                <p>
                  188 new invoices were added this week. Agent accuracy is at <span className="font-bold text-emerald-600">82% within ±5 days</span> over the last 4 weeks.
                </p>
                <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-xs">
                    <span className="font-bold text-amber-700 uppercase tracking-wider mr-1">Recommended:</span>
                    Escalate the 3 overdue customers to AR before Thursday.
                  </p>
                </div>
              </div>
            </div>

            <button className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">
              Escalate now
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Section 4: Two-Column Layout (Attention Items + Variance Trend) */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column: Needs attention */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Needs attention</h3>
              <p className="text-xs text-slate-500">Across all modules</p>
            </div>

            <div className="space-y-2">
              <AttentionRow 
                label="Severely overdue invoices" 
                subtitle="89 invoices, 90+ days past due" 
                amount="$4.2M" 
                variant="red" 
              />
              <AttentionRow 
                label="High risk invoices" 
                subtitle="12 invoices flagged by agent" 
                amount="$680K" 
                variant="amber" 
              />
              <AttentionRow 
                label="Rolled over from last week" 
                subtitle="47 invoices that missed their forecast" 
                amount="$1.8M" 
                variant="amber" 
              />
              <AttentionRow 
                label="Vendor payments due this week" 
                subtitle="18 payments confirmed" 
                amount="$597K" 
                variant="neutral" 
              />
            </div>
          </div>

          {/* Right Column: Weekly variance trend */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Weekly variance trend</h3>
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full">
                <TrendingUp className="w-3 h-3" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Improving</span>
              </div>
            </div>

            <div className="h-[180px] w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={VARIANCE_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <XAxis 
                    dataKey="week" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
                    tickFormatter={(val) => `${val}%`}
                  />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }}
                    formatter={(value: number) => [`${value}%`, 'Variance']}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={32}>
                    {VARIANCE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getVarianceColor(entry.value)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="pt-6 border-t border-slate-100 grid grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Agent overrides</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-slate-900">8%</span>
                  <span className="text-[11px] font-medium text-emerald-600">Down from 14%</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Agent accuracy</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-slate-900">82%</span>
                  <span className="text-[11px] font-medium text-emerald-600">Within ±5 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Module Status Grid */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Module status</h3>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-[10px] font-medium">Last updated: Mar 16, 9:45am</span>
            </div>
          </div>

          <div className="flex gap-4">
            <ModuleStatusCard 
              title="Open invoices" 
              status="amber" 
              amount="$37.8M" 
              subtitle="214 pending changes" 
            />
            <ModuleStatusCard 
              title="Future invoices" 
              status="green" 
              amount="$8.5M" 
              subtitle="Up to date" 
            />
            <ModuleStatusCard 
              title="Vendor payments" 
              status="green" 
              amount="$6.9M" 
              subtitle="Up to date" 
            />
            <ModuleStatusCard 
              title="Payroll" 
              status="gray" 
              amount="—" 
              subtitle="Not yet configured" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
