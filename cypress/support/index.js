import '@testing-library/cypress/add-commands'

// Custom commands
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
                cy.visit('/')
                cy.findByRole('heading', { name: 'Scheduled jobs' }).should(
                    'exist'
                )
            },
        }
    )
})
