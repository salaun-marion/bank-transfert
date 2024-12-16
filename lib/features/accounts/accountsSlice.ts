// import { RootState } from '@/lib/store';
import { Account, Transfert } from '@/models/AccountsTypes';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GET } from '@/app/api/accounts/server';

interface AccountsState {
  accounts: Account[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AccountsState = {
  accounts: [],
  status: 'idle',
  error: null,
};

export const getAccounts = createAsyncThunk('/getAccounts', async () => {
  const response = await GET();
  return response.data;
});

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
    });
  },
});

export const { accountAdded, accountsTransfer } = accountsSlice.actions;

export default accountsSlice.reducer;
