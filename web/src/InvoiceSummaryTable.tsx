import type { InvoiceSummaryTableProps } from './dashboardType.ts';
import { formatCurrency, formatDate } from './utils.ts';

export default function InvoiceSummaryTable(props: InvoiceSummaryTableProps) {
    return (
        <div>
            <h2>{props.title}</h2>

            <table>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Valor</th>
                        <th>{props.dataLabel}</th>
                    </tr>
                </thead>
                <tbody>
                    {props.invoices.map(invoice => {
                        return (
                            <tr key={invoice.id}>
                                <td>{invoice.customer.name}</td>
                                <td>{formatCurrency(invoice.amount)}</td>
                                <td>{formatDate(props.date(invoice))}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}