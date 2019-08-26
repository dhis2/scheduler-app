import React from 'react'
import { func, string } from 'prop-types'
import { connect } from 'react-redux'
import { FormSpy } from 'react-final-form'
import { getCronPreset } from '../../rootSelectors'
import { selectors, actions } from '../../data/cron-preset'
import { ShowCronPresetButton } from '../Buttons'
import { Arrange, ArrangeFill } from '../Arrange'
import CronField, { FIELD_NAME as CRON } from './CronField'
import ContinuousExecutionField, {
    FIELD_NAME as CONTINUOUS,
} from './ContinuousExecutionField'

const DumbJobScheduleField = ({ cronPreset, clearPreset }) => (
    <FormSpy subscription={{ values: true }}>
        {({ values, form }) => {
            const currentCronValue = values[CRON]
            const currentContinuousValue = values[CONTINUOUS]

            if (cronPreset && currentCronValue !== cronPreset) {
                // Update the cron expression if a preset has been selected
                form.change(CRON, cronPreset)
                // Clear the preset to prevent further updates
                clearPreset()
            }

            return (
                <React.Fragment>
                    When should the job run?
                    <Arrange>
                        <ArrangeFill>
                            <CronField disabled={currentContinuousValue} />
                            <ShowCronPresetButton />
                        </ArrangeFill>
                        <ArrangeFill>
                            <ContinuousExecutionField />
                        </ArrangeFill>
                    </Arrange>
                </React.Fragment>
            )
        }}
    </FormSpy>
)

DumbJobScheduleField.propTypes = {
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
)(DumbJobScheduleField)
