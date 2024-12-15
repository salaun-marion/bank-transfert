'use client';

import React from 'react';

import { useAppSelector, useAppDispatch } from '../../lib/hooks';
import { accountsTransfer } from '@/lib/features/accounts/accountsSlice';
import { Account, EditAccountFormElements } from '@/models/AccountsTypes';

export const Transfer: React.FC<{
  accountSelected1: Account | undefined;
  accountSelected2: Account | undefined;
}> = ({ accountSelected1, accountSelected2 }) => {
  const dispatch = useAppDispatch();

  const account1 = useAppSelector((state) => {
    return state.accounts.find(
      (account) => account.name === accountSelected1?.name
    );
  });
  const account2 = useAppSelector((state) =>
    state.accounts.find((account) => account.name === accountSelected2?.name)
  );

  if (!account1 || !account2) {
    return (
      <section>
        <h2>Transfert cannot happen!</h2>
      </section>
    );
  }

  const onSaveAccountClicked = (
    e: React.FormEvent<EditAccountFormElements>
  ) => {
    // Prevent server submission
    e.preventDefault();

    const { elements } = e.currentTarget;
    const balance = Number(elements.accountBalance.value);

    if (account1.balance >= balance) {
      dispatch(
        accountsTransfer({
          id1: account1.id,
          id2: account2.id,
          balance,
        })
      );
    } else {
      //TODO : improve the alert
      alert('Not enough money from the first account.');
    }
  };

  return (
    <section>
      <h2>Transfert</h2>
      <form onSubmit={onSaveAccountClicked}>
        <label htmlFor="accountBalance">Balance</label>
        <input type="number" id="accountBalance" required />
        <button>Save</button>
      </form>
    </section>
  );
};
