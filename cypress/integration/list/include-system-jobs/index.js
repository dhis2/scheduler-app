import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('some user jobs exist', () => {
    cy.intercept(
        { pathname: /scheduler$/ },
        { fixture: 'list/some-user-jobs-scheduler' }
    )
})

Given('some user and system jobs exist', () => {
    cy.intercept(
        { pathname: /scheduler$/ },
        { fixture: 'list/some-user-and-system-jobs-scheduler' }
    )
})

Given('the user navigated to the list route', () => {
    cy.visit('/')
    cy.findByRole('heading', { name: 'Scheduled jobs' }).should('exist')
})

Then('the include-system-jobs-in-list checkbox is unchecked', () => {
    cy.findByRole('checkbox', { name: 'Include system jobs in list' }).should(
        'not.be.checked'
    )
})

When('the user checks the include-system-jobs-in-list checkbox', () => {
    cy.findByRole('checkbox', { name: 'Include system jobs in list' })
        .click()
        .should('be.checked')
})

Then('system jobs are not shown', () => {
    const systemJobs = ['System Job 1', 'System Job 2', 'System Job 3']

    systemJobs.forEach((name) => {
        cy.findByRole('rowheader', { name }).should('not.exist')
    })
})

Then('system jobs are shown', () => {
    const systemJobs = ['System Job 1', 'System Job 2', 'System Job 3']

    systemJobs.forEach((name) => {
        cy.findByRole('rowheader', { name }).should('be.visible')
    })
})

Then('user jobs are shown', () => {
    const userJobs = ['Job 1', 'Job 2', 'Job 3']

    userJobs.forEach((name) => {
        cy.findByRole('rowheader', { name }).should('be.visible')
    })
})
