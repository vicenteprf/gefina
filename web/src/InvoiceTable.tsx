import type { Invoice } from "./invoiceType.ts"
import InvoiceRow from "./InvoiceRow.tsx";

interface InvoiceTableProps {
    invoices: Invoice[];
}

export default function InvoiceTable(props: InvoiceTableProps) {

    return (
        <table>
            <thead>
                <tr>
                    <th>Cliente</th>
                    <th>Valor</th>
                    <th>Data da emissão</th>
                    <th>Data de vencimento</th>
                    <th>Situação</th>
                </tr>
            </thead>
            <tbody>
                {props.invoices.map(invoice => (
                    <InvoiceRow key={invoice.id} invoice={invoice} />
                ))}
            </tbody>
        </table>
    )
}