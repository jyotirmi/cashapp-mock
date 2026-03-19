import { Invoice, WeeklyForecast, AuditEntry } from './types';

export const WEEK_ENDING_DATES = [
  'Mar 6', 'Mar 13', 'Mar 20', 'Mar 27', 'Apr 3', 'Apr 10', 'Apr 17', 'Apr 24', 'May 1', 'May 8', 'May 15', 'May 22', 'May 29', 'Jun 5'
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: '1',
    customerName: 'Cobalt Digital Agency',
    invoiceNumber: 'INV-10639',
    invoiceDate: '2025-09-01',
    dueDate: '2025-09-16',
    amountDue: 73408,
    status: 'Overdue',
    daysOverdue: 175,
    historicalDSO: 78,
    expectedCollectionDate: '2026-03-20',
    collectionsWeek: 'Wk 2',
    flag: 'Severely Overdue'
  },
  {
    id: '2',
    customerName: 'Patriot Energy Corp',
    invoiceNumber: 'INV-10857',
    invoiceDate: '2025-09-01',
    dueDate: '2025-09-16',
    amountDue: 64543,
    status: 'Overdue',
    daysOverdue: 175,
    historicalDSO: 38,
    expectedCollectionDate: '2026-03-13',
    collectionsWeek: 'Wk 1',
    flag: 'Severely Overdue'
  },
  {
    id: '3',
    customerName: 'United Field Services',
    invoiceNumber: 'INV-10072',
    invoiceDate: '2025-09-03',
    dueDate: '2025-09-18',
    amountDue: 51447,
    status: 'Overdue',
    daysOverdue: 173,
    historicalDSO: 31,
    expectedCollectionDate: '2026-03-13',
    collectionsWeek: 'Wk 1'
  },
  {
    id: '4',
    customerName: 'Thornwood Equity LLC',
    invoiceNumber: 'INV-10101',
    invoiceDate: '2025-09-04',
    dueDate: '2025-09-19',
    amountDue: 69551,
    status: 'Overdue',
    daysOverdue: 172,
    historicalDSO: 14,
    expectedCollectionDate: '2026-03-13',
    collectionsWeek: 'Wk 1'
  },
  {
    id: '5',
    customerName: 'Highland Capital LLC',
    invoiceNumber: 'INV-10692',
    invoiceDate: '2025-09-09',
    dueDate: '2025-09-24',
    amountDue: 30991,
    status: 'Overdue',
    daysOverdue: 167,
    historicalDSO: 51,
    expectedCollectionDate: '2026-03-20',
    collectionsWeek: 'Wk 2'
  },
  {
    id: '6',
    customerName: 'Cascade Retail Group',
    invoiceNumber: 'INV-11245',
    invoiceDate: '2026-01-15',
    dueDate: '2026-02-14',
    amountDue: 28300,
    status: 'Overdue',
    daysOverdue: 25,
    historicalDSO: 45,
    expectedCollectionDate: '2026-03-27',
    collectionsWeek: 'Wk 3'
  },
  {
    id: '7',
    customerName: 'Acme Corporation',
    invoiceNumber: 'INV-11380',
    invoiceDate: '2026-02-10',
    dueDate: '2026-03-12',
    amountDue: 37647,
    status: 'Open',
    daysOverdue: 0,
    historicalDSO: 37,
    expectedCollectionDate: '2026-04-17',
    collectionsWeek: 'Wk 6'
  },
  {
    id: '8',
    customerName: 'Apex Funding Group',
    invoiceNumber: 'INV-11402',
    invoiceDate: '2026-02-20',
    dueDate: '2026-04-06',
    amountDue: 23988,
    status: 'Open',
    daysOverdue: 0,
    historicalDSO: 56,
    expectedCollectionDate: '2026-05-30',
    collectionsWeek: 'Wk 12'
  },
  {
    id: '9',
    customerName: 'Stellar Logistics',
    invoiceNumber: 'INV-11405',
    invoiceDate: '2026-02-22',
    dueDate: '2026-03-24',
    amountDue: 45200,
    status: 'Open',
    daysOverdue: 0,
    historicalDSO: 42,
    expectedCollectionDate: '2026-04-03',
    collectionsWeek: 'Wk 4'
  },
  {
    id: '10',
    customerName: 'Blue Horizon Tech',
    invoiceNumber: 'INV-11410',
    invoiceDate: '2026-02-25',
    dueDate: '2026-03-27',
    amountDue: 12500,
    status: 'Open',
    daysOverdue: 0,
    historicalDSO: 28,
    expectedCollectionDate: '2026-03-27',
    collectionsWeek: 'Wk 3'
  },
  {
    id: '11',
    customerName: 'Summit Peak Partners',
    invoiceNumber: 'INV-11415',
    invoiceDate: '2026-02-28',
    dueDate: '2026-03-30',
    amountDue: 89000,
    status: 'Open',
    daysOverdue: 0,
    historicalDSO: 65,
    expectedCollectionDate: '2026-05-01',
    collectionsWeek: 'Wk 8'
  },
  {
    id: '12',
    customerName: 'Ironclad Security',
    invoiceNumber: 'INV-11420',
    invoiceDate: '2026-03-01',
    dueDate: '2026-03-31',
    amountDue: 54000,
    status: 'Open',
    daysOverdue: 0,
    historicalDSO: 40,
    expectedCollectionDate: '2026-04-10',
    collectionsWeek: 'Wk 5'
  }
];

