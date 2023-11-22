import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('a single queue exists', () => {
    cy.intercept({ pathname: /scheduler$/ }, { fixture: 'list/single-queue' })

    cy.intercept(
        { pathname: /scheduler\/queues\/Queue$/ },
        { fixture: 'list/single-queue-configuration' }
    )
    cy.intercept(
        { pathname: /jobConfigurations$/ },
        { fixture: 'list/single-queue-job-configurations' }
    )
})

Given('the user navigated to the list page', () => {
    cy.visit('/')
    cy.findByRole('heading', { name: 'Scheduled jobs' }).should('exist')
})

Given('the user clicks the actions button', () => {
    cy.findByRole('button', { name: 'Actions' }).click()
})

When('the user clicks the edit button', () => {
    cy.findByText('Edit').click()
})

Then('the edit queue route will be loaded', () => {
    cy.findByRole('heading', { name: 'Queue: Queue' }).should('exist')
})

When('the user clicks the delete button', () => {
    cy.findByText('Delete').click()
})

Then('the queue will be deleted upon confirmation', () => {
    cy.intercept({ pathname: /scheduler$/, method: 'DELETE' }, (req) => {
        expect(req.url.endsWith('scheduler/queues/Queue')).to.be.true
        req.reply({ statusCode: 200 })
    })

    cy.findByText('Are you sure you want to delete this queue?').should('exist')
    cy.findByRole('button', { name: 'Delete' }).click()
})

Then('the queue will not be deleted upon cancelling', () => {
    cy.intercept({ pathname: /scheduler$/, method: 'DELETE' }, () => {
        // Will fail the test if the interceptor intercepts a request
        expect(true).to.be.false
    })

    cy.findByText('Are you sure you want to delete this queue?').should('exist')
    cy.findByRole('button', { name: 'Cancel' }).click()
})
