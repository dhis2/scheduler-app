import React, { useContext } from 'react'
import {
    ReactFinalForm,
    SingleSelectFieldFF,
    composeValidators,
    hasValue,
    string,
} from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { StoreContext, selectors } from '../Store'
import { jobTypesMap } from '../../services/server-translations'

const { Field } = ReactFinalForm

// The key under which this field will be sent to the backend
export const FIELD_NAME = 'jobType'
const VALIDATOR = composeValidators(string, hasValue)

const JobTypeField = () => {
    const store = useContext(StoreContext)
    const jobTypes = selectors.getJobTypesStore(store)

    const options = jobTypes.map(({ jobType }) => ({
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
