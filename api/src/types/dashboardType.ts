import type { Invoice } from './invoiceType.ts';

export interface Dashboard {
  totals: {
    paid: number;
    pending: number;
    invoiceCount: number;
    customersCount: number;
  };
  recentInvoices: Invoice[];
  overdueInvoices: Invoice[];
}
