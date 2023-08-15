import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

/**
 * Local helpers
 */

const selectJob = (jobName) => {
    const parentSelector = '[data-test="dhis2-uiwidgets-singleselectfield"]'
    const childSelector = '[data-test="dhis2-uicore-singleselect"]'

    cy.get(parentSelector)
        .contains('Job type')
        .parents(parentSelector)
        .find(childSelector)
        .click()

    cy.findByText(jobName).click()
}

const saveAndExpect = (expected) => {
    cy.intercept(
        { pathname: /jobConfigurations\/lnWRZN67iDU$/, method: 'PUT' },
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

Given('a single user job with parameters exists', () => {
    cy.intercept(
        { pathname: /jobConfigurations$/ },
        { fixture: 'edit-route/single-user-job-with-params' }
    )
})

Given('the user navigated to the edit job page', () => {
    cy.visit('/#/job/lnWRZN67iDU')
    cy.findByRole('heading', { name: 'Job: Job 1' }).should('exist')
})

Given('the user enters a job name', () => {
    cy.findByLabelText('Name*').clear().type('Name')
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
    cy.findByLabelText('CRON Expression*').clear().type('0 0 * ? * *')
})

Then('the job is updated when the user saves the data integrity job', () =>
    saveAndExpect({
        jobType: 'DATA_INTEGRITY',
        jobParameters: {
            type: 'REPORT',
        },
        name: 'Name',
        cronExpression: '0 0 * ? * *',
    })
)

Then('the job is updated when the user saves the resource table job', () =>
    saveAndExpect({
        jobType: 'RESOURCE_TABLE',
        name: 'Name',
        cronExpression: '0 0 * ? * *',
    })
)

Then(
    'the job is updated when the user saves the send scheduled message job',
    () =>
        saveAndExpect({
            jobType: 'SEND_SCHEDULED_MESSAGE',
            name: 'Name',
            cronExpression: '0 0 * ? * *',
        })
)

Then(
    'the job is updated when the user saves the program notifications job',
    () =>
        saveAndExpect({
            jobType: 'PROGRAM_NOTIFICATIONS',
            name: 'Name',
            cronExpression: '0 0 * ? * *',
        })
)

Then('the job list is loaded', () => {
    cy.findByRole('heading', { name: 'Scheduled jobs' }).should('exist')
})
