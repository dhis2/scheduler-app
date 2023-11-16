import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('a disabled user job exists', () => {
    cy.intercept(
        { pathname: /scheduler$/ },
        { fixture: 'list/disabled-user-job' }
    )
})

Given('an enabled user job exists', () => {
    cy.intercept(
        { pathname: /scheduler$/ },
        { fixture: 'list/enabled-user-job' }
    )
})

Given('the user navigated to the job list page', () => {
    cy.visit('/')
    cy.findByRole('heading', { name: 'Scheduled jobs' }).should('exist')
})

Given('the job toggle switch is off', () => {
    cy.findByRole('switch', { name: 'Toggle job' }).should('not.be.checked')
})

When('the user clicks the enabled job toggle switch', () => {
    cy.intercept(
        { pathname: /jobConfigurations\/lnWRZN67iDU\/disable$/ },
        { statusCode: 204 }
    )
    cy.intercept(
        { pathname: /scheduler$/ },
        { fixture: 'list/disabled-user-job' }
    )

    cy.findByRole('switch', { name: 'Toggle job' }).click()
})

When('the user clicks the disabled job toggle switch', () => {
    cy.intercept(
        { pathname: /jobConfigurations\/lnWRZN67iDU\/enable$/ },
        { statusCode: 204 }
    )
    cy.intercept(
        { pathname: /scheduler$/ },
        { fixture: 'list/enabled-user-job' }
    )

    cy.findByRole('switch', { name: 'Toggle job' }).click()
})

Then('the job toggle switch is on', () => {
    cy.findByRole('switch', { name: 'Toggle job' }).should('be.checked')
})
