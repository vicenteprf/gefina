import { Router } from 'express';
import {
  findAllInvoice,
  findInvoiceById,
  insertInvoice,
  modifyInvoice,
  removeInvoice
} from './invoice.service.ts';
import { invoiceSchema, toFieldErrors } from './invoice.schema.ts';
import parseId from './utils.ts';

const router = Router();

router.get('/', async (_req, res) => {
  const invoices = await findAllInvoice();

  res.status(200).json(invoices);
});

router.get('/:id', async (req, res) => {
  const id = parseId(req.params.id);

  if (!id) {
    res.status(400).json({
      error: {
        status: 400,
        message: 'Identificador inválido.'
      }
    })

    return;
  }

  const invoice = await findInvoiceById(id);

  if (!invoice) res.status(404).json({ error: { status: 404, message: 'Fatura não encontrada.' } });

  res.status(200).json(invoice);
});

router.post('/', async (req, res) => {
  const result = invoiceSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: {
        status: 400,
        message: 'Dados inválidos',
        fields: toFieldErrors(result.error)
      }
    })
  }

  const invoice = await insertInvoice(result.data);


  res.status(201).json(invoice);
});

router.put('/:id', async (req, res) => {
  const id = parseId(req.params.id);

  if (!id) {
    res.status(400).json({
      error: {
        status: 400,
        message: 'Identificador inválido.'
      }
    })

    return;
  }

  const data = req.body;

  const invoice = await modifyInvoice(id, data);

  if (!invoice) {
    res.status(404).json({ error: { status: 404, message: 'Fatura não encontrada.' } })
  }

  res.status(200).json(invoice);
})

router.delete('/:id', async (req, res) => {
  const id = parseId(req.params.id);

  if (!id) {
    res.status(400).json({
      error: {
        status: 400,
        message: 'Identificador inválido.'
      }
    })

    return;
  }

  const deleted = await removeInvoice(id);

  if (!deleted) {
    res.status(404).json({
      error: {
        status: 404,
        message: 'Fatura não encontrada.'
      }
    })
  }

  res.status(204).end();
})

export default router;
