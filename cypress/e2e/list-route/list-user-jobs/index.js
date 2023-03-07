import { Given, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('there are no user jobs', () => {
    cy.intercept({ pathname: /scheduler$/ }, { fixture: 'list-route/no-jobs' })
})

Given('some user jobs exist', () => {
    cy.intercept(
        { pathname: /scheduler$/ },
        { fixture: 'list-route/some-user-jobs' }
    )
})

Given('the user navigated to the job list page', () => {
    cy.visit('/')
    cy.findByRole('heading', { name: 'Scheduled jobs' }).should('exist')
})

Given(
    'the table should contain a cell that states that there are no jobs',
    () => {
        cy.findByRole('cell', { name: 'No jobs to display' }).should('exist')
    }
)

Then('the user jobs are rendered as tabular data', () => {
    cy.findByRole('rowheader', { name: 'Job 1' }).should('exist')
    cy.findByRole('rowheader', { name: 'Job 2' }).should('exist')
    cy.findByRole('rowheader', { name: 'Job 3' }).should('exist')
})
