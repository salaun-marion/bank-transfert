'use client';

import { Account } from '@/models/AccountsTypes';
import { useAppSelector } from '../../lib/hooks';
import { useState } from 'react';
import { EditAccount } from './EditAccount';

export const SelectAccount = () => {
  const accounts = useAppSelector((state: Account[]) => {
    return state;
  });

  const [selectedAccountName1, setSelectedAccountName1] = useState<String>(
    accounts[0].name
  );
  const [selectedAccountName2, setSelectedAccountName2] = useState<String>(
    accounts[1].name
  );

  const handleSelectChange1 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAccountName1(event.target.value);
  };
  const handleSelectChange2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAccountName2(event.target.value);
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
      <select
        onChange={handleSelectChange1}
        value={selectedAccountName1.toString()}
      >
        <option disabled>Select first account</option>
        {accounts.map((account: Account) => (
          <option key={Number(account.id)}>{account.name}</option>
        ))}
      </select>
      <select
        onChange={handleSelectChange2}
        value={selectedAccountName2.toString()}
      >
        <option disabled>Select second account</option>
        {accounts.map((account: Account) => (
          <option key={Number(account.id)}>{account.name}</option>
        ))}
      </select>
      <EditAccount
        accountSelected1={selectAccount1}
        accountSelected2={selectAccount2}
      />
    </section>
  );
};
