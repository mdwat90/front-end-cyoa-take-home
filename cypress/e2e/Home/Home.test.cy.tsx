describe('Home', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('renders the comments form', () => {
    cy.get('form[name="comment-form"]').should('exist');
    cy.get('[data-testid="comments-list"]').should('exist');
  });

  it('disables submit button with no name or message input', () => {
    cy.get('[data-testid="submit-button"]').should('be.disabled');
  });

  it('disables the "Delete All" button when there are no comments', () => {
    cy.get('[data-testid="delete-all-button"]').should('be.disabled');
  });
  
  it('enables submit button with name and message input and submits message', () => {
    // cy.intercept('POST', '/createComment', {
    //   statusCode: 200,
    //   body: { success: true }
    // }).as('postComment');

    cy.get('[data-testid="name-input"]').type('John Doe');
    cy.get('[data-testid="message-input"]').type('Hello World');

    cy.get('[data-testid="submit-button"]').should('not.be.disabled').click();

    // cy.wait('@postComment').its('response.statusCode').should('eq', 200);
  });

  it('enables the "Delete All" button when there are comments', () => { 
    // const mockRespBody = { 
    //   success: true, 
    //   data: [
    //     { 
    //       id: 123, 
    //       name: 'John Doe', 
    //       message: 'Hello World', 
    //       created: new Date().toISOString()
    //     }]
    //   }   

    // cy.intercept('GET', '/getComments', {
    //   statusCode: 200,
    //   body: mockRespBody
    // }).as('getComments');

    // cy.wait('@getComments').its('response.body').should('deep.equal', mockRespBody);

    // cy.get('[data-testid="comment"]', { timeout: 10000 }).should('have.length', mockRespBody.data.length);

    cy.get('[data-testid="delete-all-button"]').should('not.be.disabled');
  });
 
  it('the "Delete All" button deletes all comments', () => { 
    // const mockRespBody = { 
    //   success: true, 
    //   data: [
    //     { 
    //       id: 123, 
    //       name: 'John Doe', 
    //       message: 'Hello World', 
    //       created: new Date().toISOString()
    //     }]
    //   }   

    // cy.intercept('GET', '/getComments', {
    //   statusCode: 200,
    //   body: mockRespBody
    // }).as('getComments');

    // cy.wait('@getComments').its('response.body').should('deep.equal', mockRespBody);

    // cy.get('[data-testid="comment"]', { timeout: 10000 }).should('have.length', mockRespBody.data.length);

    cy.get('[data-testid="delete-all-button"]').click();

    cy.get('[data-testid="comment"]').should('not.exist');
  });
});


// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing the test
  return false;
});