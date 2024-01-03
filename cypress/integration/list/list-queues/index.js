import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

Given('a queue exists', () => {
    cy.intercept(
        { pathname: /scheduler$/ },
        { fixture: 'list/list-queues-scheduler' }
    )
})

Given('the user navigated to the list route', () => {
    cy.visit('/')
    cy.findByRole('heading', { name: 'Scheduled jobs' }).should('exist')
})

Then('the queue is rendered as tabular data', () => {
    cy.findByRole('rowheader', { name: 'Queue' }).should('exist')
})

Given('the user clicks the expand button', () => {
    cy.findByRole('button', { name: 'Show jobs' }).click()
})

Then('the queued jobs are shown', () => {
    cy.findByRole('rowheader', { name: 'Job 1' }).should('exist')
    cy.findByRole('rowheader', { name: 'Job 2' }).should('exist')
})
