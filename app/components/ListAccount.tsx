'use client';

import '../styles/listAccount.css';

import { Account } from '@/models/AccountsTypes';

import { useAppSelector } from '../../lib/hooks';
import { Loading } from './Loading';

export const AccountsList = () => {
  const accounts = useAppSelector((state) => {
    return state.accounts;
  });
  const isLoading = useAppSelector((state) => {
    return state.status;
  });

  const renderedAccounts = accounts.map((account: Account) => (
    <article className="account" key={Number(account.id)}>
      <h3>{account.name}</h3>
      <p className="account-balance">
        {account.balance.toFixed(2)} {account.currency}
      </p>
    </article>
  ));

  return (
    <>
      <section className="container list-account">
        <h2>Accounts</h2>
        {isLoading === 'pending' ? <Loading /> : renderedAccounts}
      </section>
    </>
  );
};
