import React from 'react'
import { func, string } from 'prop-types'
import { connect } from 'react-redux'
import { Field, FormSpy } from 'react-final-form'
import cronstrue from 'cronstrue'
import { getCronPreset } from '../../rootSelectors'
import { selectors, actions } from '../../data/cron-preset'
import { InputField } from '../../components/FormBaseFields'
import { ShowCronPresetButton } from '../Buttons'
import { requiredCron, validateCron } from '../../services/validators'

// The key under which this field will be sent to the backend
export const FIELD_NAME = 'cronExpression'
export const VALIDATOR = requiredCron

const DumbCronField = ({ cronPreset, clearPreset }) => (
    <FormSpy subscription={{ values: true }}>
        {({ form, values }) => {
            let humanReadableCron = ''
            const cronExpression = values[FIELD_NAME]

            // Update the cron expression if a preset has been selected
            if (cronPreset && cronExpression !== cronPreset) {
                form.change(FIELD_NAME, cronPreset)

                // Clear the preset to prevent further updates
                clearPreset()
            }

            if (cronExpression && validateCron(cronExpression)) {
                humanReadableCron = cronstrue.toString(cronExpression)
            }

            return (
                <React.Fragment>
                    <Field
                        component={InputField}
                        name={FIELD_NAME}
                        validate={VALIDATOR}
                        label="CRON Expression"
                        type="text"
                        required
                    />
                    <p>{humanReadableCron}</p>
                    <ShowCronPresetButton />
                </React.Fragment>
            )
        }}
    </FormSpy>
)

DumbCronField.propTypes = {
    cronPreset: string.isRequired,
    clearPreset: func.isRequired,
}

const mapStateToProps = state => {
    /* istanbul ignore next */
    const cronPreset = getCronPreset(state)

    /* istanbul ignore next */
    return {
        cronPreset: selectors.getPreset(cronPreset),
    }
}

const mapDispatchToProps = {
    clearPreset: actions.clearPreset,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DumbCronField)
