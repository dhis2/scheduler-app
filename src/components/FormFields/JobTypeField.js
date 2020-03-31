import React from 'react'
import { Field, SingleSelect } from '@dhis2/ui-forms'
import { SingleSelectField } from '@dhis2/ui-core'
import i18n from '@dhis2/d2-i18n'
import { requiredSingleSelectOption } from '../../services/validators'
import { jobTypesMap } from '../../services/server-translations'
import { useGetJobTypes } from '../../hooks/job-types'

// The key under which this field will be sent to the backend
export const FIELD_NAME = 'jobType'
export const VALIDATOR = requiredSingleSelectOption

const JobTypeField = () => {
    const { loading, error, data } = useGetJobTypes()

    if (loading) {
        return (
            <SingleSelectField
                loading
                loadingText={i18n.t('Loading job types')}
            />
        )
    }

    if (error) {
        return <SingleSelectField error helpText={error.message} />
    }

    const options = data.map(({ jobType }) => ({
        value: jobType,
        label: jobTypesMap[jobType],
    }))

    return (
        <Field
            name={FIELD_NAME}
            validate={VALIDATOR}
            component={SingleSelect}
            options={options}
            label={i18n.t('Job type')}
            required
        />
    )
}

export default JobTypeField
