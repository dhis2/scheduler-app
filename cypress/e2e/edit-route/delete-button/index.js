import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('a single user job exists', () => {
    cy.intercept(
        { pathname: /scheduler$/ },
        { fixture: 'edit-route/single-user-job' }
    )
})

Given('the user navigated to the edit job page', () => {
    cy.visit('/#/edit/IciNd2Amk04')
    cy.findByRole('heading', { name: 'Job: Job 1' }).should('exist')
})

When('the user clicks the delete job button', () => {
    cy.findByRole('button', { name: 'Delete job' }).click()
})

Then('the job will be deleted upon confirmation', () => {
    cy.intercept(
        { pathname: /jobConfigurations$/, method: 'DELETE' },
        (req) => {
            expect(req.url.endsWith('jobConfigurations/IciNd2Amk04')).to.be.true
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

    cy.get('[data-test="dhis2-uicore-modal"]').within(() => {
        cy.findByText('Are you sure you want to delete this job?').should(
            'exist'
        )
        cy.findByRole('button', { name: 'Cancel' }).click()
    })
})
