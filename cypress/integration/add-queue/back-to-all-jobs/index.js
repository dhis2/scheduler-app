import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('the user navigated to the add queue route', () => {
    cy.visit('/#/queue/add')
    cy.findByRole('heading', { name: 'New queue' }).should('exist')
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

Then('the user will be asked if they want to discard their changes', () => {
    cy.findByText('Discard unsaved changes?').should('exist')
})
