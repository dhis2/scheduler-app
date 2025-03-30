import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Button, CircularLoader, Box } from '@dhis2/ui'
import { DiscardFormButton } from '../Buttons'
import { FormErrorBox } from '../FormErrorBox'
import {
    ScheduleField,
    NameField,
    JobTypeField,
    ParameterFields,
    fieldNames,
} from '../FormFields'
import styles from './JobAddForm.module.css'

const JobAddForm = ({
    handleSubmit,
    pristine,
    submitting,
    submitError,
    hasSubmitErrors,
    values,
}) => {
    // Check if there's currently a selected job type
    const jobType = values[fieldNames.JOB_TYPE]

    // Show a spinner only when submitting
    const Spinner = submitting ? <CircularLoader small /> : null

    return (
        <form onSubmit={handleSubmit}>
            <Box maxWidth="600px">
                <NameField />
            </Box>
            <Box marginTop="16px" maxWidth="400px">
                <JobTypeField />
            </Box>
            {jobType && (
                <Box marginTop="16px" maxWidth="400px">
                    <ScheduleField jobType={jobType} />
                </Box>
            )}
            {jobType && (
                <Box marginTop="32px" maxWidth="400px">
                    <ParameterFields jobType={jobType} />
                </Box>
            )}
            {hasSubmitErrors && (
                <Box marginTop="32px" maxWidth="600px">
                    <FormErrorBox
                        title={i18n.t(
                            'Something went wrong whilst creating your job'
                        )}
                        submitError={submitError}
                    />
                </Box>
            )}
            <div className={styles.formButtonContainer}>
                <Button
                    primary
                    type="submit"
                    disabled={pristine || submitting}
                    icon={Spinner}
                    className={styles.saveButton}
                >
                    {i18n.t('Save')}
                </Button>
                <DiscardFormButton shouldConfirm={!pristine}>
                    {i18n.t('Cancel')}
                </DiscardFormButton>
            </div>
        </form>
    )
}

const { func, bool, object, array } = PropTypes

JobAddForm.defaultProps = {
    submitError: [],
}

JobAddForm.propTypes = {
    handleSubmit: func.isRequired,
    hasSubmitErrors: bool.isRequired,
    pristine: bool.isRequired,
    submitting: bool.isRequired,
    values: object.isRequired,
    submitError: array,
}

export default JobAddForm
