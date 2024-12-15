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

  const handleSelect1 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectAccount1(event.target.value);
  };
  const handleSelect2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    SetSelectAccount2(event.target.value);
  };

  //TODO: selection should be done with ID not name
  const selectAccount1: Account | undefined = accounts.find(
    (account: Account) => account.name === selectedAccountName1
  );
  const selectAccount2: Account | undefined = accounts.find(
    (account: Account) => account.name === selectedAccountName2
  );

  return (
    <section className="accounts-list">
      <h2>Accounts</h2>
      <select onChange={handleSelect1} value={selectedAccountName1.toString()}>
        <option disabled>Select first account</option>
        {accounts.map((account: Account) => (
          <option key={Number(account.id)}>{account.name}</option>
        ))}
      </select>
      <select onChange={handleSelect2} value={selectedAccountName2.toString()}>
        <option disabled>Select second account</option>
        {accounts.map((account: Account) => (
          <option key={Number(account.id)}>{account.name}</option>
        ))}
      </select>
      <Transfer
        accountSelected1={selectAccount1}
        accountSelected2={selectAccount2}
      />
    </section>
  );
};
