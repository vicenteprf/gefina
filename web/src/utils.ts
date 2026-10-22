import type { InvoiceSituation } from "./invoiceType"

export function situationLabel(situation: InvoiceSituation) {
   return situation === 'paid' ? 'Pago' : situation === 'overdue' ? 'Atrasado' : 'Pendente';
}

export function situationClass(situation: InvoiceSituation) {
   return situation === 'paid' ? 'situation-paid' : situation === 'overdue' ? 'situation-overdue' : 'situation-pending';
}

export function formatCurrency(cents: number): string {
   const formatter = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
   })

   return formatter.format(cents / 100)
}

export function formatDate(isoDate: string): string {
   const formatter = new Intl.DateTimeFormat('pt-BR', {
      day: "2-digit",
      month: '2-digit',
      year: "numeric"
   })

   return formatter.format(new Date(`${isoDate}T00:00:00`))
}