import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('the user navigated to the add job page', () => {
    cy.visit('/#/add')
    cy.findByRole('heading', { name: 'New Job' }).should('exist')
})

Given('the user has edited the form', () => {
    /**
     * TODO: As this selector shows, the star that indicates that this input is required
     * is concatenated with the input name as there's no space between them in the
     * jsx. I think that we should probably look at an accessible way to indicate
     * that an input is required.
     */

    cy.findByLabelText('Name*').type('Name')
})

When('the user clicks the back to all jobs link', () => {
    // Since this action does more than just route, a button seems appropriate
    cy.findByRole('button', { name: 'Back to all jobs' }).click()
})

When('the user clicks the cancel button', () => {
    // Since this action does more than just route, a button seems appropriate
    cy.findByRole('button', { name: 'Cancel' }).click()
})

Then('the job list route will be loaded', () => {
    cy.findByRole('heading', { name: 'Scheduled jobs' }).should('exist')
})

Then('the user will be asked if they want to discard the form', () => {
    cy.findByText('Are you sure you want to discard this form?').should('exist')
})
