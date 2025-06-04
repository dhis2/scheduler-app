import { Given, Then } from '@badeball/cypress-cucumber-preprocessor'

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
    cy.findByText('Queue').should('exist')
})

Given('the user clicks the expand button', () => {
    cy.findByRole('button', { name: 'Show jobs' }).click()
})

Then('the queued jobs are shown', () => {
    cy.findByText('Job 1').should('exist')
    cy.findByText('Job 2').should('exist')
})
