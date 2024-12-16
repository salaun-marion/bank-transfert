export enum Currency {
  EUR = 'EUR',
  USD = 'USD',
  JPY = 'JPY',
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
  balance1: number;
  balance2: number;
}

export interface Conversion {
  currency1: Currency;
  currency2: Currency;
  balance: number;
}

//TODO remove interface for Form from here -> put them back in their component
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
