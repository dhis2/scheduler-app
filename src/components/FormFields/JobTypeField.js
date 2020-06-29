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
import { useDataQuery } from '@dhis2/app-runtime'
import { jobTypesMap } from '../../services/server-translations'

const { Field } = ReactFinalForm

// The key under which this field will be sent to the backend
export const FIELD_NAME = 'jobType'
const VALIDATOR = composeValidators(string, hasValue)

const query = {
    jobTypes: {
        resource: 'jobConfigurations/jobTypes',
    },
}

const JobTypeField = () => {
    const { loading, error, data } = useDataQuery(query)

    if (loading) {
        return (
            <SingleSelectField
                loading
                loadingText={i18n.t('Loading')}
                label={i18n.t('Job type')}
                required
            />
        )
    }

    if (error) {
        /**
         * We need the data, so throw the error if it
         * can't be loaded.
         */
        throw error
    }

    const options = data.jobTypes.jobTypes.map(({ jobType }) => ({
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
