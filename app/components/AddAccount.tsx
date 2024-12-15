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
import '../styles/addAccount.css';

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
        <input type="text" id="accountName" required /> <br />
        <label htmlFor="accountCurrency">{t('currency')}</label>
        <select id="accountCurrency" required>
          <option value="€">{t('euro')}</option>
          <option value="$">{t('US dollar')}</option>
          <option value="¥">{t('yen')}</option>
        </select>{' '}
        <br />
        <label htmlFor="accountBalance">{t('balance')}</label>
        <input type="number" id="accountBalance" required /> <br />
        <button className="add-button">{t('add')}</button>
      </form>
    </section>
  );
};
