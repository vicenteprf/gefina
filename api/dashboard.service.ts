import prisma from './prisma.ts';
import type { Dashboard } from './dashboardType.ts';
import type { InvoiceStatus } from './invoice.schema.ts';
import { findRecentInvoice, findOverdueInvoices } from './invoice.service.ts'

async function sumAmountByStatus(status: InvoiceStatus): Promise<number> {
    const sum = await prisma.invoice.aggregate({
        where: { status },
        _sum: { amount: true }
    })

    return !sum._sum.amount ? 0 : sum._sum.amount 
}

export default async function findDashboard(): Promise<Dashboard> {
  const paid = await sumAmountByStatus('paid');
    const pending = await sumAmountByStatus('pending');
    const invoiceCount = await prisma.invoice.count();
    const customersCount = await prisma.customer.count();
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