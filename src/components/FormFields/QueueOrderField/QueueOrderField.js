import React from 'react'
import PropTypes from 'prop-types'
import { ReactFinalForm, CircularLoader, NoticeBox } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { jobTypesMap } from '../../../services/server-translations'
import { useQueueables } from '../../../hooks/queueables'
import QueueTransfer from './QueueTransfer'

const { Field } = ReactFinalForm

// The key under which this field will be sent to the backend
const FIELD_NAME = 'sequence'
const hasEnoughJobs = (value) =>
    value?.length > 1 ? undefined : i18n.t('Please select at least two jobs')

const QueueOrderField = ({ initialSelectedValues }) => {
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

    // Map to a format the transfer can render
    const options = [...data, ...initialSelectedValues].map(
        ({ name, id, type }) => ({
            label: name,
            value: id,
            type: jobTypesMap[type],
        })
    )

    return (
        <Field
            name={FIELD_NAME}
            component={QueueTransfer}
            options={options}
            validate={hasEnoughJobs}
        />
    )
}

QueueOrderField.defaultProps = {
    initialSelectedValues: [],
}

const { array } = PropTypes

QueueOrderField.propTypes = {
    initialSelectedValues: array,
}

export default QueueOrderField
