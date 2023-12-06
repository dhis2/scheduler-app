import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

const infoHref =
    'https://docs.dhis2.org/en/use/user-guides/dhis-core-version-master/maintaining-the-system/scheduling.html'

Given('the user navigated to the add job route', () => {
    cy.visit('/#/job/add')
    cy.findByRole('heading', { name: 'New Job' }).should('exist')
})

Then('there is a link to the documentation', () => {
    cy.findByRole('link', { name: 'About the scheduler' })
        .should('exist')
        .should('have.attr', 'href', infoHref)
        .should('have.attr', 'target', '_blank')
})
