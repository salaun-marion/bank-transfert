import { Currency, Account } from '@/models/AccountsTypes';

export const data: Account[] = [
  {
    id: '1',
    name: 'John Doe',
    currency: Currency.EUR,
    balance: 1000,
  },
  {
    id: '2',
    name: 'Jane Smith',
    currency: Currency.USD,
    balance: 2000,
  },
];
