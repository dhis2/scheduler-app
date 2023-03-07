import { Given, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('a single system job exists', () => {
    cy.intercept(
        { pathname: /scheduler$/ },
        { fixture: 'view-route/single-system-job' }
    )
})

Given('the user navigated to the view job page', () => {
    cy.visit('/#/view/IciNd2Amk04')
    cy.findByRole('heading', { name: 'System job: System Job 1' }).should(
        'exist'
    )
})

Then('there are two links to the job list page', () => {
    cy.findAllByRole('link', { name: 'Back to all jobs' })
        .should('have.length', 2)
        .each((link) => {
            expect(link).to.have.attr('href', '#/')
        })
})
