export const getNameInput = () => cy.get('[data-testid="accountName"]');
export const getCurrencyInput = () => cy.get('[data-testid="accountCurrency"]');
export const getBalanceInput = () => cy.get('[data-testid="accountBalance"]');

export const addButton = () => cy.get('[data-testid="addButton"]');

export const getAccountFrom = () => cy.get('[data-testid="selectAccount0"]');
export const getAccountTo = () => cy.get('[data-testid="selectAccount1"]');
export const getBalanceTransferInput = () =>
  cy.get('[data-testid="accountBalanceTransfer"]');
export const saveButton = () => cy.get('[data-testid="saveButton"]');

export const getBalanceAccountByName = (name: String) =>
  cy.get(`[data-testid="${name}balance"]`);
