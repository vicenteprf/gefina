import type { Invoice } from "./invoiceType.ts";

export type Resource = 'invoices' | 'customers';

interface DashboardTotals {
    paid: number;
    pending: number;
    invoiceCount: number;
    customersCount: number
}

export interface Dashboard {
    totals: DashboardTotals;
    recentInvoices: Invoice[];
    overdueInvoices: Invoice[];
}