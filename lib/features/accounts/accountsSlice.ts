import { Account, Currency, Transfert } from '@/models/AccountsTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Account[] = [
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

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    accountAdded(state, action: PayloadAction<Account>) {
      state.push(action.payload);
    },
    accountUpdated(state, action: PayloadAction<Account>) {
      const { id, name, currency, balance } = action.payload;
      const existingAccount = state.find((account) => account.id === id);
      if (existingAccount) {
        existingAccount.name = name;
        existingAccount.currency = currency;
        existingAccount.balance = balance;
      }
    },
    accountsTransfer(state, action: PayloadAction<Transfert>) {
      const { id1, id2, balance } = action.payload;
      const account1 = state.find((account) => account.id === id1);
      const account2 = state.find((account) => account.id === id2);

      if (account1) {
        account1.name = account1.name;
        account1.currency = account1.currency;
        account1.balance = account1.balance - balance;
      }
      if (account2) {
        account2.name = account2.name;
        account2.currency = account2.currency;
        account2.balance = account2.balance + balance;
      }
    },
  },
});

export const { accountAdded, accountUpdated, accountsTransfer } =
  accountsSlice.actions;

export default accountsSlice.reducer;
