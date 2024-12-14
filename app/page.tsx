import type { Metadata } from 'next';
import { AddAccount } from './components/AddAccount';
import { AccountsList } from './components/AccountList';

export default function IndexPage() {
  return (
    <>
      <AddAccount />
      <AccountsList />
    </>
  );
}

export const metadata: Metadata = {
  title: 'Bank transfer app',
};
