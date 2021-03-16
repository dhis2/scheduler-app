import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

Given('the user navigated to the add job page', () => {
    cy.visit('/#/add')
    cy.findByRole('heading', { name: 'New Job' }).should('exist')
})

Given('the user enters a job name', () => {
    /**
     * TODO: As this selector shows, the star that indicates that this input is required
     * is concatenated with the input name as there's no space between them in the
     * jsx. I think that we should probably look at an accessible way to indicate
     * that an input is required.
     */

    cy.findByLabelText('Name*').type('Name')
})

Given('the user selects the analytics table job type', () => {
    /**
     * TODO: not an accessible selector
     */

    cy.get('[data-test="dhis2-uicore-singleselect"]').click()
    cy.findByText('Analytics table').click()
})

Given('the user selects the continuous analytics table job type', () => {
    /**
     * TODO: not an accessible selector
     */

    cy.get('[data-test="dhis2-uicore-singleselect"]').click()
    cy.findByText('Continuous analytics table').click()
})

Given('the user selects the data synchronization job type', () => {
    /**
     * TODO: not an accessible selector
     */

    cy.get('[data-test="dhis2-uicore-singleselect"]').click()
    cy.findByText('Data synchronization').click()
})

Given('the user selects the tracker programs data sync job type', () => {
    /**
     * TODO: not an accessible selector
     */

    cy.get('[data-test="dhis2-uicore-singleselect"]').click()
    cy.findByText('Tracker programs data sync').click()
})

Given('the user selects the event programs data sync job type', () => {
    /**
     * TODO: not an accessible selector
     */

    cy.get('[data-test="dhis2-uicore-singleselect"]').click()
    cy.findByText('Event programs data sync').click()
})

Given('the user selects the metadata sync job type', () => {
    /**
     * TODO: not an accessible selector
     */

    cy.get('[data-test="dhis2-uicore-singleselect"]').click()
    cy.findByText('Metadata synchronization').click()
})

Given('the user selects the monitoring job type', () => {
    /**
     * TODO: not an accessible selector
     */

    cy.get('[data-test="dhis2-uicore-singleselect"]').click()
    cy.findByText('Monitoring').click()
})

Given('the user selects the push analysis job type', () => {
    /**
     * TODO: not an accessible selector
     */

    cy.get('[data-test="dhis2-uicore-singleselect"]').click()
    cy.findByText('Push analysis').click()
})

Given('the user selects the predictor job type', () => {
    /**
     * TODO: not an accessible selector
     */

    cy.get('[data-test="dhis2-uicore-singleselect"]').click()
    cy.findByText('Predictor').click()
})

Given('the user enters a cron schedule', () => {
    /**
     * TODO: not an accessible selector
     */

    cy.findByLabelText('CRON Expression*').type('0 0 * ? * *')
})

Given('the user enters a delay schedule', () => {
    /**
     * TODO: not an accessible selector
     */

    cy.findByLabelText('Delay*').type('100')
})

