'use client';

import { useTranslations } from 'next-intl';
import { Account } from '@/models/AccountsTypes';
import { useAppDispatch } from '../../lib/hooks';
import { useState, useEffect } from 'react';
import { Transfer } from './Transfer';
import { getAccounts } from '@/lib/features/accounts/accountsSlice';
import '../styles/selectAccount.css';

export const SelectAccount = () => {
  const t = useTranslations('Select Account');
  const dispatch = useAppDispatch();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccountName1, setSelectAccount1] = useState<String>('');
  const [selectedAccountName2, SetSelectAccount2] = useState<String>('');

  useEffect(() => {
    dispatch(getAccounts()).then((result: any) => {
      const payload = result.payload as Account[];

      if (payload) {
        setAccounts(payload);
        setSelectAccount1(payload[0].name);
        SetSelectAccount2(payload[1].name);
      }
    });
  }, [dispatch]);

  //TODO: selection should be done with ID not name
  const accountNamePredicate = (accountName: String) => (account: Account) =>
    account.name === accountName;

  return (
    <section className="select-account container">
      <h2>{t('accounts')}</h2>
      {t('from')}
      <select
        onChange={(e) => setSelectAccount1(e.target.value)}
        value={selectedAccountName1.toString()}
      >
        <option disabled>{t('1staccount')}</option>
        {accounts.map((account: Account) => (
          <option key={Number(account.id)}>{account.name}</option>
        ))}
      </select>
      <br />
      {t('to')}
      <select
        onChange={(e) => SetSelectAccount2(e.target.value)}
        value={selectedAccountName2.toString()}
      >
        <option disabled>{t('2ndaccount')}</option>
        {accounts.map((account: Account) => (
          <option key={Number(account.id)}>{account.name}</option>
        ))}
      </select>
      <Transfer
        accountSelected1={accounts.find(
          accountNamePredicate(selectedAccountName1)
        )}
        accountSelected2={accounts.find(
          accountNamePredicate(selectedAccountName2)
        )}
      />
    </section>
  );
};
