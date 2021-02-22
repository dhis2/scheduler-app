import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

Given('the user navigated to the job list page', () => {
    cy.visit('/')
    cy.findByRole('heading', { name: 'Scheduled jobs' }).should('exist')
})

/**
 * We're not asserting what happens when you click the link. Just that the
 * expected link exists. This follows Cypress recommendations:
 * https://docs.cypress.io/guides/references/trade-offs.html#Multiple-tabs
 */

Then('there is a link to the new job page', () => {
    cy.findByRole('link', { name: 'New job' })
        .should('exist')
        .should('have.attr', 'href', '#/add')
})
