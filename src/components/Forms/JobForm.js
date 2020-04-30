import React from 'react'
import { object, bool, func, shape, string } from '@dhis2/prop-types'
import { Button, ReactFinalForm, NoticeBox } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { DiscardFormButton } from '../Buttons'
import {
    ScheduleField,
    JobNameField,
    JobTypeField,
    ParameterFields,
    fieldNames,
} from '../FormFields'

const { FormSpy } = ReactFinalForm

const JobForm = ({
    handleSubmit,
    pristine,
    submitError,
    values,
    setIsPristine,
}) => {
    // Check if there's currently a selected job type
    const jobType = values[fieldNames.JOB_TYPE]

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
            {!!submitError.message && (
                <NoticeBox error title={submitError.message}>
                    {submitError.details}
                </NoticeBox>
            )}
            <div>
                <Button primary type="submit" disabled={pristine}>
                    {i18n.t('Save job')}
                </Button>
                <DiscardFormButton shouldConfirm={!pristine}>
                    {i18n.t('Cancel')}
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
