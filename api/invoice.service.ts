import pool from "./database.ts";
import type { Invoice, InvoiceRow } from "./invoiceType.ts";

function toInvoice(row: InvoiceRow): Invoice {
  return {
    id: row.id,
    amount: row.amount,
    status: row.status,
    situation: row.situation,
    issueDate: row.issue_date,
    dueDate: row.due_date,
    customer: {
      id: row.customer_id,
      name: row.customer_name,
      email: row.customer_email,
    },
  }
}

const baseQuery = `
  SELECT
    invoices.id,
    invoices.amount,
    invoices.status,
    CASE
      WHEN status = 'paid' THEN 'paid'
      WHEN invoices.due_date < CURRENT_DATE THEN 'overdue'
      ELSE 'pending'
    END AS situation,
    invoices.issue_date,
    invoices.due_date,
    customers.id AS customer_id,
    customers.name AS customer_name,
    customers.email AS customer_email
  FROM invoices
  JOIN customers
  ON customers.id = invoices.customer_id 
  `;

export async function findAllInvoice(): Promise<Invoice[]> {
  const connect = await pool.query<InvoiceRow>(`${baseQuery} ORDER BY invoices.issue_date DESC;`);

  return connect.rows.map(toInvoice);
}

export async function findInvoiceById(id:number): Promise<Invoice | undefined>{
  const connect = await pool.query<InvoiceRow>(`${baseQuery} WHERE invoices.id = $1`, [id]);

  if(!connect.rows.length) return undefined;

  return toInvoice(connect.rows[0]);
}




