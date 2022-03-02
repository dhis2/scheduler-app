import React from 'react'
import { Box, ReactFinalForm, MultiSelectFieldFF } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { requiredCron } from '../../services/validators'
import { CronPresetButton } from '../Buttons'
import translateCron from '../../services/translate-cron'

const { Field, useFormState, useForm } = ReactFinalForm

// The key under which this field will be sent to the backend
const FIELD_NAME = 'cronExpression'
const VALIDATOR = requiredCron

const CronField = ({ name, parameterName, parameterProps}) => {

    return (
        <React.Fragment>
            <Field
                component={MultiSelectFieldFF}
                name={name}
                label={parameterName}
            />
            <Box marginTop="8px">
                <CronPresetButton
                    setCron={
                        /* istanbul ignore next */
                        cron => form.change(FIELD_NAME, cron)
                    }
                    small
                />
            </Box>
        </React.Fragment>
    )
}

export default CronField
