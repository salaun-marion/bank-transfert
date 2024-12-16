import { Conversion } from '@/models/AccountsTypes';
import { data } from './data';
import { converter } from '../converter/converter';

export async function GET() {
  console.log('(GET) --- Fetching the data from the back-end');

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { data: data };
}

export async function POST(req: Conversion) {
  console.log('(POST) --- Ask the back-end for the conversion');

  const convertedBalance = converter({
    currency1: req.currency1,
    currency2: req.currency2,
    balance: req.balance,
  });
  await new Promise((resolve) => setTimeout(resolve, 100));

  return { balance: convertedBalance };
}

//TODO: do the same for POST(add a new Account) and PATCH(update account balance)
