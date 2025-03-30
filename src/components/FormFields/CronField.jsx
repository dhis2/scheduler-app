import React from 'react'
import { Box, ReactFinalForm, InputFieldFF } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { requiredCron } from '../../services/validators'
import { CronPresetButton } from '../Buttons'
import translateCron from '../../services/translate-cron'

const { Field, useFormState, useForm } = ReactFinalForm

// The key under which this field will be sent to the backend
const FIELD_NAME = 'cronExpression'
const VALIDATOR = requiredCron

const CronField = () => {
    const form = useForm()
    const { values } = useFormState({ subscription: { values: true } })
    const cronExpression = values[FIELD_NAME]
    const helpText = translateCron(cronExpression)

    return (
        <React.Fragment>
            <Field
                component={InputFieldFF}
                name={FIELD_NAME}
                validate={VALIDATOR}
                label={i18n.t('CRON Expression')}
                type="text"
                helpText={helpText}
                required
            />
            <Box marginTop="8px">
                <CronPresetButton
                    setCron={
                        /* istanbul ignore next */
                        (cron) => form.change(FIELD_NAME, cron)
                    }
                    small
                />
            </Box>
        </React.Fragment>
    )
}

export default CronField
