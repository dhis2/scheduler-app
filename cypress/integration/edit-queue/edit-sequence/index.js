import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

/**
 * Local helpers
 */

const saveAndExpect = (name, expected) => {
    cy.intercept(
        { url: `**/scheduler/queues/${name}`, method: 'PUT' },
        (req) => {
            expect(req.body).to.deep.equal(expected)
            req.reply({ statusCode: 201 })
        }
    )

    cy.findByRole('button', { name: 'Save' }).click()
}

/**
 * Tests
 */

Given('a sequence with two unqueued jobs exists', () => {
    cy.intercept(
        { pathname: /scheduler$/ },
        { fixture: 'edit-queue/schedule-two-unqueued-jobs' }
    )

    cy.intercept(
        { pathname: /scheduler\/queueable$/ },
        { fixture: 'edit-queue/queueable-two-unqueued-jobs' }
    )

    cy.intercept(
        { pathname: /scheduler\/queues\/one$/ },
        { fixture: 'edit-queue/queue-two-unqueued-jobs' }
    )

    cy.intercept(
        { pathname: /jobConfigurations$/ },
        { fixture: 'edit-queue/jobs-two-unqueued-jobs' }
    )
})

Given('the user navigates to the edit sequence route', () => {
    cy.visit('/#/queue/one')
    cy.findByRole('heading', { name: 'Queue: one' }).should('exist')
})

Given('the user changes the sequence name', () => {
    cy.findByLabelText('Name*').clear()
    cy.findByLabelText('Name*').type('Name')
})

Given('the user changes the cron schedule', () => {
    cy.findByLabelText('CRON Expression*').clear()
    cy.findByLabelText('CRON Expression*').type('0 0 * ? * *')
})

Given('the user adds jobs to the queue', () => {
    cy.get(
        '[data-test="dhis2-uicore-transferoption"][data-value="xkxSSOLKc7X"]'
    ).click()
    cy.get('[data-test="dhis2-uicore-transfer-actions-addindividual"]').click()
    cy.get(
        '[data-test="dhis2-uicore-transferoption"][data-value="RRKO5XbxBz4"]'
    ).click()
    cy.get('[data-test="dhis2-uicore-transfer-actions-addindividual"]').click()
})

Then('the sequence is updated when the user saves the sequence', () =>
    saveAndExpect('one', {
        cronExpression: '0 0 * ? * *',
        name: 'Name',
        sequence: ['RWcaltWoKuN', 'p2HCjnAmSNE', 'xkxSSOLKc7X', 'RRKO5XbxBz4'],
    })
)

Then('the list route is loaded', () => {
    cy.findByRole('heading', { name: 'Scheduled jobs' }).should('exist')
})
