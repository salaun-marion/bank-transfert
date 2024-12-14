'use client';

import React from 'react';

import { useAppSelector, useAppDispatch } from '../../lib/hooks';
import { accountUpdated } from '@/lib/features/accounts/accountsSlice';
import { Account, EditAccountFormElements } from '@/models/AccountsTypes';

export const EditAccount: React.FC<{
  accountSelected: Account | undefined;
}> = ({ accountSelected }) => {
  const account = useAppSelector((state) =>
    state.find((account) => account.name === accountSelected?.name)
  );

  const dispatch = useAppDispatch();

  if (!account) {
    return (
      <section>
        <h2>Account not found!</h2>
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

    if (balance) {
      dispatch(
        accountUpdated({
          id: account.id,
          name: account.name,
          currency: account.currency,
          balance,
        })
      );
    }
  };

  return (
    <section>
      <h2>Edit Account</h2>

      <form onSubmit={onSaveAccountClicked}>
        <label htmlFor="accountBalance">Balance</label>
        <input type="number" id="accountBalance" required />

        <button>Save</button>
      </form>
    </section>
  );
};
