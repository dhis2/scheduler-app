import React from 'react'
import { object, bool, func, shape, string } from 'prop-types'
import { FormSpy } from 'react-final-form'
import { Button } from '@dhis2/ui-core'
import { InlineError } from '../Errors'
import { DiscardFormButton } from '../Buttons'
import {
    CronField,
    JobNameField,
    JobTypeField,
    ParameterCollectionField,
    fieldNames,
} from '../FormFields'

const JobForm = ({
    handleSubmit,
    pristine,
    submitError,
    values,
    setIsPristine,
}) => {
    const hasJobType =
        values[fieldNames.JOB_TYPE] && 'value' in values[fieldNames.JOB_TYPE]
    const jobType = hasJobType ? values[fieldNames.JOB_TYPE].value : undefined

    return (
        <form onSubmit={handleSubmit}>
            <FormSpy
                subscription={{ pristine: true }}
                onChange={({ pristine }) => setIsPristine(pristine)}
            />
            <JobNameField />
            <CronField />
            <JobTypeField />
            <ParameterCollectionField jobType={jobType} />
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
    submitError: shape({
        message: string,
        details: string,
    }),
    values: object.isRequired,
    setIsPristine: func.isRequired,
}

export default JobForm
