import type { Invoice } from './invoiceType.ts';

export interface DashboardTotals {
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

export interface SummaryCardProps {
    label: string;
    value: string;
}

export interface InvoiceSummaryTableProps {
    title: string;
    dataLabel: string;
    invoices: Invoice[];
    date: (invoice: Invoice) => string;
}