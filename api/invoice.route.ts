import { Router } from 'express';
import {findAllInvoice, findInvoiceById} from './invoice.service.ts';


const router = Router();

router.get('/', async (_req, res) => {
  const invoices = await findAllInvoice();

  res.status(200).json(invoices);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const invoice = await findInvoiceById(id);

  if(!invoice) res.status(404).json({error: {status: 404, message: 'Fatura não encontrada.'}});

  res.status(200).json(invoice);
});

export default router;
