import '../styles/globals.css';

import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import { StoreProvider } from './StoreProvider';

import type { ReactNode } from 'react';
interface Props {
  readonly children: ReactNode;
}

export default async function RootLayout({ children }: Props) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <StoreProvider>
      <html lang={locale}>
        <body>
          <NextIntlClientProvider messages={messages}>
            <section>
              <header></header>
              <main>{children}</main>
            </section>
          </NextIntlClientProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
