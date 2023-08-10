import React, { useState } from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Button, CircularLoader, Box } from '@dhis2/ui'
import history from '../../services/history'
import { DiscardFormButton } from '../Buttons'
import { DeleteJobModal } from '../Modal'
import { FormErrorBox } from '../FormErrorBox'
import {
    ScheduleField,
    NameField,
    JobTypeField,
    ParameterFields,
    fieldNames,
} from '../FormFields'
import styles from './JobEditForm.module.css'

const JobEditForm = ({
    id,
    handleSubmit,
    pristine,
    submitting,
    submitError,
    hasSubmitErrors,
    values,
}) => {
    const [showDeleteJobModal, setShowDeleteJobModal] = useState(false)

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
                    <FormErrorBox submitError={submitError} />
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
                <span className={styles.deleteButton}>
                    <Button
                        destructive
                        onClick={() => setShowDeleteJobModal(true)}
                    >
                        {i18n.t('Delete job')}
                    </Button>

                    {showDeleteJobModal && (
                        <DeleteJobModal
                            id={id}
                            hideModal={() => setShowDeleteJobModal(false)}
                            onSuccess={() => {
                                history.push('/')
                            }}
                        />
                    )}
                </span>
            </div>
        </form>
    )
}

const { func, bool, object, array, string } = PropTypes

JobEditForm.defaultProps = {
    submitError: [],
}

JobEditForm.propTypes = {
    handleSubmit: func.isRequired,
    hasSubmitErrors: bool.isRequired,
    id: string.isRequired,
    pristine: bool.isRequired,
    submitting: bool.isRequired,
    values: object.isRequired,
    submitError: array,
}

export default JobEditForm
