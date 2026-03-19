export interface Invoice {
  id: string;
  customerName: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  amountDue: number;
  status: 'Open' | 'Overdue';
  daysOverdue: number;
  historicalDSO: number;
  expectedCollectionDate: string;
  collectionsWeek: string;
  flag?: 'Severely Overdue' | 'High Risk' | 'Partial Payment';
  isNew?: boolean;
  wasExpectedDate?: string;
  isManual?: boolean;
}

export interface WeeklyForecast {
  weekEnding: string;
  inflows: number;
  actualInflows?: number;
  outflows: number;
  netFlow: number;
  endingBalance: number;
}

export interface AuditEntry {
  id: string;
  module: string;
  record: string;
  customer: string;
  timestamp: string;
  changeType: 'Rolled-over' | 'User-adjusted' | 'System-calculated' | 'Agent auto-handled';
  field: string;
  previous: string;
  new: string;
  changedBy: string;
  reason: string;
}
