import { NextIntlClientProvider } from 'next-intl';

import { render } from '@testing-library/react';

import { StoreProvider } from '../app/[locale]/StoreProvider';
import { AddAccount } from '../app/components/cards/AddAccount';
import { balance, currency, name, title } from './constants';
import messages from '../messages/en.json';

describe('Opinion Form', () => {
  it('should render', () => {
    render(
      <StoreProvider>
        <NextIntlClientProvider locale="en" messages={messages}>
          <AddAccount />
        </NextIntlClientProvider>
      </StoreProvider>
    );

    expect(title()).toBeInTheDocument;
    expect(name()).toBeInTheDocument;
    expect(currency()).toBeInTheDocument;
    expect(balance()).toBeInTheDocument;
  });

  it('should check that we cannot write more than 30 characters for name', async () => {
    render(
      <StoreProvider>
        <NextIntlClientProvider locale="en" messages={messages}>
          <AddAccount />
        </NextIntlClientProvider>
      </StoreProvider>
    );

    expect(name()).toHaveProperty('maxLength', 30);
  });
});
