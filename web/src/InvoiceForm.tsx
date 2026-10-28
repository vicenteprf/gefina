import { useState, type SubmitEvent } from 'react';
import type { InvoiceFormProps, InvoiceStatus } from './invoiceType.ts'

export default function InvoiceForm(props: InvoiceFormProps) {
    const [customerId, setCustomerId] = useState(!props.invoice ? '' : props.invoice.customer.id);
    const [amount, setAmount] = useState(!props.invoice ? '' : (props.invoice.amount / 100).toFixed(2));
    const [status, setStatus] = useState<InvoiceStatus>(!props.invoice ? 'pending' : props.invoice.status);
    const [issueDate, setIssueDate] = useState(!props.invoice ? '' : props.invoice.issueDate);
    const [dueDate, setDueDate] = useState(!props.invoice ? '' : props.invoice.dueDate);

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();

        props.onSubmit({
            customerId: Number(customerId),
            amount: Math.round(Number(amount) * 100),
            status,
            issueDate,
            dueDate
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>{!props.invoice ? 'Criar fatura' : 'Editar fatura'}</h2>

            <div>
                <label htmlFor='customer' >Cliente</label>
                <select
                    id='customer'
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                >
                    <option>Selecione um cliente</option>
                    {props.customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                            {customer.name} — {customer.email}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor='amount'>Valor</label>
                <input
                    id='amount'
                    type='number'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    step='0.01'
                    min='0.01'
                    required
                />
            </div>

            <div>
                <label htmlFor='status'>Situação</label>
                <select
                    id='status'
                    value={status}
                    onChange={(e) => setStatus(e.target.value as InvoiceStatus)}
                >
                    <option value="pending">Pendente</option>
                    <option value="paid">Paga</option>
                </select>
            </div>

            <div>
                <label htmlFor='issueDate'>Emissão</label>
                <input
                    id='issueDate'
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    type='date'
                    required
                />
            </div>

            <div>
                <label htmlFor='dueDate'>Vencimento</label>
                <input
                    id='dueDate'
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    type='date'
                    required
                />
            </div>

            {!props.error ? null : <p>{props.error}</p>}

            <div>
                {!props.invoice ? null : <button
                    type='button'
                    disabled={props.busy}
                    onClick={props.onDelete}
                >
                    Excluir
                </button>}
                <button
                    type='button'
                    disabled={props.busy}
                    onClick={props.onCancel}
                >
                    Cancelar
                </button>
                <button
                    type='submit'
                    disabled={props.busy}
                >
                    {props.busy ? 'Salvando...' : 'Salvar'}
                </button>
            </div>

        </form>
    )
}