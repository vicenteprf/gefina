import {
    describe,
    it,
    expect
} from 'vitest'
import supertest from 'supertest';
import app from './app.ts';

const req = supertest(app);

describe(
    'rotas de fatura',
    () => {
        it(
            'devolve a relação de faturas',
            async () => {
                const res = await req.get('/api/invoices');

                expect(res.status).toBe(200);
                expect(Array.isArray(res.body)).toBe(true);
            }
        );
    }
)