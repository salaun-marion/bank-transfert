import {
  getAccountFrom,
  getAccountTo,
  getBalanceAccountByName,
  getBalanceTransferInput,
  saveButton,
} from '@/cypress/selectors/selectors';

describe('Transfer', () => {
  const john = 'John Doe';
  const jane = 'Jane Smith';

  beforeEach(() => {
    cy.visit('/');
  });

  it('Should select two different accounts and execute the balance transfer', () => {
    getAccountFrom().select(john);
    getAccountTo().select(jane);
    getBalanceTransferInput().type('100');

    saveButton().click();

    getBalanceAccountByName(john).should('contain', '900.00');
    getBalanceAccountByName(jane).should('contain', '2110.00');
  });

  // Here the test example is a bit hard-coded, might be improved
  //
  // Ideally here if I will have more time, I will have test the followings :
  // -  not enough money on the account
  // -  same account for transfer
  // -  same currency transfer
  //
  // I will have also included the tooltip message checking in tests
  // and testing language switch
});
