import type { CustomerOption } from './customerType.ts';

export type InvoiceStatus = 'pending' | 'paid';
export type InvoiceSituation = 'paid' | 'pending' | 'overdue';

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

export interface InvoiceInput {
  customerId: number;
  amount: number;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
}

export interface InvoiceFormProps {
  invoice: Invoice | null;
  customers: CustomerOption[];
  error: string | null;
  onDelete: () => void;
  onCancel: () => void;
  onSubmit: (values: InvoiceInput) => void;
  busy: boolean;
}
