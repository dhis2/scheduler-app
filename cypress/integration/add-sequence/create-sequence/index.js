import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

/**
 * Local helpers
 */

const saveAndExpect = (expected) => {
    cy.intercept(
        { url: `**/scheduler/queues/${expected.name}`, method: 'POST' },
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

Given('two unqueued jobs exist', () => {
    cy.intercept(
        { pathname: /scheduler\/queueable$/ },
        { fixture: 'add-sequence/two-unqueued-jobs' }
    )
})

Given('the user navigated to the add sequence page', () => {
    cy.visit('/#/queue/add')
    cy.findByRole('heading', { name: 'New queue' }).should('exist')
})

Given('the user enters a sequence name', () => {
    cy.findByLabelText('Name*').type('Name')
})

Given('the user enters a cron schedule', () => {
    cy.findByLabelText('CRON Expression*').type('0 0 * ? * *')
})

Given('the user adds jobs to the queue', () => {
    cy.get(
        '[data-test="dhis2-uicore-transferoption"][data-value="TMddx5FxNgF"]'
    ).click()
    cy.get('[data-test="dhis2-uicore-transfer-actions-addindividual"]').click()
    cy.get(
        '[data-test="dhis2-uicore-transferoption"][data-value="vFpCA8dV8cT"]'
    ).click()
    cy.get('[data-test="dhis2-uicore-transfer-actions-addindividual"]').click()
})

Then('the expected sequence is created when the user saves the sequence', () =>
    saveAndExpect({
        cronExpression: '0 0 * ? * *',
        name: 'Name',
        sequence: ['TMddx5FxNgF', 'vFpCA8dV8cT'],
    })
)

Then('the job list is loaded', () => {
    cy.findByRole('heading', { name: 'Scheduled jobs' }).should('exist')
})
