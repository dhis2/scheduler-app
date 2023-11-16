import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

const infoHref =
    'https://docs.dhis2.org/en/use/user-guides/dhis-core-version-master/maintaining-the-system/scheduling.html'

Given('a single system job exists', () => {
    cy.intercept(
        { pathname: /jobConfigurations\/sHMedQF7VYa$/ },
        { fixture: 'view-job/single-system-job' }
    )
})

Given('the user navigated to the view job page', () => {
    cy.visit('/#/job/sHMedQF7VYa')
    cy.findByRole('heading', { name: 'System job: System Job 1' }).should(
        'exist'
    )
})

Then('there is a link to the documentation', () => {
    cy.findByRole('link', { name: 'About the scheduler' })
        .should('exist')
        .should('have.attr', 'href', infoHref)
        .should('have.attr', 'target', '_blank')
})
