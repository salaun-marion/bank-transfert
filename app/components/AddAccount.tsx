'use client';

import { useTranslations } from 'next-intl';
import { accountAdded } from '@/lib/features/accounts/accountsSlice';
import { useAppDispatch } from '@/lib/hooks';
import {
  Account,
  AddAccountFormElements,
  Currency,
} from '@/models/AccountsTypes';
import { nanoid } from '@reduxjs/toolkit';
import React from 'react';

export const AddAccount = () => {
  const t = useTranslations('Account');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<AddAccountFormElements>) => {
    e.preventDefault();

    const { elements } = e.currentTarget;

    const name = elements.accountName.value;
    const currency = elements.accountCurrency.value;
    const balance = elements.accountBalance.value;

    e.currentTarget.reset();

    const newAccount: Account = {
      id: nanoid(),
      name: name,
      currency: currency as Currency,
      balance: Number(balance),
    };
    dispatch(accountAdded(newAccount));
  };

  return (
    <section>
      <h2>{t('hello')}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="accountName">Name</label>
        <input type="text" id="accountName" required />
        <label htmlFor="accountCurrency">Currency</label>
        <select id="accountCurrency" required>
          <option value="€">Eur</option>
          <option value="$">US Dollar</option>
          <option value="¥">Yen</option>
        </select>
        <label htmlFor="accountBalance">Balance</label>
        <input type="number" id="accountBalance" required />

        <button>{t('add')}</button>
      </form>
    </section>
  );
};
