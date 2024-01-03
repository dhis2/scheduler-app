import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

Given('the user navigated to the list route', () => {
    cy.visit('/')
    cy.findByRole('heading', { name: 'Scheduled jobs' }).should('exist')
})

Then('there is a link to the new job route', () => {
    cy.findByRole('link', { name: 'New job' })
        .should('exist')
        .should('have.attr', 'href', '#/job/add')
})
