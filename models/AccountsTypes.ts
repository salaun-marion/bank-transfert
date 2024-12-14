export enum Currency {
  Eur = '€',
  USdollar = '$',
  Yen = '¥',
}

export interface Account {
  id: String;
  name: String;
  currency: Currency;
  balance: number;
}

interface AddAccountFormFields extends HTMLFormControlsCollection {
  accountName: HTMLInputElement;
  accountCurrency: HTMLSelectElement;
  accountBalance: HTMLInputElement;
}

export interface AddAccountFormElements extends HTMLFormElement {
  readonly elements: AddAccountFormFields;
}
