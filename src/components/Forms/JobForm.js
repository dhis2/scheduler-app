import React from 'react'
import { object, bool, func, shape, string } from 'prop-types'
import { FormSpy } from 'react-final-form'
import { Button } from '@dhis2/ui-core'
import { InlineError } from '../Errors'
import { DiscardFormButton } from '../Buttons'
import {
    JobNameField,
    CronField,
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
    return (
        <form onSubmit={handleSubmit}>
            <FormSpy
                subscription={{ pristine: true }}
                onChange={({ pristine }) => setIsPristine(pristine)}
            />
            <JobNameField />
            <CronField />
            <JobTypeField />
            <ParameterCollectionField jobType={values[fieldNames.JOB_TYPE]} />
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
