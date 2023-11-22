import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('a disabled queue exists', () => {
    cy.intercept({ pathname: /scheduler$/ }, { fixture: 'list/disabled-queue' })
})

Given('an enabled queue exists', () => {
    cy.intercept({ pathname: /scheduler$/ }, { fixture: 'list/enabled-queue' })
})

Given('the user navigated to the list page', () => {
    cy.visit('/')
    cy.findByRole('heading', { name: 'Scheduled jobs' }).should('exist')
})

Given('the queue toggle switch is off', () => {
    cy.findByRole('switch', { name: 'Enable' }).should('not.be.checked')
})

When('the user clicks the enabled queue toggle switch', () => {
    cy.intercept(
        { pathname: /jobConfigurations\/lnWRZN67iDU\/disable$/ },
        { statusCode: 204 }
    )
    cy.intercept({ pathname: /scheduler$/ }, { fixture: 'list/disabled-queue' })

    cy.findByRole('switch', { name: 'Disable' }).click()
})

When('the user clicks the disabled queue toggle switch', () => {
    cy.intercept(
        { pathname: /jobConfigurations\/lnWRZN67iDU\/enable$/ },
        { statusCode: 204 }
    )
    cy.intercept({ pathname: /scheduler$/ }, { fixture: 'list/enabled-queue' })

    cy.findByRole('switch', { name: 'Enable' }).click()
})

Then('the queue toggle switch is on', () => {
    cy.findByRole('switch', { name: 'Disable' }).should('be.checked')
})
