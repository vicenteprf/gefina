import pool from './database.ts';
import type { CustomerOption } from './customersType.ts';

export async function findCustomersOptions(): Promise<CustomerOption[]> {
    const connect = await pool.query<CustomerOption>('SELECT id, name, email FROM customers ORDER BY name;');

    return connect.rows
}