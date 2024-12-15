import type { Metadata } from 'next';
import { AddAccount } from '../components/AddAccount';
import { SelectAccount } from '../components/SelectAccount';
import { getTranslations } from 'next-intl/server';

export default function IndexPage() {
  return (
    <>
      <AddAccount />
      <SelectAccount />
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
