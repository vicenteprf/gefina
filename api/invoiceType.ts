import type {
  Customer as CustomerRecord,
  Invoice as InvoiceRecord,
} from '@prisma/client';
import type { InvoiceStatus } from './invoice.schema.ts';

export type InvoiceSituation = 'paid' | 'pending' | 'overdue';

export interface Invoice {
  id: number;
  amount: number;
  status: InvoiceStatus;
  situation: InvoiceSituation;
  issueDate: string;
  dueDate: string;
  customer: {
    id: number;
    name: string;
    email: string;
  };
}

export interface InvoiceRow {
  id: number;
  amount: number;
  status: InvoiceStatus;
  situation: InvoiceSituation;
  issue_date: string;
  due_date: string;
  customer_id: number;
  customer_name: string;
  customer_email: string;
}

export type InvoiceWithCustomer = InvoiceRecord & {
  customer: CustomerRecord;
};
