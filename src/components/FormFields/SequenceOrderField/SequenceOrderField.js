import React from 'react'
import { ReactFinalForm, CircularLoader, NoticeBox } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { useQueueables } from '../../../hooks/queueables'
import SequenceTransfer from './SequenceTransfer'

const { Field } = ReactFinalForm

// The key under which this field will be sent to the backend
const FIELD_NAME = 'sequence'
const initialValue = []
const hasEnoughJobs = (value) =>
    value.length > 1 ? undefined : i18n.t('Please select at least two jobs')

const SequenceOrderField = () => {
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

    const options = data.map(({ name, id }) => ({ label: name, value: id }))

    return (
        <Field
            name={FIELD_NAME}
            component={SequenceTransfer}
            options={options}
            initialValue={initialValue}
            validate={hasEnoughJobs}
        />
    )
}

export default SequenceOrderField
