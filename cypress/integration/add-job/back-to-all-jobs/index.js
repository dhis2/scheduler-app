import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('the user navigated to the add job route', () => {
    cy.visit('/#/job/add')
    cy.findByRole('heading', { name: 'New Job' }).should('exist')
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
    cy.findByText('Are you sure you want to discard your changes?').should(
        'exist'
    )
})
