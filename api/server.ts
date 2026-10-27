import express from 'express';
import path from 'node:path';
import pool from './database.ts';
import invoices from './invoice.route.ts';
import dashboard from './dashboard.route.ts';
import handleError  from './error.middlewares.ts';

const app = express();
app.use(express.json());

const dist = path.join(import.meta.dirname, '..', 'web', 'dist');

app.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/api/health', async (_req, res) => {
  try {
    const connect = await pool.query('SELECT datname FROM pg_database WHERE oid = 5;');

    res.status(200).json({
      server: 'server is runnig.',
      database: connect.rows[0].datname
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ status: 'Server is running', database: 'unvaliable' })
  }
});

app.use('/api/dashboard', dashboard);
app.use('/api/invoices', invoices);

app.use(express.static(dist));

app.use((req, res, next) => {
  if (req.url.startsWith('/api')) {
    next();
    return;
  }

  res.sendFile(path.join(dist, 'index.html'));
})

app.use((_req, res) => {
  res.status(404).json({ message: 'Recurso não encontrado.' });
});

app.use(handleError);

app.listen(Number(process.env.PORT) || 3000);
