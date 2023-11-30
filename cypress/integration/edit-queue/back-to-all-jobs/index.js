import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('a sequence exists', () => {
    cy.intercept(
        { pathname: /scheduler$/ },
        { fixture: 'edit-queue/schedule-two-unqueued-jobs' }
    )

    cy.intercept(
        { pathname: /scheduler\/queueable$/ },
        { fixture: 'edit-queue/queueable-two-unqueued-jobs' }
    )

    cy.intercept(
        { pathname: /scheduler\/queues\/one$/ },
        { fixture: 'edit-queue/queue-two-unqueued-jobs' }
    )

    cy.intercept(
        { pathname: /jobConfigurations$/ },
        { fixture: 'edit-queue/jobs-two-unqueued-jobs' }
    )
})

Given('the user navigates to the edit sequence page', () => {
    cy.visit('/#/queue/one')
    cy.findByRole('heading', { name: 'Queue: one' }).should('exist')
})

Given('the user has edited the form', () => {
    cy.findByLabelText('Name*').type('Name')
})

When('the user clicks the cancel button', () => {
    cy.findByRole('button', { name: 'Cancel' }).click()
})

Then('the list route will be loaded', () => {
    cy.findByRole('heading', { name: 'Scheduled jobs' }).should('exist')
})

Then('the user will be asked if they want to discard the form', () => {
    cy.findByText('Are you sure you want to discard this form?').should('exist')
})
