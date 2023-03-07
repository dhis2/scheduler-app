import { Given, Then } from '@badeball/cypress-cucumber-preprocessor'

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
    cy.visit('/#/add')
    cy.findByRole('heading', { name: 'New Job' }).should('exist')
})

Given('the user enters a job name', () => {
    cy.findByLabelText('Name*').type('Name')
})

Given('the user selects the analytics table job type', () => {
    selectJob('Analytics table')
})

Given('the user selects the continuous analytics table job type', () => {
    selectJob('Continuous analytics table')
})

Given('the user selects the data synchronization job type', () => {
    selectJob('Data synchronization')
})

Given('the user selects the tracker programs data sync job type', () => {
    selectJob('Tracker programs data sync')
})

Given('the user selects the event programs data sync job type', () => {
    selectJob('Event programs data sync')
})

Given('the user selects the metadata sync job type', () => {
    selectJob('Metadata synchronization')
})

Given('the user selects the monitoring job type', () => {
    selectJob('Monitoring')
})

Given('the user selects the push analysis job type', () => {
    selectJob('Push analysis')
})

Given('the user selects the predictor job type', () => {
    selectJob('Predictor')
})

Given('the user enters a cron schedule', () => {
    cy.findByLabelText('CRON Expression*').type('0 0 * ? * *')
})

Given('the user enters a delay schedule', () => {
    cy.findByLabelText('Delay*').type('100')
})

Given('the user enters the parameters for analytics table', () => {
    cy.findByLabelText('Last years').type('1')

    cy.findByText('Skip table types')
        .parents('[data-test="dhis2-uiwidgets-multiselectfield"]')
        .within(() => {
            cy.get('[data-test="dhis2-uicore-multiselect"]').click()
        })

    cy.findByText('Data value').click()

    // Close the select by clicking layer
    cy.get('[data-test="dhis2-uicore-layer"]').click()

    cy.findByLabelText('Skip resource tables').click()
})

Given('the user enters the parameters for continuous analytics table', () => {
    cy.findByLabelText('Full update hour of day').type('1')
    cy.findByLabelText('Last years').type('2')

    cy.findByText('Skip table types')
        .parents('[data-test="dhis2-uiwidgets-multiselectfield"]')
        .within(() => {
            cy.get('[data-test="dhis2-uicore-multiselect"]').click()
        })

    cy.findByText('Data value').click()

    // Close the select by clicking layer
    cy.get('[data-test="dhis2-uicore-layer"]').click()
})

Given('the user enters the parameters for data synchronization', () => {
    cy.findByLabelText('Page size').type('1')
})

Given('the user enters the parameters for tracker programs data sync', () => {
    cy.findByLabelText('Page size').type('1')
})

Given('the user enters the parameters for event programs data sync', () => {
    cy.findByLabelText('Page size').type('1')
})

Given('the user enters the parameters for metadata sync', () => {
    cy.findByLabelText('Tracker program page size').type('1')
    cy.findByLabelText('Event program page size').type('2')
    cy.findByLabelText('Data values page size').type('3')
})

Given('the user enters the parameters for monitoring', () => {
    cy.findByLabelText('Relative start').type('1')
    cy.findByLabelText('Relative end').type('2')

    cy.findByText('Validation rule groups')
        .parents('[data-test="dhis2-uiwidgets-multiselectfield"]')
        .within(() => {
            cy.get('[data-test="dhis2-uicore-multiselect"]').click()
        })

    cy.findByText('ANC').click()

    // Close the select by clicking layer
    cy.get('[data-test="dhis2-uicore-layer"]').click()

    cy.findByLabelText('Send notifications').click()
    cy.findByLabelText('Persist results').click()
})

Given('the user enters the parameters for push analysis', () => {
    cy.contains('label', 'Push analysis')
        .parents('[data-test="dhis2-uiwidgets-multiselectfield"]')
        .within(() => {
            cy.get('[data-test="dhis2-uicore-multiselect"]').click()
        })

    cy.findByText('Immunization Key Indicators Monthly Report').click()

    // Close the select by clicking layer
    cy.get('[data-test="dhis2-uicore-layer"]').click()
})

