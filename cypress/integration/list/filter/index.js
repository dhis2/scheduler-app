import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('some user jobs and queues exist', () => {
    cy.intercept(
        { pathname: /scheduler$/ },
        { fixture: 'list/some-user-jobs-and-queues-scheduler' }
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

Given('the user enables the include-system-jobs-in-list toggle', () => {
    const expected = [
        'Job 1',
        'Job 2',
        'Job 3',
        'System Job 1',
        'System Job 2',
        'System Job 3',
    ]

    cy.findByRole('checkbox', { name: 'Include system jobs in list' }).click()
    expected.forEach((name) => {
        cy.findByRole('rowheader', { name }).should('exist')
    })
})

When('the user enters a filter string', () => {
    cy.findByRole('searchbox', { name: 'Filter by name' }).type('1')
})

Then('only user jobs and queues that match the filter will be shown', () => {
    const expected = ['Job 1', 'Queue 1']

    expected.forEach((name) => {
        cy.findByRole('rowheader', { name }).should('exist')
    })
})

Then('only jobs that match the filter will be shown', () => {
    const expected = ['Job 1', 'System Job 1']

    expected.forEach((name) => {
        cy.findByRole('rowheader', { name }).should('exist')
    })
})
