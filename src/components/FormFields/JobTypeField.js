import React from 'react'
import { Field, SingleSelect } from '@dhis2/ui-forms'
import { SingleSelectField } from '@dhis2/ui-core'
import { requiredSingleSelectOption } from '../../services/validators'
import { useGetJobTypes, selectors } from '../../hooks/job-types'

// The key under which this field will be sent to the backend
export const FIELD_NAME = 'jobType'
export const VALIDATOR = requiredSingleSelectOption

const JobTypeField = () => {
    const { loading, error, data } = useGetJobTypes()

    if (loading) {
        return <SingleSelectField loading loadingText="Loading job types" />
    }

    if (error) {
        return <SingleSelectField error helpText={error.message} />
    }

    const options = selectors.getJobTypes(data).map(type => ({
        value: type,
        label: type,
    }))

    return (
        <Field
            name={FIELD_NAME}
            validate={VALIDATOR}
            component={SingleSelect}
            options={options}
        />
    )
}

export default JobTypeField
