/* global Cypress */
import '@testing-library/cypress/add-commands'

// https://docs.cypress.io/api/events/catalog-of-events#Uncaught-Exceptions
Cypress.on('uncaught:exception', () => {
    // Returning false here means uncaught exceptions won't fail the test
    return false
})

/**
 * Custom login command, can be used to login or switch between sessions.
 * Will cache and restore cookies, localStorage, and sessionStorage. See:
 * https://docs.cypress.io/api/commands/session
 */
Cypress.Commands.add('login', (user) => {
    cy.session(
        user,
        () => {
            cy.visit('/')

            // Ensure we're on the login page
            cy.findByRole('heading', { name: 'Please sign in' }).should('exist')

            // Enter credentials
            cy.get('input#server').type(user.server)
            cy.get('input#j_username').type(user.name)
            cy.get('input#j_password').type(user.password)
            cy.findByRole('button', { name: 'Sign in' }).click()

            // Wait until main route has been loaded
            cy.findByRole('heading', { name: 'Scheduled jobs' }).should('exist')
        },
        {
            validate: () => {
                cy.request(`${user.server}/api/me`).then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body.username).to.eq(user.name)
                })
            },
        }
    )
})

// Log in before each test, if not already logged in
beforeEach(() => {
    cy.login({
        name: Cypress.env('LOGIN_NAME'),
        password: Cypress.env('LOGIN_PASSWORD'),
        server: Cypress.env('LOGIN_SERVER'),
    })
})
