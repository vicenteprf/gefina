import type { CustomerOption } from './customersType.ts';
import prisma from './prisma.ts';

export async function findCustomersOptions(): Promise<
  CustomerOption[]
> {
  return await prisma.customer.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
    orderBy: { name: 'asc' },
  });
}
