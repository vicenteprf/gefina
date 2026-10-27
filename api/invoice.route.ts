import { Router } from 'express';
import { findAllInvoice, findInvoiceById, insertInvoice, modifyInvoice, removeInvoice } from './invoice.service.ts';
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
  const data = req.body;

  const invoice = await insertInvoice(data);

  if (!invoice) {
    res.status(404).json({ error: { status: 404, message: 'Fatura não encontrada.' } });
  }

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
