import type { InvoiceSummaryTableProps } from "./dashboardType.ts";
import { formatCurrency, formatDate } from "./utils.ts";

export default function InvoiceSummaryTable(props: InvoiceSummaryTableProps) {
  const base = "p-3 border-b border-border";
  return (
    <div className="flex-1 p-4 bg-surface border border-border rounded-surface">
      <h2 className="text-xl font-semibold">{props.title}</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className={`${base} text-left text-sm font-medium text-text`}>
              Cliente
            </th>
            <th className={`${base} text-center text-sm font-medium text-text`}>
              Valor
            </th>
            <th className={`${base} text-sm font-medium text-text`}>
              {props.dataLabel}
            </th>
          </tr>
        </thead>
        <tbody>
          {props.invoices.map((invoice) => {
            return (
              <tr key={invoice.id}>
                <td className={base}>{invoice.customer.name}</td>
                <td className={`${base} tabular-nums`}>
                  <div className="flex justify-between">
                    <span>R$</span>
                    {formatCurrency(invoice.amount)}
                  </div>
                </td>
                <td className={`${base} text-center tabular-nums`}>
                  {formatDate(props.date(invoice))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
