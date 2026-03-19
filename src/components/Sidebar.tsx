import React, { useState } from 'react';
import { 
  Home,
  FileText, 
  TrendingUp, 
  Users, 
  CreditCard, 
  Briefcase, 
  ShieldCheck, 
  HardHat, 
  Layers,
  BarChart3,
  History,
  Settings,
  Database,
  UserPlus,
  ArrowRightLeft,
  Clock,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { cn } from '../utils';
import { useLayout } from '../LayoutContext';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  status?: 'green' | 'amber' | 'red';
  badge?: string;
  onClick?: () => void;
  isCollapsed?: boolean;
}

function NavItem({ icon: Icon, label, active, status, badge, onClick, isCollapsed }: NavItemProps) {
  return (
    <button 
      onClick={onClick}
      title={isCollapsed ? label : undefined}
      className={cn(
        "w-full flex items-center rounded-md text-sm transition-all group relative",
        isCollapsed ? "justify-center px-0 py-2.5" : "justify-between px-3 py-2",
        active ? "bg-slate-100 text-slate-900 font-medium" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      )}
    >
      <div className={cn("flex items-center", isCollapsed ? "justify-center" : "gap-3")}>
        <Icon className={cn("w-4 h-4 shrink-0", active ? "text-slate-900" : "text-slate-400 group-hover:text-slate-600")} />
        {!isCollapsed && <span>{label}</span>}
      </div>
      {status && (
        <div className={cn(
          "rounded-full shrink-0",
          isCollapsed ? "absolute top-2 right-2 w-1.5 h-1.5" : "w-1.5 h-1.5",
          status === 'green' && "bg-emerald-500",
          status === 'amber' && "bg-amber-500",
          status === 'red' && "bg-rose-500"
        )} />
      )}
      {badge && (
        <div className={cn(
          "flex items-center justify-center rounded-full bg-slate-900 text-white font-bold leading-none",
          isCollapsed ? "absolute -top-1 -right-1 w-4 h-4 text-[8px]" : "w-5 h-5 text-[10px]"
        )}>
          {badge}
        </div>
      )}
    </button>
  );
}

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

export function Sidebar({ activeModule, onModuleChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isAgentPanelOpen, setIsAgentPanelOpen } = useLayout();

  return (
    <aside className={cn(
      "border-r border-slate-200 bg-white flex flex-col h-[calc(100vh-3.5rem)] transition-all duration-300 relative",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-4 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm z-50 hover:bg-slate-50 text-slate-400 hover:text-slate-600"
      >
        {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        <div>
          <div className="space-y-0.5">
            <NavItem 
              icon={Home} 
              label="Home" 
              active={activeModule === 'Home'} 
              isCollapsed={isCollapsed}
              onClick={() => onModuleChange('Home')}
            />
            <NavItem 
              icon={Sparkles} 
              label="Agent" 
              badge="3"
              active={isAgentPanelOpen}
              isCollapsed={isCollapsed}
              onClick={() => setIsAgentPanelOpen(!isAgentPanelOpen)}
            />
            <NavItem 
              icon={MessageSquare} 
              label="Agent Chat" 
              active={activeModule === 'Agent'} 
              isCollapsed={isCollapsed}
              onClick={() => onModuleChange('Agent')}
            />
          </div>
        </div>

        <div>
          {!isCollapsed && <h3 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Cash Inflows</h3>}
          <div className="space-y-0.5">
            <NavItem 
              icon={FileText} 
              label="Open Invoices" 
              active={activeModule === 'Open Invoices'} 
              status="amber"
              isCollapsed={isCollapsed}
              onClick={() => onModuleChange('Open Invoices')}
            />
            <NavItem 
              icon={TrendingUp} 
              label="Future Invoices" 
              active={activeModule === 'Future Invoices'} 
              isCollapsed={isCollapsed}
              onClick={() => onModuleChange('Future Invoices')}
            />
            <NavItem 
              icon={Database} 
              label="Other Inflows" 
              active={activeModule === 'Other Inflows'} 
              isCollapsed={isCollapsed}
              onClick={() => onModuleChange('Other Inflows')}
            />
          </div>
        </div>

        <div>
          {!isCollapsed && <h3 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Cash Outflows</h3>}
          <div className="space-y-0.5">
            <NavItem 
              icon={CreditCard} 
              label="Vendor Payments" 
              status="green"
              active={activeModule === 'Vendor Payments'} 
              isCollapsed={isCollapsed}
              onClick={() => onModuleChange('Vendor Payments')}
            />
            <NavItem 
              icon={Briefcase} 
              label="Operating Expenses" 
              status="green"
              active={activeModule === 'Operating Expenses'} 
              isCollapsed={isCollapsed}
              onClick={() => onModuleChange('Operating Expenses')}
            />
            <NavItem 
              icon={Users} 
              label="Payroll" 
              active={activeModule === 'Payroll'} 
              isCollapsed={isCollapsed}
              onClick={() => onModuleChange('Payroll')}
            />
            <NavItem 
              icon={ShieldCheck} 
              label="Tax & Legal" 
              active={activeModule === 'Tax & Legal'} 
              isCollapsed={isCollapsed}
              onClick={() => onModuleChange('Tax & Legal')}
            />
            <NavItem 
              icon={HardHat} 
              label="Capex" 
              active={activeModule === 'Capex'} 
              isCollapsed={isCollapsed}
              onClick={() => onModuleChange('Capex')}
            />
            <NavItem 
              icon={Layers} 
              label="Other Outflows" 
              active={activeModule === 'Other Outflows'} 
              isCollapsed={isCollapsed}
              onClick={() => onModuleChange('Other Outflows')}
            />
          </div>
        </div>

        <div>
          {!isCollapsed && <h3 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Forecast</h3>}
          <div className="space-y-0.5">
            <NavItem 
              icon={BarChart3} 
              label="13-Week Summary" 
              active={activeModule === '13-Week Summary'} 
              isCollapsed={isCollapsed}
              onClick={() => onModuleChange('13-Week Summary')}
            />
            <NavItem 
              icon={ArrowRightLeft} 
              label="Variance Report" 
              active={activeModule === 'Variance Report'} 
              isCollapsed={isCollapsed}
              onClick={() => onModuleChange('Variance Report')}
            />
            <NavItem 
              icon={Clock} 
              label="Audit Trail" 
              active={activeModule === 'Audit Trail'} 
              isCollapsed={isCollapsed}
              onClick={() => onModuleChange('Audit Trail')}
            />
            <NavItem 
              icon={History} 
              label="Version History" 
              active={activeModule === 'Version History'} 
              isCollapsed={isCollapsed}
              onClick={() => onModuleChange('Version History')}
            />
          </div>
        </div>

        <div>
          {!isCollapsed && <h3 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Settings</h3>}
          <div className="space-y-0.5">
            <NavItem icon={Layers} label="Integrations" isCollapsed={isCollapsed} />
            <NavItem icon={Settings} label="Agent Settings" isCollapsed={isCollapsed} />
            <NavItem icon={UserPlus} label="Team & Permissions" isCollapsed={isCollapsed} />
          </div>
        </div>

      </div>
    </aside>
  );
}
