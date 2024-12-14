'use client';

import { Account } from '@/models/AccountsTypes';
import { useAppSelector } from '../../lib/hooks';
import { useState } from 'react';
import { EditAccount } from './EditAccount';

export const SelectAccount = () => {
  const [selectedAccountName, setSelectedAccountName] = useState<string>('');

  const accounts = useAppSelector((state: Account[]) => {
    return state;
  });
  console.log('selectedAccountName', selectedAccountName);
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAccountName(event.target.value);
  };

  //TODO: selection should be done with ID not name
  const selectAccount: Account | undefined = accounts.find(
    (account: Account) => account.name === selectedAccountName
  );

  console.log('selectAccount', selectAccount);

  return (
    <section className="accounts-list">
      <h2>Accounts</h2>
      <select onChange={handleSelectChange} value={selectedAccountName ?? ''}>
        <option value="" disabled>
          Select an account
        </option>
        {accounts.map((account: Account) => (
          <option key={Number(account.id)}>{account.name}</option>
        ))}
      </select>
      <EditAccount accountSelected={selectAccount} />
    </section>
  );
};
