import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

Given('a single system job exists', () => {
    cy.intercept(
        { pathname: /jobConfigurations\/sHMedQF7VYa$/ },
        { fixture: 'view-job/single-system-job' }
    )
})

Given('the user navigated to the view job route', () => {
    // Set fixed date so that time based job details tests don't change
    const now = new Date(2021, 3, 10).getTime()
    cy.clock(now)

    cy.visit('/#/job/sHMedQF7VYa')
    cy.findByRole('heading', { name: 'System job: System Job 1' }).should(
        'exist'
    )
})

Then('the system job data should be displayed in the form', () => {
    cy.findByLabelText('Name').should('exist').and('have.value', 'System Job 1')

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
