'use client';

import React from 'react';

import { useAppSelector, useAppDispatch } from '../../lib/hooks';
import {
  accountsTransfer,
  currencyConversion,
} from '@/lib/features/accounts/accountsSlice';
import { Account, EditAccountFormElements } from '@/models/AccountsTypes';
import { useTranslations } from 'next-intl';

export const Transfer: React.FC<{
  accountSelected1: Account | undefined;
  accountSelected2: Account | undefined;
}> = ({ accountSelected1, accountSelected2 }) => {
  const t = useTranslations('Transfer');
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
        <h2>{t('loading')}</h2>
      </section>
    );
  }
  if (account1 === account2) {
    return (
      <section>
        <h2>{t('same')}</h2>
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
        currencyConversion({
          currency1: account1.currency,
          currency2: account2.currency,
          balance,
        })
      ).then((result: any) => {
        dispatch(
          accountsTransfer({
            id1: account1.id,
            id2: account2.id,
            balance1: balance,
            balance2: result.payload,
          })
        );
      });
    } else {
      //TODO : improve the alert
      alert(t('not enough money'));
    }
  };

  return (
    <section className="transfer">
      <h4>{t('title')}</h4>
      <form onSubmit={onSaveAccountClicked}>
        <label htmlFor="accountBalance">{t('balance')}</label>
        <input type="number" id="accountBalance" min="0" required />{' '}
        {account1.currency} <br />
        <button className="save-button">{t('save')}</button>
      </form>
    </section>
  );
};
