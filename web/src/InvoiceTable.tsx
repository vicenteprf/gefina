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
                    <td>Cliente</td>
                    <td>Valor</td>
                    <td>Data da emissão</td>
                    <td>Data de vencimento</td>
                    <td>Situação</td>
                </tr>
            </thead>
            <tbody>
                {props.invoices.map((invoice => (
                    <InvoiceRow key={invoice.id} invoice={invoice}/>
                )))}
            </tbody>
        </table>
    )
}