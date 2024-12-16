import { screen } from '@testing-library/react';

export const title = () => screen.getByRole('heading', { level: 2 });
export const name = () => screen.getByTestId('accountName');
export const currency = () => screen.getByTestId('accountCurrency');
export const balance = () => screen.getByTestId('accountBalance');
export const button = () => screen.getByRole('button');
