describe('тесты е2е для главной страницы и модалки', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    cy.visit('/');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('добавляем ингридиенты в конструктор', () => {
    cy.get(`[data-cy=${'buns'}]`).contains('Добавить').click();
    cy.get('[data-cy=mains]').contains('Добавить').click();
    cy.get('[data-cy=sauces]').contains('Добавить').click();

    cy.get('.constructor-element_pos_top').contains('Краторная булка N-200i (верх)');
    cy.get('.constructor-element').contains('Биокотлета из марсианской Магнолии');
    cy.get('.constructor-element_pos_bottom').contains('Краторная булка N-200i (низ)');

    cy.get('.move_button').as('moveButtons');
    cy.get('@moveButtons').then((buttons) => {
      const moveDownButton = buttons[1];
      moveDownButton.click();
      cy.get('.constructor-element').contains('Соус Spicy-X');
    });
  });

  it('проверка модального окна: отсуствие', () => {
    cy.get('#modals').children().should('have.length', 0);
  });

  it('проверка модального окна открытие', () => {
    cy.contains('Соус фирменный Space Sauce').click();
    cy.get('#modals').children().should('have.length', 2);
    cy.get('#modals').contains('Соус фирменный Space Sauce');
  });

  it('проверка модального окна закрытие по кнопке', () => {
    cy.contains('Соус фирменный Space Sauce').click();
    cy.get('#modals').find('button').click();
    cy.get('#modals').children().should('have.length', 0);
  });

  it('проверка модального окна закрытие по esc', () => {
    cy.contains('Соус фирменный Space Sauce').click();
    cy.get('body').type('{esc}');
    cy.get('#modals').children().should('have.length', 0);
  });

  it('проверка модального окна закрытие по overlay click', () => {
    cy.contains('Соус фирменный Space Sauce').click();
    cy.get('#overlay').click({ force: true });
    cy.get('#modals').children().should('have.length', 0);
  });
});

describe('тесты е2е оформление заказа', () => {

  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    cy.intercept('GET', '/api/auth/login', { fixture: 'user.json' });
    cy.intercept('GET', '/api/orders', { fixture: 'order.json' });
    cy.visit('/');
    cy.setCookie('accessToken', 'accessToken');
    window.localStorage.setItem('refreshToken', 'refreshToken');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('тестируем оформление заказа', () => {

    cy.get(`[data-cy=${'buns'}]`).contains('Добавить').click();
    cy.get('[data-cy=mains]').contains('Добавить').click();
    cy.get('[data-cy=sauces]').contains('Добавить').click();

    cy.contains('Оформить заказ').click();
    cy.get('#modals').children().should('have.length', 2);
    cy.get('body').type('{esc}');
    cy.get('#modals').children().should('have.length', 0);

    cy.get('.text_type_main-default').contains('Выберите булки');
    cy.get('.text_type_main-default').contains('Выберите начинку');
  });

});