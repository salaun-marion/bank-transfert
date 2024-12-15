import { data } from './data';

export async function GET() {
  console.log('(GET) --- Fetching the data from the back-end');

  await new Promise((resolve) => setTimeout(resolve, 500));

  return { data: data };
}

//TODO: do the same for POST(add a new Account) and PATCH(update account balance)
