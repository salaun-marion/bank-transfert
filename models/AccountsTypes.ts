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

export interface Transfert {
  id1: String;
  id2: String;
  balance: number;
}

interface AddAccountFormFields extends HTMLFormControlsCollection {
  accountName: HTMLInputElement;
  accountCurrency: HTMLSelectElement;
  accountBalance: HTMLInputElement;
}

interface EditAccountFormFields extends HTMLFormControlsCollection {
  accountName: HTMLInputElement;
  accountCurrency: HTMLSelectElement;
  accountBalance: HTMLInputElement;
}

export interface AddAccountFormElements extends HTMLFormElement {
  readonly elements: AddAccountFormFields;
}

export interface EditAccountFormElements extends HTMLFormElement {
  readonly elements: EditAccountFormFields;
}
