import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('a single user job exists', () => {
    cy.intercept(
        { pathname: /jobConfigurations$/ },
        { fixture: 'edit-route/single-user-job' }
    )
})

Given('the user navigated to the edit job page', () => {
    cy.visit('/#/job/lnWRZN67iDU')
    cy.findByRole('heading', { name: 'Job: Job 1' }).should('exist')
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
