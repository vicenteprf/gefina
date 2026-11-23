import type { Invoice } from '../types/invoiceType.ts';
import InvoiceRow from './InvoiceRow.tsx';

interface InvoiceTableProps {
  invoices: Invoice[];
  edit: (invoice: Invoice) => void;
}

export default function InvoiceTable(props: InvoiceTableProps) {
  const base =
    'text-sm font-medium p-3 border-b border-border text-text-muted';

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className={`${base} text-left`}>Cliente</th>
          <th className={`${base} text-left`}>Valor</th>
          <th className={base}>Data da emissão</th>
          <th className={base}>Data de vencimento</th>
          <th className={base}>Situação</th>
          <th className={base}></th>
        </tr>
      </thead>
      <tbody>
        {props.invoices.map((invoice) => (
          <InvoiceRow
            key={invoice.id}
            invoice={invoice}
            edit={props.edit}
          />
        ))}
      </tbody>
    </table>
  );
}
