const BUN_NAME = 'Краторная булка N-200i';
const MAIN_NAME = 'Биокотлета из марсианской Магнолии';
const ADD_BUTTON_TEXT = 'Добавить';

describe('Burger constructor page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('ingredients');

    cy.intercept('GET', '**/api/auth/user', {
      fixture: 'user.json'
    }).as('user');

    cy.intercept('POST', '**/api/orders', {
      fixture: 'order.json'
    }).as('order');

    window.localStorage.setItem('refreshToken', 'test');
    cy.setCookie('accessToken', 'test');

    cy.visit('/');
    cy.wait('@ingredients');
  });

  afterEach(() => {
    window.localStorage.clear();
    cy.clearCookies();
  });

  it('adds ingredients to constructor', () => {
    cy.contains(BUN_NAME).parent().contains(ADD_BUTTON_TEXT).click();

    cy.contains(MAIN_NAME).parent().contains(ADD_BUTTON_TEXT).click();

    cy.contains(BUN_NAME).should('exist');
    cy.contains(MAIN_NAME).should('exist');
  });

  it('opens ingredient modal and shows correct ingredient data', () => {
    cy.contains('Соус фирменный Space Sauce').click();

    cy.contains('Детали ингредиента').should('exist');
    cy.contains('Соус фирменный Space Sauce').should('exist');

    cy.get('body').type('{esc}');

    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('creates order and clears constructor', () => {
    cy.contains(BUN_NAME).parent().contains(ADD_BUTTON_TEXT).click();

    cy.contains(MAIN_NAME).parent().contains(ADD_BUTTON_TEXT).click();

    cy.contains('Оформить заказ').click();

    cy.wait('@order');

    cy.contains('12345').should('exist');

    cy.get('body').type('{esc}');

    cy.contains('12345').should('not.exist');

    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });
});
