import express from 'express';
import invoices from './invoice.route.ts';

const app = express();

app.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/invoices', invoices);

app.use((_req, res) => {
  res.status(404).json({ message: 'Recurso não encontrado.' });
});

app.listen(3000);
