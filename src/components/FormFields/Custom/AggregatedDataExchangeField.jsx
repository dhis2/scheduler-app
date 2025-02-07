import i18n from '@dhis2/d2-i18n'
import {
    CircularLoader,
    NoticeBox,
    ReactFinalForm,
    Transfer,
    Field,
} from '@dhis2/ui'
import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDataQuery } from '@dhis2/app-runtime'
import styles from './AggregatedDataExchangeField.module.css'

const { useField } = ReactFinalForm

const query = {
    dataExchangeIds: {
        resource: 'aggregateDataExchanges',
        params: {
            fields: ['id', 'displayName'],
            paging: true,
        },
    },
}

const validate = (value) => {
    if (!value || (value && value.length < 1)) {
        return i18n.t('Please select data exchange ids.')
    }
}

const SelectedEmptyComponent = () => (
    <p className={styles.selectedEmptyComponent}>
        {i18n.t('Select data exchange ids')}
    </p>
)

const AggregatedDataExchangeField = ({ label, name }) => {
    const { loading, error, data } = useDataQuery(query)
    const { input, meta } = useField(name, {
        beforeSubmit: () => !loading || !error,
        validate,
    })
    const handleChange = useCallback(
        ({ selected }) => {
            input?.onChange(selected)
        },
        [input]
    )

    if (loading) {
        return <CircularLoader />
    }

    if (error) {
        return (
            <NoticeBox
                error
                title={i18n.t('There was a problem fetching data exchange ids')}
            >
                <details>
                    <summary>{`${i18n.t('error type')} - ${
                        error.type
                    }`}</summary>
                    {error.details?.message && <p>{error.details?.message}</p>}
                </details>
            </NoticeBox>
        )
    }

    const options =
        data.dataExchangeIds?.aggregateDataExchanges.map((exchangeIds) => ({
            label: exchangeIds.displayName,
            value: exchangeIds.id,
        })) ?? []

    return (
        <Field
            label={label}
            validationText={meta.error?.message}
            error={!!meta.error}
            name={name}
            required
            className={styles.field}
        >
            <Transfer
                options={options}
                onChange={handleChange}
                selected={input?.value || []}
                maxSelections={Infinity}
                enableOrderChange={true}
                filterable={true}
                height={'450px'}
                selectedEmptyComponent={<SelectedEmptyComponent />}
            />
        </Field>
    )
}

AggregatedDataExchangeField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}

export default AggregatedDataExchangeField
