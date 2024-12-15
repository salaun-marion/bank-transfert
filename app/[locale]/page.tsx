import type { Metadata } from 'next';
import { AddAccount } from '../components/AddAccount';
import { SelectAccount } from '../components/SelectAccount';
import { getTranslations } from 'next-intl/server';

export default function IndexPage() {
  return (
    <div className="global-container">
      <AddAccount />
      <SelectAccount />
    </div>
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
