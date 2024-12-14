import { configureStore } from '@reduxjs/toolkit';
import accountsReducer from './features/accounts/accountsSlice';

export const makeStore = () => {
  return configureStore({
    reducer: accountsReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
