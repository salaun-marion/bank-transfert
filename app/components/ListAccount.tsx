'use client';
import { Account } from '@/models/AccountsTypes';
import { useAppSelector } from '../../lib/hooks';
import '../styles/listAccount.css';

export const AccountsList = () => {
  const accounts = useAppSelector((state) => {
    return state.accounts;
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
    <section className="container list-account">
      <h2>Accounts</h2>
      {renderedAccounts}
    </section>
  );
};
