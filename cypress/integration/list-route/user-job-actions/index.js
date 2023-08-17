import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('a single user job exists', () => {
    cy.intercept(
        { pathname: /scheduler$/ },
        { fixture: 'list-route/single-user-job' }
    )

    cy.intercept(
        { pathname: /jobConfigurations\/lnWRZN67iDU$/ },
        { fixture: 'list-route/single-user-job-job-configurations' }
    )
})

Given('the user navigated to the job list page', () => {
    cy.visit('/')
    cy.findByRole('heading', { name: 'Scheduled jobs' }).should('exist')
})

Given('the user clicks the actions button', () => {
    cy.findByRole('button', { name: 'Actions' }).click()
})

When('the user clicks the edit button', () => {
    cy.findByText('Edit').click()
})

Then('the edit job route will be loaded', () => {
    cy.findByRole('heading', { name: 'Job: Job 1' }).should('exist')
})

When('the user clicks the run manually button', () => {
    cy.findByText('Run manually').click()
})

Then('the job will be executed upon confirmation', () => {
    cy.intercept({ pathname: /execute$/, method: 'GET' }, (req) => {
        expect(req.url.endsWith('jobConfigurations/lnWRZN67iDU/execute')).to.be
            .true
        req.reply({ statusCode: 200 })
    })

    cy.findByText('Are you sure you want to run this job?').should('exist')
    cy.findByRole('button', { name: 'Run' }).click()
})

Then('the job will not be executed upon cancelling', () => {
    cy.intercept({ pathname: /execute$/, method: 'GET' }, () => {
        // Will fail the test if the interceptor intercepts a request
        expect(true).to.be.false
    })

    cy.findByText('Are you sure you want to run this job?').should('exist')
    cy.findByRole('button', { name: 'Cancel' }).click()
})

When('the user clicks the delete button', () => {
    cy.findByText('Delete').click()
})

Then('the job will be deleted upon confirmation', () => {
    cy.intercept(
        { pathname: /jobConfigurations$/, method: 'DELETE' },
        (req) => {
            expect(req.url.endsWith('jobConfigurations/lnWRZN67iDU')).to.be.true
            req.reply({ statusCode: 200 })
        }
    )

    cy.findByText('Are you sure you want to delete this job?').should('exist')
    cy.findByRole('button', { name: 'Delete' }).click()
})

Then('the job will not be deleted upon cancelling', () => {
    cy.intercept({ pathname: /jobConfigurations$/, method: 'DELETE' }, () => {
        // Will fail the test if the interceptor intercepts a request
        expect(true).to.be.false
    })

    cy.findByText('Are you sure you want to delete this job?').should('exist')
    cy.findByRole('button', { name: 'Cancel' }).click()
})
