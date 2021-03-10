import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

Given('a single system job exists', () => {
    cy.intercept(
        { pathname: /jobConfigurations$/ },
        { fixture: 'view-route/single-system-job' }
    )
})

Given('the user navigated to the view job page', () => {
    cy.visit('/#/view/sHMedQF7VYa')
    cy.findByRole('heading', { name: 'System job: System Job 1' }).should(
        'exist'
    )
})

/**
 * We're not asserting what happens when you click the link. Just that the
 * expected link exists. This follows Cypress recommendations:
 * https://docs.cypress.io/guides/references/trade-offs.html#Multiple-tabs
 */

Then('there are two links to the job list page', () => {
    cy.findAllByRole('link', { name: 'Back to all jobs' })
        .should('have.length', 2)
        .each(link => {
            expect(link).to.have.attr('href', '#/')
        })
})
