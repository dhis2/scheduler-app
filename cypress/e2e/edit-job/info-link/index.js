import { Given, Then } from '@badeball/cypress-cucumber-preprocessor'

const infoHref =
    'https://docs.dhis2.org/en/use/user-guides/dhis-core-version-master/maintaining-the-system/scheduling.html'

Given('a single user job exists', () => {
    cy.intercept(
        { pathname: /jobConfigurations\/lnWRZN67iDU$/ },
        { fixture: 'edit-job/single-user-job' }
    )
})

Given('the user navigated to the edit job route', () => {
    cy.visit('/#/job/lnWRZN67iDU')
    cy.findByRole('heading', { name: 'Job: Job 1' }).should('exist')
})

Then('there is a link to the documentation', () => {
    cy.findByRole('link', { name: 'About the scheduler' })
        .should('exist')
        .should('have.attr', 'href', infoHref)
        .should('have.attr', 'target', '_blank')
})
