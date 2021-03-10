import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

Given('a single system job exists', () => {
    cy.intercept(
        { pathname: /jobConfigurations$/ },
        { fixture: 'view-route/single-system-job' }
    )
})

Given('the user navigated to the view job page', () => {
    // Set fixed date so that time based job details tests don't change
    const now = new Date(2021, 3, 10).getTime()
    cy.clock(now)

    cy.visit('/#/view/sHMedQF7VYa')
    cy.findByRole('heading', { name: 'System job: System Job 1' }).should(
        'exist'
    )
})

Then('the system job data should be displayed in the form', () => {
    cy.findByLabelText('Name')
        .should('exist')
        .and('have.value', 'System Job 1')

    /**
     * TODO: the select isn't accessible, as we don't use a standard select
     * nor decorate it with the appropriate aria roles. We should do one of
     * those.
     */

    cy.findByText('Job type').should('exist')
    cy.findByText('Credentials expiry alert').should('exist')

    cy.findByLabelText('CRON Expression')
        .should('exist')
        .and('have.value', '0 0 2 ? * *')
})

Then('the system job details should be visible', () => {
    cy.findByRole('heading', { name: 'Job details' }).should('exist')
    cy.findByText('Created 2 months ago.').should('exist')
    cy.findByText('Last run 2 months ago.').should('exist')
    cy.findByText('Last run status: Completed.').should('exist')
})
