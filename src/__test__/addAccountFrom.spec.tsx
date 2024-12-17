import { NextIntlClientProvider } from 'next-intl';

import { render } from '@testing-library/react';

import { StoreProvider } from '../app/[locale]/StoreProvider';
import { AddAccount } from '../app/components/cards/AddAccount';
import { balance, currency, name, title } from './constants';

describe('Opinion Form', () => {
  jest.mock('next-intl', () => ({
    useTranslations: () => ({ t: (key: any) => key }),
  }));

  it('should render', () => {
    render(
      <StoreProvider>
        <NextIntlClientProvider locale="en">
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
        <NextIntlClientProvider locale="en">
          <AddAccount />
        </NextIntlClientProvider>
      </StoreProvider>
    );

    expect(name()).toHaveProperty('maxLength', 30);
  });
});