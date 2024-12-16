import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { AddAccount } from '../components/AddAccount';
import { SelectAccount } from '../components/SelectAccount';
import Header from '../components/Header';
import { AccountsList } from '../components/ListAccount';

export default function IndexPage() {
  return (
    <>
      <Header />
      <div className="global-container">
        <AddAccount />
        <SelectAccount />
        <AccountsList />
      </div>
    </>
  );
}

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
  };
}
