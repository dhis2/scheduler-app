import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('a single system job exists', () => {
    cy.intercept(
        { pathname: /scheduler$/ },
        { fixture: 'list/single-system-job-scheduler' }
    )

    cy.intercept(
        { pathname: /jobConfigurations\/sHMedQF7VYa$/ },
        { fixture: 'list/single-system-job-job-configurations' }
    )
})

Given('the user navigated to the list route', () => {
    cy.visit('/')
    cy.findByRole('heading', { name: 'Scheduled jobs' }).should('exist')
})

Given('the user checks the include-system-jobs-in-list checkbox', () => {
    cy.findByRole('checkbox', { name: 'Include system jobs in list' })
        .click()
        .should('be.checked')

    cy.findByRole('rowheader', { name: 'System Job 1' }).should('be.visible')
})

Given('the user clicks the actions button', () => {
    cy.findByRole('button', { name: 'Actions' }).click()
})

When('the user clicks the view button', () => {
    cy.findByText('View').click()
})

Then('the view job route will be loaded', () => {
    cy.findByRole('heading', { name: 'System job: System Job 1' }).should(
        'exist'
    )
})
