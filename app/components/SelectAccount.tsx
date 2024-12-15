'use client';

import { Account } from '@/models/AccountsTypes';
import { useAppDispatch } from '../../lib/hooks';
import { useState, useEffect } from 'react';
import { Transfer } from './Transfer';
import { getAccounts } from '@/lib/features/accounts/accountsSlice';

export const SelectAccount = () => {
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
    <section className="accounts-list">
      <h2>Accounts</h2>
      <select
        onChange={(e) => setSelectAccount1(e.target.value)}
        value={selectedAccountName1.toString()}
      >
        <option disabled>Select first account</option>
        {accounts.map((account: Account) => (
          <option key={Number(account.id)}>{account.name}</option>
        ))}
      </select>
      <select
        onChange={(e) => SetSelectAccount2(e.target.value)}
        value={selectedAccountName2.toString()}
      >
        <option disabled>Select second account</option>
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
