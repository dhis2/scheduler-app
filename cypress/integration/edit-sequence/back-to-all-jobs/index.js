import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('a sequence exists', () => {
    cy.intercept(
        { pathname: /scheduler$/ },
        { fixture: 'edit-sequence/sequence' }
    )
})

Given('the user navigates to the edit sequence page', () => {
    cy.visit('/#/queue/RWcaltWoKuN')
    cy.findByRole('heading', { name: 'Sequence: one' }).should('exist')
})

Given('the user has edited the form', () => {
    cy.findByLabelText('Name*').type('Name')
})

When('the user clicks the cancel button', () => {
    cy.findByRole('button', { name: 'Cancel' }).click()
})

Then('the job list route will be loaded', () => {
    cy.findByRole('heading', { name: 'Scheduled jobs' }).should('exist')
})

Then('the user will be asked if they want to discard the form', () => {
    cy.findByText('Are you sure you want to discard this form?').should('exist')
})
