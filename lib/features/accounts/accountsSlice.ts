import { Account, Currency } from '@/models/AccountsTypes';
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
  },
});

export const { accountAdded } = accountsSlice.actions;

export default accountsSlice.reducer;
