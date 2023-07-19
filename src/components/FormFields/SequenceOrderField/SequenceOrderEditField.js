import React from 'react'
import { ReactFinalForm, CircularLoader, NoticeBox } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { jobTypesMap } from '../../../services/server-translations'
import { useQueueables } from '../../../hooks/queueables'
import SequenceTransfer from './SequenceTransfer'

const { Field } = ReactFinalForm

// The key under which this field will be sent to the backend
const FIELD_NAME = 'sequence'
const hasEnoughJobs = (value) =>
    value?.length > 1 ? undefined : i18n.t('Please select at least two jobs')

const SequenceOrderEditField = ({ selectedValues }) => {
    const { loading, error, data } = useQueueables()

    if (loading) {
        return <CircularLoader />
    }

    if (error) {
        return (
            <NoticeBox
                error
                title={i18n.t(
                    'Something went wrong whilst fetching the queueable jobs'
                )}
            />
        )
    }

    // The selected values aren't part of the queueables, so we need to add them
    const options = data.concat(selectedValues).map(({ name, id, type }) => ({
        label: name,
        value: id,
        type: jobTypesMap[type],
    }))

    return (
        <Field
            name={FIELD_NAME}
            component={SequenceTransfer}
            options={options}
            validate={hasEnoughJobs}
        />
    )
}

export default SequenceOrderEditField
