import type { Invoice } from "./invoiceType.ts";
import { situationLabel, formatCurrency, situationClass, formatDate } from "./utils.ts";


interface InvoiceRowProps {
    invoice: Invoice;
}

export default function InvoiceRow(props: InvoiceRowProps) {
    return (
        <tr>
            <td>{props.invoice.customer.name}</td>
            <td className='numeric'>
                <span>R$</span>
                <span>{formatCurrency(props.invoice.amount)}</span>
            </td>
            <td className='numeric' >{formatDate(props.invoice.issueDate)}</td>
            <td className='numeric'>{formatDate(props.invoice.dueDate)}</td>
            <td className={situationClass(props.invoice.situation)}>
                {situationLabel(props.invoice.situation)}
            </td>
        </tr>
    )
}