import { Given, Then } from '@badeball/cypress-cucumber-preprocessor'

const infoHref =
    'https://docs.dhis2.org/en/use/user-guides/dhis-core-version-master/maintaining-the-system/scheduling.html'

Given('the user navigated to the list route', () => {
    cy.visit('/')
    cy.findByRole('heading', { name: 'Scheduled jobs' }).should('exist')
})

Then('there is a link to the documentation', () => {
    cy.findByRole('link', { name: 'About the scheduler' })
        .should('exist')
        .should('have.attr', 'href', infoHref)
        .should('have.attr', 'target', '_blank')
})
