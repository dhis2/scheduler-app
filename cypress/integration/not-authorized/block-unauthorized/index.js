import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

Given('an unauthorized user navigates to the app', () => {
    cy.intercept(
        { pathname: /me$/ },
        { fixture: 'not-authorized/unauthorized-user' }
    )

    cy.visit('/')
})

Then('the user will be shown an error message', () => {
    cy.findByText('Not authorized').should('exist')
    cy.findByText(
        "You don't have access to the Job Scheduler. Contact a system administrator to request access."
    ).should('exist')
})
