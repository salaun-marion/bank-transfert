import type { Metadata } from 'next';
import { AddAccount } from './components/AddAccount';
import { SelectAccount } from './components/SelectAccount';
import { EditAccount } from './components/EditAccount';

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
