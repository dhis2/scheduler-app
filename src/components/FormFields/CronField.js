import React from 'react'
import { ReactFinalForm, InputFieldFF } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { CronPresetButton } from '../Buttons'
import { HumanReadableCron } from '../Cron'
import { requiredCron, validateCron } from '../../services/validators'

const { Field, FormSpy } = ReactFinalForm

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
                        component={InputFieldFF}
                        name={FIELD_NAME}
                        validate={VALIDATOR}
                        label={i18n.t('CRON Expression')}
                        type="text"
                        helpText={
                            hasValidCron && (
                                <HumanReadableCron
                                    cronExpression={cronExpression}
                                />
                            )
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