export const INITIAL_FORECAST: WeeklyForecast[] = WEEK_ENDING_DATES.map((date, i) => {
  const beginningCash = 30000000;
  // Mar 6 is a past week with actuals
  const inflow = date === 'Mar 6' ? 1450000 : 500000 + Math.random() * 1000000;
  const actualInflow = date === 'Mar 6' ? 1280000 : undefined;
  const outflow = 400000 + Math.random() * 300000;
  const net = inflow - outflow;
  // Simple cumulative logic for mock
  const balance = beginningCash + (i + 1) * 3000000; 
  return {
    weekEnding: date,
    inflows: inflow,
    actualInflows: actualInflow,
    outflows: outflow,
    netFlow: net,
    endingBalance: balance
  };
});

export const GENERIC_MOCK_DATA = [
  { id: '1', name: 'Global Tech Solutions', reference: 'REF-001', date: '2026-03-15', amount: 12500, status: 'Pending' },
  { id: '2', name: 'North Star Logistics', reference: 'REF-002', date: '2026-03-18', amount: 8400, status: 'Approved' },
  { id: '3', name: 'Horizon Ventures', reference: 'REF-003', date: '2026-03-20', amount: 21000, status: 'Pending' },
  { id: '4', name: 'Summit Enterprises', reference: 'REF-004', date: '2026-03-22', amount: 5600, status: 'Scheduled' },
  { id: '5', name: 'Blue Sky Systems', reference: 'REF-005', date: '2026-03-25', amount: 15750, status: 'Pending' },
  { id: '6', name: 'Ironclad Industries', reference: 'REF-006', date: '2026-03-28', amount: 9200, status: 'Approved' },
  { id: '7', name: 'Apex Partners', reference: 'REF-007', date: '2026-04-02', amount: 32000, status: 'Pending' },
  { id: '8', name: 'Stellar Services', reference: 'REF-008', date: '2026-04-05', amount: 4500, status: 'Scheduled' },
];

export const GENERIC_COLUMNS = [
  { key: 'name', label: 'Entity Name' },
  { key: 'reference', label: 'Reference #' },
  { key: 'date', label: 'Date' },
  { key: 'amount', label: 'Amount', align: 'right' as const, isCurrency: true },
  { key: 'status', label: 'Status' },
];

export const AUDIT_LOG: AuditEntry[] = [
  {
    id: 'a1',
    module: 'Open Invoices',
    record: 'INV-10639',
    customer: 'Cobalt Digital',
    timestamp: 'Mar 16, 9:14am',
    changeType: 'Rolled-over',
    field: 'Exp. Collection Date',
    previous: 'Mar 13',
    new: 'Mar 20',
    changedBy: 'Agent',
    reason: 'Rolled over from Wk 1 — invoice still open'
  },
  {
    id: 'a2',
    module: 'Open Invoices',
    record: 'INV-10857',
    customer: 'Patriot Energy',
    timestamp: 'Mar 16, 9:14am',
    changeType: 'Rolled-over',
    field: 'Exp. Collection Date',
    previous: 'Mar 13',
    new: 'Mar 20',
    changedBy: 'Agent',
    reason: 'Rolled over from Wk 1 — invoice still open'
  },
  {
    id: 'a3',
    module: 'Open Invoices',
    record: 'INV-10857',
    customer: 'Patriot Energy',
    timestamp: 'Mar 16, 9:22am',
    changeType: 'User-adjusted',
    field: 'Exp. Collection Date',
    previous: 'Mar 20',
    new: 'Mar 27',
    changedBy: 'Jyoti B.',
    reason: '"Spoke to AP, confirmed end of month"'
  },
  {
    id: 'a4',
    module: 'Open Invoices',
    record: 'INV-11380',
    customer: 'Acme Corp',
    timestamp: 'Mar 16, 9:14am',
    changeType: 'System-calculated',
    field: 'Exp. Collection Date',
    previous: '—',
    new: 'Apr 17',
    changedBy: 'Agent',
    reason: 'New invoice, DSO 37 applied'
  },
  {
    id: 'a5',
    module: 'Vendor Payments',
    record: 'AB-05207',
    customer: 'Stripe Inc',
    timestamp: 'Mar 16, 8:30am',
    changeType: 'System-calculated',
    field: 'Payment Date',
    previous: '—',
    new: 'Mar 16',
    changedBy: 'Agent',
    reason: 'Monthly payment, on schedule'
  }
];
