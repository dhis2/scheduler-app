import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

Given('a single user job exists', () => {
    cy.intercept(
        { pathname: /scheduler$/ },
        { fixture: 'edit-route/single-user-job' }
    )
})

Given('the user navigated to the edit job page', () => {
    // Set fixed date so that time based job details tests don't change
    const now = new Date(2021, 3, 10).getTime()
    cy.clock(now)

    cy.visit('/#/edit/IciNd2Amk04')
    cy.findByRole('heading', { name: 'Job: Job 1' }).should('exist')
})

Then('the user job data should be displayed in the form', () => {
    cy.findByLabelText('Name*').should('exist').and('have.value', 'Job 1')

    cy.findByText('Job type').should('exist')
    cy.findByText('Data integrity').should('exist')

    cy.findByLabelText('CRON Expression*')
        .should('exist')
        .and('have.value', '0 0 3 ? * MON')
})

Then('the user job details should be visible', () => {
    cy.findByRole('heading', { name: 'Job details' }).should('exist')
    cy.findByText('Created 2 months ago.').should('exist')
    cy.findByText('Last run 2 months ago.').should('exist')
    cy.findByText('Last run status: Completed.').should('exist')
})
