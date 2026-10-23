import { Router } from 'express';
import { findAllInvoice, findInvoiceById, insertInvoice, modifyInvoice, removeInvoice } from './invoice.service.ts';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const invoices = await findAllInvoice();

    res.status(200).json(invoices);
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: { message: { status: 500, message: 'Não foi possível carregar as faturas.' } } })
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const invoice = await findInvoiceById(id);

    if (!invoice) res.status(404).json({ error: { status: 404, message: 'Fatura não encontrada.' } });

    res.status(200).json(invoice);
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: { status: 500, message: 'Não foi possível carregar as faturas.' } })
  }
});

router.post('/', async (req, res) => {
  try {
    const data = req.body;

    const invoice = await insertInvoice(data);

    if (!invoice) {
      res.status(404).json({ error: { status: 404, message: 'Fatura não encontrada.' } });
    }

    res.status(201).json(invoice);
  } catch (e) {
    console.error(e);

    res.status(500).json({ error: { status: 500, message: 'Não foi possível inserir fatura.' } });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;

    const invoice = await modifyInvoice(id, data);

    if (!invoice) {
      res.status(404).json({ error: { status: 404, message: 'Fatura não encontrada.' } })
    }

    res.status(200).json(invoice);
  } catch (e) {
    console.error(e);

    res.status(500).json({ error: { status: 500, message: 'Não foi possível atualizar fatura.' } });

  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
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
  } catch (e) {
    console.error(e);

    res.status(500).json({ error: { status: 500, message: 'Não foi possível remover fatura.' } });
  }
})

export default router;