Given('the user enters the parameters for analytics table', () => {
    cy.findByLabelText('Last years').type('1')

    /**
     * TODO: the select interactions are not accessible at all
     */

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

    /**
     * TODO: the select interactions are not accessible at all
     */

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

    /**
     * TODO: the select interactions are not accessible at all
     */

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
    /**
     * TODO: the select interactions are not accessible at all
     */

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

    /**
     * TODO: the select interactions are not accessible at all
     */

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
    () => {
        const expected = {
            name: 'Name',
            jobType: 'ANALYTICS_TABLE',
            cronExpression: '0 0 * ? * *',
            jobParameters: {
                lastYears: '1',
                skipTableTypes: ['DATA_VALUE'],
                skipResourceTables: true,
            },
        }

        cy.intercept(
            { pathname: /jobConfigurations$/, method: 'POST' },
            req => {
                expect(req.body).to.deep.equal(expected)
                req.reply({ statusCode: 201 })
            }
        )

        cy.findByRole('button', { name: 'Save' }).click()
    }
)

Then(
    'the expected job is created when the user saves the continuous analytics table job',
    () => {
        const expected = {
            name: 'Name',
            jobType: 'CONTINUOUS_ANALYTICS_TABLE',
            delay: '100',
            jobParameters: {
                fullUpdateHourOfDay: '1',
                lastYears: '2',
                skipTableTypes: ['DATA_VALUE'],
            },
        }

        cy.intercept(
            { pathname: /jobConfigurations$/, method: 'POST' },
            req => {
                expect(req.body).to.deep.equal(expected)
                req.reply({ statusCode: 201 })
            }
        )

        cy.findByRole('button', { name: 'Save' }).click()
    }
)

Then(
    'the expected job is created when the user saves the data synchronization job',
    () => {
        const expected = {
            name: 'Name',
            jobType: 'DATA_SYNC',
            cronExpression: '0 0 * ? * *',
            jobParameters: {
                pageSize: '1',
            },
        }

        cy.intercept(
            { pathname: /jobConfigurations$/, method: 'POST' },
            req => {
                expect(req.body).to.deep.equal(expected)
                req.reply({ statusCode: 201 })
            }
        )

        cy.findByRole('button', { name: 'Save' }).click()
    }
)

Then(
    'the expected job is created when the user saves the tracker programs data sync job',
    () => {
        const expected = {
            name: 'Name',
            jobType: 'TRACKER_PROGRAMS_DATA_SYNC',
            cronExpression: '0 0 * ? * *',
            jobParameters: {
                pageSize: '1',
            },
        }

        cy.intercept(
            { pathname: /jobConfigurations$/, method: 'POST' },
            req => {
                expect(req.body).to.deep.equal(expected)
                req.reply({ statusCode: 201 })
            }
        )

        cy.findByRole('button', { name: 'Save' }).click()
    }
)

Then(
    'the expected job is created when the user saves the event programs data sync job',
    () => {
        const expected = {
            name: 'Name',
            jobType: 'EVENT_PROGRAMS_DATA_SYNC',
            cronExpression: '0 0 * ? * *',
            jobParameters: {
                pageSize: '1',
            },
        }

        cy.intercept(
            { pathname: /jobConfigurations$/, method: 'POST' },
            req => {
                expect(req.body).to.deep.equal(expected)
                req.reply({ statusCode: 201 })
            }
        )

        cy.findByRole('button', { name: 'Save' }).click()
    }
)

Then(
    'the expected job is created when the user saves the metadata sync job',
    () => {
        const expected = {
            name: 'Name',
            jobType: 'META_DATA_SYNC',
            cronExpression: '0 0 * ? * *',
            jobParameters: {
                trackerProgramPageSize: '1',
                eventProgramPageSize: '2',
                dataValuesPageSize: '3',
            },
        }

        cy.intercept(
            { pathname: /jobConfigurations$/, method: 'POST' },
            req => {
                expect(req.body).to.deep.equal(expected)
                req.reply({ statusCode: 201 })
            }
        )

        cy.findByRole('button', { name: 'Save' }).click()
    }
)

Then(
    'the expected job is created when the user saves the monitoring job',
    () => {
        const expected = {
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
        }

        cy.intercept(
            { pathname: /jobConfigurations$/, method: 'POST' },
            req => {
                expect(req.body).to.deep.equal(expected)
                req.reply({ statusCode: 201 })
            }
        )

        cy.findByRole('button', { name: 'Save' }).click()
    }
)

Then(
    'the expected job is created when the user saves the push analysis job',
    () => {
        const expected = {
            name: 'Name',
            jobType: 'PUSH_ANALYSIS',
            cronExpression: '0 0 * ? * *',
            jobParameters: {
                pushAnalysis: ['jtcMAKhWwnc'],
            },
        }

        cy.intercept(
            { pathname: /jobConfigurations$/, method: 'POST' },
            req => {
                expect(req.body).to.deep.equal(expected)
                req.reply({ statusCode: 201 })
            }
        )

        cy.findByRole('button', { name: 'Save' }).click()
    }
)

Then(
    'the expected job is created when the user saves the predictor job',
    () => {
        const expected = {
            name: 'Name',
            jobType: 'PREDICTOR',
            cronExpression: '0 0 * ? * *',
            jobParameters: {
                relativeStart: '1',
                relativeEnd: '2',
                predictors: ['tEK1OEqS4O1'],
            },
        }

        cy.intercept(
            { pathname: /jobConfigurations$/, method: 'POST' },
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
