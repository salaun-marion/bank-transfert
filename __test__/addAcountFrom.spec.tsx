import { render } from '@testing-library/react';
import { AddAccount } from '../app/components/cards/AddAccount';
import { title, name, currency, balance } from './constants';
import { NextIntlClientProvider } from 'next-intl';
import { StoreProvider } from '@/app/[locale]/StoreProvider';

describe('Opinion Form', () => {
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
