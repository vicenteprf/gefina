import type { InvoiceSituation } from "./invoiceType"

export function situationLabel(situation: InvoiceSituation) {
   return situation === 'paid' ? 'Pago' : situation === 'overdue' ? 'Atrasado' : 'Pendente';
}