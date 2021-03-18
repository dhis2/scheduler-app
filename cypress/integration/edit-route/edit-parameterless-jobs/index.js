import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

Given('a single user job with parameters exists', () => {
    cy.intercept(
        { pathname: /jobConfigurations$/ },
        { fixture: 'edit-route/single-user-job-with-params' }
    )
})

Given('the user navigated to the edit job page', () => {
    cy.visit('/#/edit/lnWRZN67iDU')
    cy.findByRole('heading', { name: 'Job: Job 1' }).should('exist')
})

Given('the user enters a job name', () => {
    /**
     * TODO: As this selector shows, the star that indicates that this input is required
     * is concatenated with the input name as there's no space between them in the
     * jsx. I think that we should probably look at an accessible way to indicate
     * that an input is required.
     */

    cy.findByLabelText('Name*')
        .clear()
        .type('Name')
})

Given('the user selects the data integrity job type', () => {
    /**
     * TODO: not an accessible selector
     */

    cy.get('[data-test="dhis2-uicore-singleselect"]').click()
    cy.findByText('Data integrity').click()
})

Given('the user selects the resource table job type', () => {
    /**
     * TODO: not an accessible selector
     */

    cy.get('[data-test="dhis2-uicore-singleselect"]').click()
    cy.findByText('Resource table').click()
})

Given('the user selects the send scheduled message job type', () => {
    /**
     * TODO: not an accessible selector
     */

    cy.get('[data-test="dhis2-uicore-singleselect"]').click()
    cy.findByText('Send scheduled message').click()
})

Given('the user selects the program notifications job type', () => {
    /**
     * TODO: not an accessible selector
     */

    cy.get('[data-test="dhis2-uicore-singleselect"]').click()
    cy.findByText('Program notifications').click()
})

Given('the user enters a cron schedule', () => {
    /**
     * TODO: not an accessible selector
     */

    cy.findByLabelText('CRON Expression*')
        .clear()
        .type('0 0 * ? * *')
})

Then('the job is updated when the user saves the data integrity job', () => {
    const expected = {
        jobType: 'DATA_INTEGRITY',
        name: 'Name',
        cronExpression: '0 0 * ? * *',
    }

    cy.intercept(
        { pathname: /jobConfigurations\/lnWRZN67iDU$/, method: 'PUT' },
        req => {
            expect(req.body).to.deep.equal(expected)
            req.reply({ statusCode: 201 })
        }
    )

    cy.findByRole('button', { name: 'Save' }).click()
})

Then('the job is updated when the user saves the resource table job', () => {
    const expected = {
        jobType: 'RESOURCE_TABLE',
        name: 'Name',
        cronExpression: '0 0 * ? * *',
    }

    cy.intercept(
        { pathname: /jobConfigurations\/lnWRZN67iDU$/, method: 'PUT' },
        req => {
            expect(req.body).to.deep.equal(expected)
            req.reply({ statusCode: 201 })
        }
    )

    cy.findByRole('button', { name: 'Save' }).click()
})

Then(
    'the job is updated when the user saves the send scheduled message job',
    () => {
        const expected = {
            jobType: 'SEND_SCHEDULED_MESSAGE',
            name: 'Name',
            cronExpression: '0 0 * ? * *',
        }

        cy.intercept(
            { pathname: /jobConfigurations\/lnWRZN67iDU$/, method: 'PUT' },
            req => {
                expect(req.body).to.deep.equal(expected)
                req.reply({ statusCode: 201 })
            }
        )

        cy.findByRole('button', { name: 'Save' }).click()
    }
)

Then(
    'the job is updated when the user saves the program notifications job',
    () => {
        const expected = {
            jobType: 'PROGRAM_NOTIFICATIONS',
            name: 'Name',
            cronExpression: '0 0 * ? * *',
        }

        cy.intercept(
            { pathname: /jobConfigurations\/lnWRZN67iDU$/, method: 'PUT' },
            req => {
                expect(req.body).to.deep.equal(expected)
                req.reply({ statusCode: 201 })
            }
        )

        cy.findByRole('button', { name: 'Save' }).click()
    }
)

Then('the job list is loaded', () => {
    cy.findByRole('heading', { name: 'Scheduled jobs' }).should('exist')
})
