import type { Metadata } from 'next';
import { AddAccount } from './components/AddAccount';
import { SelectAccount } from './components/SelectAccount';
import { Transfer } from './components/Transfer';

export default function IndexPage() {
  return (
    <>
      <AddAccount />
      <SelectAccount />
    </>
  );
}

export const metadata: Metadata = {
  title: 'Bank transfer app',
};
