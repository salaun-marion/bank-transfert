import { Conversion } from '@/models/AccountsTypes';

const conversionRates: { [key: string]: { [key: string]: number } } = {
  EUR: { USD: 1.1, JPY: 130 },
  USD: { EUR: 0.91, JPY: 118 },
  JPY: { EUR: 0.0077, USD: 0.0085 },
};

export const converter = ({ currency1, currency2, balance }: Conversion) => {
  if (!conversionRates[currency1] || !conversionRates[currency1][currency2]) {
    throw new Error('Conversion rate not available');
  }

  const convertedBalance = balance * conversionRates[currency1][currency2];
  return convertedBalance;
};
