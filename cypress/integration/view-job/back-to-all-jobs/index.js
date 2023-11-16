import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

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

Then('there is a link to the job list page', () => {
    cy.findByRole('link', { name: 'Back to all jobs' }).should(
        'have.attr',
        'href',
        '#/'
    )
})
