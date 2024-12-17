import { dataSeed } from '@/cypress/fixtures/dataSeed';
import {
  addButton,
  getBalanceInput,
  getCurrencyInput,
  getNameInput,
} from '@/cypress/selectors/selectors';

describe('Add Account', () => {
  beforeEach(async () => {
    cy.visit('/');
  });

  it('Should add an Account to the list', () => {
    getNameInput().type(dataSeed[0].name);
    getCurrencyInput().select(dataSeed[0].currency);
    getBalanceInput().type(dataSeed[0].balance.toString());

    addButton().click();

    cy.get('h3').should('contain', dataSeed[0].name);
  });
});
