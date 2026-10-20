export type InvoiceStatus = 'paid' | 'pending';
type InvoiceSituation = 'paid' | 'pending' | 'overdue';


interface Customer {
    id: number;
    name: string;
    email: string;
}

export interface Invoice {
    id: number;
    amount: number;
    status: InvoiceStatus;
    situation: InvoiceSituation,
    issueDate: string;
    dueDate: string;
    customer: Customer;
}

export interface InvoiceRow {
    id: number;
    amount: number;
    status: InvoiceStatus;
    situation: InvoiceSituation,
    issue_date: string;
    due_date: string;
    customer_id: number;
    customer_name: string;
    customer_email: string;
}

