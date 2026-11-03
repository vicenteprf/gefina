import { useEffect, useState, useRef } from 'react';
import type { Invoice, InvoiceInput } from './invoiceType.ts';
import InvoiceTable from './InvoiceTable.tsx';
import InvoiceForm from './InvoiceForm.tsx';
import { getAllInvoices, createInvoice, updateInvoice, deleteInvoice } from './invoiceApi.ts';
import type { CustomerOption } from './customerType.ts';

export default function InvoicePage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [customersOptions, setCustomersOptions] = useState<CustomerOption[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [dialogContent, setDialogContent] = useState(false);
  const [target, setTarget] = useState<Invoice | null>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)


  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    async function getInvoices() {
      try {
        const datas = await getAllInvoices();

        setInvoices(datas);
      } catch (e) {
        if (e instanceof Error) setError(e.message);
      }

      setLoading(false);
    }
    getInvoices();
  }, []);

  useEffect(() => {
    async function getCustomersOptions() {
      try {
        const response = await fetch('/api/customers/options');

        if (!response.ok) throw new Error('Falha ao buscar opções de clientes.');

        const datas = await response.json();

        setCustomersOptions(datas);
      } catch (e) {
        if (e instanceof Error) setError(e.message);
      }
    }

    getCustomersOptions();
  }, [])

  function openDialog(invoice: Invoice | null) {
    setTarget(invoice);
    setFormError(null);
    setDialogContent(true);

    dialogRef.current?.showModal();
  }

  function closesDialog() {
    setFormError(null);

    dialogRef.current?.close()
  }

  async function refresh() {
    try {
      const datas = await getAllInvoices();

      setInvoices(datas);
    } catch (e) {
      if (e instanceof Error) throw error;
    }

  }

  async function submit(datas: InvoiceInput) {
    setBusy(true);
    setFormError(null);

    try {
      if (!target) {
        await createInvoice(datas);
      } else {
        await updateInvoice(target.id, datas);
      }
      closesDialog();
      await refresh();
    } catch (e) {
      if (e instanceof Error) setFormError(e.message);
    } finally {
      setBusy(false)
    }

  }

  async function confirm() {
    if (!target) return;

    setBusy(true);
    setFormError(null);

    try {
      await deleteInvoice(target.id);
      closesDialog();
      await refresh();
    } catch (e) {
      if (e instanceof Error) setFormError(e.message);
    } finally {
      setBusy(false);
    }

  }

  if (loading) return <p>carregando faturas...</p>

  if (error) return <p>{error}</p>

  return (
    <>
      <header className='page-header'>
        <h1>Faturas</h1>
        <button
          className='button-primary'
          type='button'
          onClick={() => openDialog(null)}
        >Nova fatura</button>
      </header>

      <div className='panel'>
        <InvoiceTable
          invoices={invoices}
          edit={openDialog}
        />
      </div>

      <dialog
        className='invoice-modal'
        ref={dialogRef}
        onClose={() => {
          setDialogContent(false);
          setConfirmDelete(false);
        }}
      >
        {dialogContent && <InvoiceForm
          invoice={target}
          customers={customersOptions}
          error={formError}
          onDelete={() => setConfirmDelete(true)}
          confirmDelete={confirmDelete}
          setConfirmDelete={setConfirmDelete}
          confirm={confirm}
          onCancel={closesDialog}
          onSubmit={submit}
          busy={busy}
        />}
      </dialog>
    </>
  );
}
