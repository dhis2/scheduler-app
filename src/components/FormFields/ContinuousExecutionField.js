import React from 'react'
import { Field, FormSpy } from 'react-final-form'
import { Radio } from '../FormBaseFields'
import CronField from './CronField'

// The key under which this field will be sent to the backend
export const FIELD_NAME = 'continuousExecution'

/**
 * This field is slightly convoluted. For scheduling, the job can either be set to continuous
 * execution, or to a cron expression. The display of the cron is controlled by the value of
 * continuous execution. So this field actually has two purposes; set the value for continuous
 * execution, and control the display of the cron expression field.
 * It was designed as a radio button, which does not allow a boolean as a value. But the backend
 * expects a boolean for the continuousExecution field. So we're setting true or false as a string.
 * This does work as well, but eventually we'll have to revisit this design as this is hacky and
 * more likely to break.
 */

const ContinuousExecutionField = () => (
    <FormSpy subscription={{ values: true }}>
        {({ values }) => {
            const continuousExecution = values[FIELD_NAME]

            return (
                <React.Fragment>
                    <p>When should the job run?</p>
                    <Field
                        label="At a set time/interval"
                        component={Radio}
                        name={FIELD_NAME}
                        type="radio"
                        value="false"
                    />
                    {continuousExecution === 'false' && <CronField />}
                    <Field
                        label="Continuously"
                        component={Radio}
                        name={FIELD_NAME}
                        type="radio"
                        value="true"
                    />
                </React.Fragment>
            )
        }}
    </FormSpy>
)

export default ContinuousExecutionField
