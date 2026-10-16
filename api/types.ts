type InvoiceStatus = 'pending' | 'paid';

interface Customer {
    id: number;
    name: string;
    email: string;
}

export interface Invoice {
    id: number;
    amount: number;
    status: InvoiceStatus;
    issueDate: string;
    dueDate: string;
    customer: Customer;
}

export interface InvoiceRow {
    id: number;
    amount: number;
    status: InvoiceStatus;
    issue_date: string;
    due_date: string;
    customer_id: number;
    customer_name: string;
    customer_email: string;
}