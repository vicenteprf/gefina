import { useEffect, useState } from 'react';
import type { Dashboard } from './dashboardType.ts';
import SummaryCard from './SummaryCard.tsx';
import InvoiceSummaryTable from './InvoiceSummaryTable.tsx';
import { formatCurrency } from './utils.ts';

export default function DashboardPage() {
    const [dashboard, setDashboard] = useState<null | Dashboard>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getDashboard() {
            try {
                const response = await fetch('/api/dashboard');

                if (!response.ok) {
                    setError('Não foi possível carregar o painel inicial.');
                    setLoading(false);
                    return;
                }

                const datas = await response.json();
                setDashboard(datas);
            } catch (e) {
                console.error(e)

                setError('Não foi possível carregar o painel inicial.');
            }

            setLoading(false);
        }
        getDashboard();
    }, []);


    if (loading) return <p>carregando painel inicial...</p>

    if (error !== null || dashboard === null) return <p>{error}</p>

    return (
        <div>
            <h1>Painel Inicial</h1>

            <div>
                <SummaryCard label='total recebido:' value={formatCurrency(dashboard.totals.paid)} />
                <SummaryCard label='total pendente:' value={formatCurrency(dashboard.totals.pending)} />
                <SummaryCard label='Faturas:' value={String(dashboard.totals.invoiceCount)} />
                <SummaryCard label='Clientes:' value={String(dashboard.totals.customersCount)} />
            </div>


            <InvoiceSummaryTable
                title='Faturas Recentes'
                dataLabel='Emissão'
                invoices={dashboard.recentInvoices}
                date={(invoice) => invoice.issueDate}
            />

            <InvoiceSummaryTable
                title='Faturas Pendentes'
                dataLabel='Vencimento'
                invoices={dashboard.overdueInvoices}
                date={(invoice) => invoice.dueDate}
            />

        </div>
    );
}
