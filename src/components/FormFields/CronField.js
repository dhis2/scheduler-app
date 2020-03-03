import React from 'react'
import cronstrue from 'cronstrue'
import { Field, FormSpy, Input } from '@dhis2/ui-forms'
import { CronPresetButton } from '../Buttons'
import { requiredCron, validateCron } from '../../services/validators'

// The key under which this field will be sent to the backend
export const FIELD_NAME = 'cronExpression'
export const VALIDATOR = requiredCron

const CronField = () => (
    <FormSpy subscription={{ values: true }}>
        {({ form, values }) => {
            const cronExpression = values[FIELD_NAME]
            const hasValidCron = cronExpression && validateCron(cronExpression)

            return (
                <React.Fragment>
                    <Field
                        component={Input}
                        name={FIELD_NAME}
                        validate={VALIDATOR}
                        label="CRON Expression"
                        type="text"
                        helpText={
                            hasValidCron && cronstrue.toString(cronExpression)
                        }
                        required
                    />
                    <CronPresetButton
                        setCron={cron => form.change(FIELD_NAME, cron)}
                    />
                </React.Fragment>
            )
        }}
    </FormSpy>
)

export default CronField
