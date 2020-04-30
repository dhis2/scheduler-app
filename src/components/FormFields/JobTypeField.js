import React from 'react'
import {
    ReactFinalForm,
    SingleSelectFieldFF,
    SingleSelectField,
    composeValidators,
    hasValue,
    string,
} from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { jobTypesMap } from '../../services/server-translations'
import { useGetJobTypes } from '../../hooks/job-types'

const { Field } = ReactFinalForm

// The key under which this field will be sent to the backend
export const FIELD_NAME = 'jobType'
export const VALIDATOR = composeValidators(string, hasValue)

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
            component={SingleSelectFieldFF}
            options={options}
            label={i18n.t('Job type')}
            required
        />
    )
}

export default JobTypeField
