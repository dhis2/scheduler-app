import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

/**
 * Local helpers
 */

const selectJob = (jobName) => {
    cy.get('[data-test="dhis2-uicore-singleselect"]').click()
    cy.findByText(jobName).click()
}

const saveAndExpect = (expected) => {
    cy.intercept({ pathname: /jobConfigurations$/, method: 'POST' }, (req) => {
        expect(req.body).to.deep.equal(expected)
        req.reply({ statusCode: 201 })
    })

    cy.findByRole('button', { name: 'Save' }).click()
}

/**
 * Tests
 */

Given('the user navigated to the add job page', () => {
    cy.visit('/#/job/add')
    cy.findByRole('heading', { name: 'New Job' }).should('exist')
})

Given('the user enters a job name', () => {
    cy.findByLabelText('Name*').type('Name')
})

Given('the user selects the data integrity job type', () => {
    selectJob('Data integrity')
})

Given('the user selects the resource table job type', () => {
    selectJob('Resource table')
})

Given('the user selects the send scheduled message job type', () => {
    selectJob('Send scheduled message')
})

Given('the user selects the program notifications job type', () => {
    selectJob('Program notifications')
})

Given('the user enters a cron schedule', () => {
    cy.findByLabelText('CRON Expression*').type('0 0 * ? * *')
})

Then(
    'the expected job is created when the user saves the data integrity job',
    () =>
        saveAndExpect({
            cronExpression: '0 0 * ? * *',
            jobParameters: {
                type: 'REPORT',
            },
            jobType: 'DATA_INTEGRITY',
            name: 'Name',
        })
)

Then(
    'the expected job is created when the user saves the resource table job',
    () =>
        saveAndExpect({
            cronExpression: '0 0 * ? * *',
            jobType: 'RESOURCE_TABLE',
            name: 'Name',
        })
)

Then(
    'the expected job is created when the user saves the send scheduled message job',
    () =>
        saveAndExpect({
            cronExpression: '0 0 * ? * *',
            jobType: 'SEND_SCHEDULED_MESSAGE',
            name: 'Name',
        })
)

Then(
    'the expected job is created when the user saves the program notifications job',
    () =>
        saveAndExpect({
            cronExpression: '0 0 * ? * *',
            jobType: 'PROGRAM_NOTIFICATIONS',
            name: 'Name',
        })
)

Then('the job list is loaded', () => {
    cy.findByRole('heading', { name: 'Scheduled jobs' }).should('exist')
})
