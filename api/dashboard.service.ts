import pool from './database.ts';
import type { Resource, Dashboard } from './dashboardType.ts';
import type { InvoiceStatus } from './invoiceType.ts';
import { findRecentInvoice, findOverdueInvoices } from './invoice.service.ts'

async function sumAmountByStatus(status: InvoiceStatus): Promise<number> {
    const connect = await pool.query(`
        SELECT COALESCE(SUM(amount), 0)::int AS total FROM invoices WHERE status = $1`,
    [status])

    return connect.rows[0].total;
}

async function count(resource: Resource): Promise<number> {
    const connect = await pool.query(`SELECT COUNT(*)::int AS total FROM ${resource};`);

    return connect.rows[0].total;
}

export default async function findDashboard(): Promise<Dashboard> {
    const paid = await sumAmountByStatus('paid');
    const pending = await sumAmountByStatus('pending');
    const invoiceCount = await count('invoices');
    const customersCount = await count('customers');
    const recentInvoices = await findRecentInvoice();
    const overdueInvoices = await findOverdueInvoices();

    return {
        totals: {
            paid,
            pending,
            invoiceCount,
            customersCount
        },
        recentInvoices,
        overdueInvoices
    }
}