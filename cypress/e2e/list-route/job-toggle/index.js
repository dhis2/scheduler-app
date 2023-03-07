import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

/**
 * Currently cypress can't override earlier defined intercepts. This
 * is a known bug. The code below is a temporary fix that can be
 * removed once cypress has resolved the issue.
 *
 * https://github.com/cypress-io/cypress/issues/9302
 */

Given('a disabled user job exists', () => {
    const responses = []

    cy.fixture('list-route/disabled-user-job').then((fixture) => {
        responses.push(fixture)
    })

    cy.fixture('list-route/enabled-user-job').then((fixture) => {
        responses.push(fixture)
    })

    cy.intercept({ pathname: /jobConfigurations$/ }, (req) => {
        const fixture = responses.shift()
        req.reply(200, fixture)
    })
})

Given('an enabled user job exists', () => {
    const responses = []

    cy.fixture('list-route/enabled-user-job').then((fixture) => {
        responses.push(fixture)
    })

    cy.fixture('list-route/disabled-user-job').then((fixture) => {
        responses.push(fixture)
    })

    cy.intercept({ pathname: /jobConfigurations$/ }, (req) => {
        const fixture = responses.shift()
        req.reply(200, fixture)
    })
})

Given('the user navigated to the job list page', () => {
    cy.visit('/')
    cy.findByRole('heading', { name: 'Scheduled jobs' }).should('exist')
})

Given('the job toggle switch is off', () => {
    cy.findByRole('switch', { name: 'Toggle job' }).should('not.be.checked')
})

When('the user clicks the job toggle switch', () => {
    cy.intercept({ pathname: /lnWRZN67iDU$/ }, { statusCode: 204 })

    cy.findByRole('switch', { name: 'Toggle job' }).click()
})

Then('the job toggle switch is on', () => {
    cy.findByRole('switch', { name: 'Toggle job' }).should('be.checked')
})
