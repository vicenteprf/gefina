import { useEffect, useState } from 'react';
import type { Dashboard } from '../types/dashboardType.ts';
import { formatCurrency } from '../utils.ts';
import InvoiceSummaryTable from './InvoiceSummaryTable.tsx';
import SummaryCard from './SummaryCard.tsx';

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState<null | Dashboard>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
        console.error(e);

        setError('Não foi possível carregar o painel inicial.');
      }

      setLoading(false);
    }
    getDashboard();
  }, []);

  if (loading)
    return <p className="text-sm text-text-muted">carregando...</p>;

  if (error !== null || dashboard === null)
    return <p className="text-overdue">{error}</p>;

  return (
    <>
      <h1 className="text-xl font-semibold mb-7">Painel Inicial</h1>

      <div className="flex gap-4">
        <SummaryCard
          label="total recebido:"
          value={`R$ ${formatCurrency(dashboard.totals.paid)}`}
        />
        <SummaryCard
          label="total pendente:"
          value={`R$ ${formatCurrency(dashboard.totals.pending)}`}
        />
        <SummaryCard
          label="Faturas:"
          value={String(dashboard.totals.invoiceCount)}
        />
        <SummaryCard
          label="Clientes:"
          value={String(dashboard.totals.customersCount)}
        />
      </div>

      <div className="flex gap-6 mt-8">
        <InvoiceSummaryTable
          title="Faturas Recentes"
          dataLabel="Emissão"
          invoices={dashboard.recentInvoices}
          date={(invoice) => invoice.issueDate}
        />

        <InvoiceSummaryTable
          title="Faturas Pendentes"
          dataLabel="Vencimento"
          invoices={dashboard.overdueInvoices}
          date={(invoice) => invoice.dueDate}
        />
      </div>

      <small className="fixed bottom-0 left-[calc(50%+120px)] -translate-x-1/2 text-text-muted">
        &copy; 2026. Gefina - Gestão financeira simples e eficiente.
      </small>
    </>
  );
}
