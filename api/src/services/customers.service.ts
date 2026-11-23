import prisma from '../prisma.ts';
import type { CustomerOption } from '../types/customersType.ts';

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
