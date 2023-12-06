import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('a disabled queue exists', () => {
    cy.intercept(
        { pathname: /scheduler$/ },
        { fixture: 'list/disabled-queue-scheduler' }
    )
})

Given('an enabled queue exists', () => {
    cy.intercept(
        { pathname: /scheduler$/ },
        { fixture: 'list/enabled-queue-scheduler' }
    )
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
        { pathname: /jobConfigurations\/uvUPBToQHD9\/disable$/ },
        { statusCode: 204 }
    )
    cy.intercept(
        { pathname: /scheduler$/ },
        { fixture: 'list/disabled-queue-scheduler' }
    )

    cy.findByRole('switch', { name: 'Disable' }).click()
})

When('the user clicks the disabled queue toggle switch', () => {
    cy.intercept(
        { pathname: /jobConfigurations\/uvUPBToQHD9\/enable$/ },
        { statusCode: 204 }
    )
    cy.intercept(
        { pathname: /scheduler$/ },
        { fixture: 'list/enabled-queue-scheduler' }
    )

    cy.findByRole('switch', { name: 'Enable' }).click()
})

Then('the queue toggle switch is on', () => {
    cy.findByRole('switch', { name: 'Disable' }).should('be.checked')
})
