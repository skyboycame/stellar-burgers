describe('constructor-page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '**/api/orders/all', { fixture: 'orders' }).as(
      'getOrders'
    );

    cy.visit('/');
    cy.wait('@getIngredients', { timeout: 10000 });
    cy.wait('@getOrders');
  });

  it(
    'получение ингредиентов/перехват запроса',
    { defaultCommandTimeout: 10000 },
    () => {
      cy.contains('Краторная булка N-200i', { timeout: 25000 }).should(
        'be.visible'
      );
      cy.contains('Мясо бессмертных моллюсков Protostomia', {
        timeout: 15000
      }).should('exist');
    }
  );

  it(
    'добавление ингредиентов в конструктор',
    { defaultCommandTimeout: 35000 },
    () => {
      cy.contains('Краторная булка N-200i', { timeout: 25000 })
        .closest('[data-testid="ingredient-card"]', { timeout: 15000 })
        .find('button', { timeout: 25000 })
        .click();
      cy.contains('Выберите булки').should('not.exist');
      cy.get('[data-testid="bun-container"]')
        .contains('Краторная булка N-200i')
        .should('exist');
      cy.contains('Начинки').click();
      cy.contains('Биокотлета из марсианской Магнолии')
        .closest('[data-testid="ingredient-card"]', { timeout: 15000 })
        .find('button', { timeout: 25000 })
        .click();
      cy.contains('Выберите начинку').should('not.exist');
      cy.get('[data-testid="burger-container"]')
        .contains('Биокотлета из марсианской Магнолии')
        .should('exist');
    }
  );

  it(
    'открытие/закрытие модального окна',
    { defaultCommandTimeout: 35000 },
    () => {
      cy.contains('Краторная булка N-200i', { timeout: 25000 })
        .closest('[data-testid="ingredient-card"]', { timeout: 15000 })
        .click();

      cy.get('[data-testid="modal-content"]').should('exist').and('be.visible');

      cy.get('[data-testid="modal-content"]')
        .contains('Краторная булка N-200i')
        .should('exist');

      cy.get('[data-testid="close-button"]').click();
      cy.get('[data-testid="modal-content"]').should('not.exist');

      cy.contains('Краторная булка N-200i', { timeout: 25000 })
        .closest('[data-testid="ingredient-card"]', { timeout: 15000 })
        .click();

      cy.get('[data-testid="modal-content"]').should('exist').and('be.visible');
      cy.get('[data-testid="overlay"]').click({ force: true });
      cy.get('[data-testid="modal-content"]').should('not.exist');
    }
  );

  it('проверка создания заказа', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'fakeRefreshToken');
      cy.setCookie('accessToken', 'fakeAccessToken');
    });
    cy.intercept('GET', '**/auth/user', { fixture: 'user' }).as('getUser');
    cy.intercept('POST', '**/api/orders', { fixture: 'orderResponse' }).as(
      'getOrderResponse'
    );
    cy.contains('Краторная булка N-200i', { timeout: 25000 })
      .closest('[data-testid="ingredient-card"]', { timeout: 15000 })
      .find('button', { timeout: 25000 })
      .click();
    cy.contains('Выберите булки').should('not.exist');
    cy.get('[data-testid="bun-container"]')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.contains('Начинки').click();
    cy.contains('Биокотлета из марсианской Магнолии')
      .closest('[data-testid="ingredient-card"]', { timeout: 15000 })
      .find('button', { timeout: 25000 })
      .click();
    cy.contains('Выберите начинку').should('not.exist');
    cy.get('[data-testid="burger-container"]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
    cy.contains('Оформить заказ').click();
    cy.wait('@getOrderResponse', { timeout: 10000 });
    cy.wait('@getUser', { timeout: 10000 });
    cy.get('[data-testid="modal-content"]').should('exist').and('be.visible');
    cy.get('[data-testid="order-number"]')
      .should('be.visible')
      .and('have.text', '101265');

    cy.get('[data-testid="close-button"]').click();
    cy.get('[data-testid="modal-content"]').should('not.exist');
    cy.contains('Выберите булки').should('exist');
    cy.contains('Начинки').should('exist');
    cy.window().then((win) => {
      win.localStorage.removeItem('refreshToken');
      cy.clearCookie('accessToken');
    });
  });
});
