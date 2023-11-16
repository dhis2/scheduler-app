import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

Given('the user navigated to the list page', () => {
    cy.visit('/')
    cy.findByRole('heading', { name: 'Scheduled jobs' }).should('exist')
})

Then('there is a link to the new job page', () => {
    cy.findByRole('link', { name: 'New job' })
        .should('exist')
        .should('have.attr', 'href', '#/job/add')
})
