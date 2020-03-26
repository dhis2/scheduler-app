import React from 'react'
import { object, bool, func, shape, string } from 'prop-types'
import { FormSpy } from '@dhis2/ui-forms'
import { Button } from '@dhis2/ui-core'
import { InlineError } from '../Errors'
import { DiscardFormButton } from '../Buttons'
import {
    ScheduleField,
    JobNameField,
    JobTypeField,
    ParameterFields,
    fieldNames,
} from '../FormFields'

const JobForm = ({
    handleSubmit,
    pristine,
    submitError,
    values,
    setIsPristine,
}) => {
    // Check if there's currently a selected job type
    const hasJobType =
        values[fieldNames.JOB_TYPE] && 'value' in values[fieldNames.JOB_TYPE]
    const jobType = hasJobType ? values[fieldNames.JOB_TYPE].value : ''

    return (
        <form onSubmit={handleSubmit}>
            <FormSpy
                subscription={{ pristine: true }}
                onChange={({ pristine }) => setIsPristine(pristine)}
            />
            <JobNameField />
            <JobTypeField />
            {jobType && <ScheduleField jobType={jobType} />}
            {jobType && <ParameterFields jobType={jobType} />}
            <div>
                {!!submitError.message && (
                    <InlineError
                        message={submitError.message}
                        details={submitError.details}
                    />
                )}
            </div>
            <div>
                <Button primary type="submit" disabled={pristine}>
                    Save job
                </Button>
                <DiscardFormButton shouldConfirm={!pristine}>
                    Cancel
                </DiscardFormButton>
            </div>
        </form>
    )
}

JobForm.defaultProps = {
    submitError: {},
}

JobForm.propTypes = {
    handleSubmit: func.isRequired,
    pristine: bool.isRequired,
    setIsPristine: func.isRequired,
    values: object.isRequired,
    submitError: shape({
        message: string,
        details: string,
    }),
}

export default JobForm
