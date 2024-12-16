import { useTranslations } from 'next-intl';

import { GET, POST } from '@/app/api/accounts/server';
import { Account, Conversion, Transfert } from '@/models/AccountsTypes';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AccountsState {
  accounts: Account[];
  balance: Number;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AccountsState = {
  accounts: [],
  balance: 0,
  status: 'idle',
  error: null,
};

export const getAccounts = createAsyncThunk('/getAccounts', async () => {
  const response = await GET();
  return response.data;
});

export const currencyConversion = createAsyncThunk(
  '/currencyConversion',
  async ({ currency1, currency2, balance }: Conversion) => {
    const response = await POST({ currency1, currency2, balance });
    return response.balance;
  }
);

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: (create) => ({
    accountAdded: create.reducer((state, action: PayloadAction<Account>) => {
      action.type = 'accountAdded';
      state.accounts.push(action.payload);
    }),
    accountsTransfer: create.reducer(
      (state, action: PayloadAction<Transfert>) => {
        action.type = 'accountsTransfer';
        const { id1, id2, balance1, balance2 } = action.payload;
        const account1 = state.accounts.find((account) => account.id === id1);
        const account2 = state.accounts.find((account) => account.id === id2);

        console.log('account1', account1!.id);
        console.log('account2', account2!.id);

        if (account1 && account1.balance < balance1) {
          state.error = 'not enough money';
        } else if (account1!.id === account2!.id) {
          state.error = 'same';
        } else if (account1 && account2) {
          state.error = null;
          account1.balance -= balance1;
          account2.balance += balance2;
        }
      }
    ),
  }),
  extraReducers: (builder) => {
    builder.addCase(getAccounts.pending, (state, action) => {
      action.type = 'getAccounts';
      state.status = 'pending';
    }),
      builder.addCase(getAccounts.fulfilled, (state, action) => {
        action.type = 'getAccounts';
        state.status = 'idle';
        state.accounts = action.payload;
      }),
      builder.addCase(currencyConversion.fulfilled, (state, action) => {
        action.type = 'currencyConversion';
        state.status = 'idle';
        state.balance = action.payload;
      });
  },
});

export const { accountAdded, accountsTransfer } = accountsSlice.actions;

export default accountsSlice.reducer;