Given('the user enters the parameters for predictor', () => {
    cy.findByLabelText('Relative start').type('1')
    cy.findByLabelText('Relative end').type('2')

    cy.findByText('Predictors')
        .parents('[data-test="dhis2-uiwidgets-multiselectfield"]')
        .within(() => {
            cy.get('[data-test="dhis2-uicore-multiselect"]').click()
        })

    cy.findByText('Malaria Outbreak Threshold').click()

    // Close the select by clicking layer
    cy.get('[data-test="dhis2-uicore-layer"]').click()
})

Then(
    'the expected job is created when the user saves the analytics table job',
    () =>
        saveAndExpect({
            name: 'Name',
            jobType: 'ANALYTICS_TABLE',
            cronExpression: '0 0 * ? * *',
            jobParameters: {
                lastYears: '1',
                skipTableTypes: ['DATA_VALUE'],
                skipResourceTables: true,
            },
        })
)

Then(
    'the expected job is created when the user saves the continuous analytics table job',
    () =>
        saveAndExpect({
            name: 'Name',
            jobType: 'CONTINUOUS_ANALYTICS_TABLE',
            delay: '100',
            jobParameters: {
                fullUpdateHourOfDay: '1',
                lastYears: '2',
                skipTableTypes: ['DATA_VALUE'],
            },
        })
)

Then(
    'the expected job is created when the user saves the data synchronization job',
    () =>
        saveAndExpect({
            name: 'Name',
            jobType: 'DATA_SYNC',
            cronExpression: '0 0 * ? * *',
            jobParameters: {
                pageSize: '1',
            },
        })
)

Then(
    'the expected job is created when the user saves the tracker programs data sync job',
    () =>
        saveAndExpect({
            name: 'Name',
            jobType: 'TRACKER_PROGRAMS_DATA_SYNC',
            cronExpression: '0 0 * ? * *',
            jobParameters: {
                pageSize: '1',
            },
        })
)

Then(
    'the expected job is created when the user saves the event programs data sync job',
    () =>
        saveAndExpect({
            name: 'Name',
            jobType: 'EVENT_PROGRAMS_DATA_SYNC',
            cronExpression: '0 0 * ? * *',
            jobParameters: {
                pageSize: '1',
            },
        })
)

Then(
    'the expected job is created when the user saves the metadata sync job',
    () =>
        saveAndExpect({
            name: 'Name',
            jobType: 'META_DATA_SYNC',
            cronExpression: '0 0 * ? * *',
            jobParameters: {
                trackerProgramPageSize: '1',
                eventProgramPageSize: '2',
                dataValuesPageSize: '3',
            },
        })
)

Then('the expected job is created when the user saves the monitoring job', () =>
    saveAndExpect({
        name: 'Name',
        jobType: 'MONITORING',
        cronExpression: '0 0 * ? * *',
        jobParameters: {
            relativeStart: '1',
            relativeEnd: '2',
            validationRuleGroups: ['UP1lctvalPn'],
            sendNotifications: true,
            persistResults: true,
        },
    })
)

Then(
    'the expected job is created when the user saves the push analysis job',
    () =>
        saveAndExpect({
            name: 'Name',
            jobType: 'PUSH_ANALYSIS',
            cronExpression: '0 0 * ? * *',
            jobParameters: {
                pushAnalysis: ['jtcMAKhWwnc'],
            },
        })
)

Then('the expected job is created when the user saves the predictor job', () =>
    saveAndExpect({
        name: 'Name',
        jobType: 'PREDICTOR',
        cronExpression: '0 0 * ? * *',
        jobParameters: {
            relativeStart: '1',
            relativeEnd: '2',
            predictors: ['tEK1OEqS4O1'],
        },
    })
)

Then('the job list is loaded', () => {
    cy.findByRole('heading', { name: 'Scheduled jobs' }).should('exist')
})
