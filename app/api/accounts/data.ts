import { Currency, Account } from '@/models/AccountsTypes';

export const data: Account[] = [
  {
    id: '1',
    name: 'John Doe',
    currency: Currency.Eur,
    balance: 1000,
  },
  {
    id: '2',
    name: 'Jane Smith',
    currency: Currency.Eur,
    balance: 2000,
  },
];
