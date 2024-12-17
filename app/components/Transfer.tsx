'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import {
  accountsTransfer,
  currencyConversion,
} from '@/lib/features/accounts/accountsSlice';
import { Account, EditAccountFormElements } from '@/models/AccountsTypes';
import SlTooltip from '@shoelace-style/shoelace/dist/react/tooltip';

import { useAppDispatch, useAppSelector } from '../../lib/hooks';

export const Transfer: React.FC<{
  accountSelected1: Account | undefined;
  accountSelected2: Account | undefined;
}> = ({ accountSelected1, accountSelected2 }) => {
  const t = useTranslations('Transfer');
  const dispatch = useAppDispatch();

  //fetch accounts
  const account1 = useAppSelector((state) =>
    state.accounts.find((account) => account.name === accountSelected1?.name)
  );

  const account2 = useAppSelector((state) =>
    state.accounts.find((account) => account.name === accountSelected2?.name)
  );
  //case of error
  const isError = useAppSelector((state) => {
    return state.error;
  });

  const onSaveAccountClicked = (
    e: React.FormEvent<EditAccountFormElements>
  ) => {
    e.preventDefault();

    const { elements } = e.currentTarget;
    const balance = Number(elements.accountBalance.value);

    if (account1 && account2) {
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
    }
  };

  return (
    <section className="transfer">
      <h4>{t('title')}</h4>
      <form onSubmit={onSaveAccountClicked}>
        <label htmlFor="accountBalance">{t('balance')}</label>
        <input
          type="number"
          id="accountBalance"
          min="0"
          data-testid="accountBalanceTransfer"
          required
        />{' '}
        {account1 ? account1.currency : ''} <br />
        <SlTooltip
          className="tooltip"
          content={isError ? t(isError) : t('success')}
          placement="right"
          trigger="click"
        >
          <button className="save-button" data-testid="saveButton">
            {t('save')}
          </button>
        </SlTooltip>
      </form>
    </section>
  );
};
