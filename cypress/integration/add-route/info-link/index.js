import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

const infoHref =
    'https://docs.dhis2.org/en/use/user-guides/dhis-core-version-236/maintaining-the-system/scheduling.html'

Given('the user navigated to the add job page', () => {
    cy.visit('/#/add')
    cy.findByRole('heading', { name: 'New Job' }).should('exist')
})

/**
 * We're not asserting what happens when you click the link. Just that the
 * expected link exists. This follows Cypress recommendations:
 * https://docs.cypress.io/guides/references/trade-offs.html#Multiple-tabs
 */

Then('there is a link to the documentation', () => {
    cy.findByRole('link', { name: 'About job configuration' })
        .should('exist')
        .should('have.attr', 'href', infoHref)
        .should('have.attr', 'target', '_blank')
})
