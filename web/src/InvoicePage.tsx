import { useEffect, useRef, useState } from 'react';
import type { CustomerOption } from './customerType.ts';
import InvoiceForm from './InvoiceForm.tsx';
import InvoiceTable from './InvoiceTable.tsx';
import {
  createInvoice,
  deleteInvoice,
  getAllInvoices,
  updateInvoice,
} from './invoiceApi.ts';
import type {
  Invoice,
  InvoiceFieldErrors,
  InvoiceInput,
} from './invoiceType.ts';

export default function InvoicePage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [customersOptions, setCustomersOptions] = useState<
    CustomerOption[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<InvoiceFieldErrors>(
    {},
  );
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [dialogContent, setDialogContent] = useState(false);
  const [target, setTarget] = useState<Invoice | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null);

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

        if (!response.ok)
          throw new Error('Falha ao buscar opções de clientes.');

        const datas = await response.json();

        setCustomersOptions(datas);
      } catch (e) {
        if (e instanceof Error) setError(e.message);
      }
    }

    getCustomersOptions();
  }, []);

  function openDialog(invoice: Invoice | null) {
    setTarget(invoice);
    setFormError(null);
    setDialogContent(true);

    dialogRef.current?.showModal();
  }

  function closesDialog() {
    setFormError(null);

    dialogRef.current?.close();
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
        const failure = await createInvoice(datas);

        if (failure) return setFieldErrors(failure.fields);
      } else {
        await updateInvoice(target.id, datas);
      }
      closesDialog();
      await refresh();
    } catch (e) {
      if (e instanceof Error) setFormError(e.message);
    } finally {
      setBusy(false);
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

  if (loading) return <p className='text-sm text-text-muted'>carregando...</p>;

  if (error) return <p className='text-overdue'>{error}</p>;

  return (
    <>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Faturas</h1>
        <button
          className="bg-primary px-4 py-2 rounded-control cursor-pointer"
          type="button"
          onClick={() => openDialog(null)}
        >
          Nova fatura
        </button>
      </header>

      <div className="p-4 bg-surface border border-border rounded-surface">
        <InvoiceTable invoices={invoices} edit={openDialog} />
      </div>

      <dialog
        className='m-auto w-xl bg-surface backdrop:bg-background-brackdrop backdrop:backdrop-blur-xs border border-border text-text p-6 rounded-dialog focus-visible:outline-2 focus-visible:outline-primary'
        ref={dialogRef}
        onClose={() => {
          setDialogContent(false);
          setConfirmDelete(false);
          setFieldErrors({});
        }}
      >
        {dialogContent && (
          <InvoiceForm
            invoice={target}
            customers={customersOptions}
            error={formError}
            fieldErrors={fieldErrors}
            onDelete={() => setConfirmDelete(true)}
            confirmDelete={confirmDelete}
            setConfirmDelete={setConfirmDelete}
            confirm={confirm}
            onCancel={closesDialog}
            onSubmit={submit}
            busy={busy}
          />
        )}
      </dialog>
    </>
  );
}
