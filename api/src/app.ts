import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import handleError from './middlewares/error.middlewares.ts';
import prisma from './prisma.ts';
import customers from './routes/customers.route.ts';
import dashboard from './routes/dashboard.route.ts';
import invoices from './routes/invoice.route.ts';

const app = express();
app.use(express.json());

const dist = path.join(
  import.meta.dirname,
  '..',
  '..',
  'web',
  'dist',
);

app.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/api/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1;`;

    res.status(200).json({
      server: 'server is runnig.',
      database: 'Database avaliable.',
    });
  } catch (e) {
    console.error(e);

    res.status(500).json({
      status: 'Server is running',
      database: 'unvaliable',
    });
  }
});

app.use('/api/dashboard', dashboard);
app.use('/api/invoices', invoices);
app.use('/api/customers', customers);

app.use(express.static(dist));

app.use((req, res, next) => {
  if (
    req.url.startsWith('/api') ||
    !fs.existsSync(path.join(dist, 'index.html'))
  ) {
    next();
    return;
  }

  res.sendFile(path.join(dist, 'index.html'));
});

app.use((_req, res) => {
  res.status(404).json({
    error: {
      status: 404,
      message: 'Recurso não encontrado.',
    },
  });
});

app.use(handleError);

export default app;
