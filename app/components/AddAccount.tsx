'use client';

import '../styles/addAccount.css';

import { useTranslations } from 'next-intl';

import { accountAdded } from '@/lib/features/accounts/accountsSlice';
import { useAppDispatch } from '@/lib/hooks';
import {
  Account,
  AddAccountFormElements,
  Currency,
} from '@/models/AccountsTypes';
import { nanoid } from '@reduxjs/toolkit';

export const AddAccount = () => {
  const t = useTranslations('CreateAccount');
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
    <section className="add-account container">
      <h2>{t('create')}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="accountName">{t('name')}</label>
        <input
          data-testid="accountName"
          type="text"
          id="accountName"
          maxLength={30}
          required
        />{' '}
        <br />
        <label htmlFor="accountCurrency">{t('currency')}</label>
        <select data-testid="accountCurrency" id="accountCurrency" required>
          <option value="EUR">{t('euro')}</option>
          <option value="USD">{t('US dollar')}</option>
          <option value="JPY">{t('yen')}</option>
        </select>{' '}
        <br />
        <label data-testid="accountBalance" htmlFor="accountBalance">
          {t('balance')}
        </label>
        <input type="number" id="accountBalance" required /> <br />
        <button data-testid="addButton" className="add-button">
          {t('add')}
        </button>
      </form>
    </section>
  );
};
