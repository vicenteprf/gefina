import type { SetStateAction } from 'react';
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
  situation: InvoiceSituation;
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
  fieldErrors: InvoiceFieldErrors;
  onDelete: () => void;
  confirmDelete: boolean;
  setConfirmDelete: React.Dispatch<SetStateAction<boolean>>;
  confirm: () => void;
  onCancel: () => void;
  onSubmit: (values: InvoiceInput) => void;
  busy: boolean;
}

export interface InvoiceFieldErrors {
  customerId?: string;
  amount?: string;
  status?: string;
  issueDate?: string;
  dueDate?: string;
}

export interface ApiFailure {
  message: string;
  fields: InvoiceFieldErrors;
}
