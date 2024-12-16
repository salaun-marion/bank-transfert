// import { RootState } from '@/lib/store';
import {
  Account,
  Conversion,
  Currency,
  Transfert,
} from '@/models/AccountsTypes';
import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
} from '@reduxjs/toolkit';
import { GET, POST } from '@/app/api/accounts/server';
import { useAppDispatch } from '@/lib/hooks';

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
        const { id1, id2, balance } = action.payload;
        const account1 = state.accounts.find((account) => account.id === id1);
        const account2 = state.accounts.find((account) => account.id === id2);

        if (account1 && account2) {
          account1.balance -= balance;
          account2.balance += balance;
        }
      }
    ),
  }),
  extraReducers: (builder) => {
    builder.addCase(getAccounts.fulfilled, (state, action) => {
      action.type = 'getAccounts';
      state.accounts = action.payload;
    }),
      builder.addCase(currencyConversion.fulfilled, (state, action) => {
        action.type = 'currencyConversion';
        state.balance = action.payload;
      });
  },
});

export const { accountAdded, accountsTransfer } = accountsSlice.actions;

export default accountsSlice.reducer;
