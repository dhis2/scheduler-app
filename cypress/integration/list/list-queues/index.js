import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

Given('a queue exists', () => {
    cy.intercept({ pathname: /scheduler$/ }, { fixture: 'list/a-queue' })
})

Given('the user navigated to the list page', () => {
    cy.visit('/')
    cy.findByRole('heading', { name: 'Scheduled jobs' }).should('exist')
})

Then('the queue is rendered as tabular data', () => {
    cy.findByRole('rowheader', { name: 'Queue' }).should('exist')
})
