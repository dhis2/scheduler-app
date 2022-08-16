import i18n from '@dhis2/d2-i18n'
import {
    CircularLoader,
    FieldGroup,
    Help,
    InputFieldFF,
    NoticeBox,
    ReactFinalForm,
} from '@dhis2/ui'
import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { useDataQuery } from '@dhis2/app-runtime'
import styles from './DataIntegrityChecksField.module.css'
import TransferFieldFF from './TransferFieldFF'

const { Field } = ReactFinalForm

const query = {
    dataExchangeIds: {
        resource: 'aggregateDataExchanges',
        params: {
            fields: ['id', 'displayName'],
        },
    },
}

const AggregatedDataExchangeField = ({ label, name }) => {
    const { loading, error, data } = useDataQuery(query)

    const fieldContent = loading
        ? CircularLoader
        : error
        ? (props) => <ErrorFieldDisplay {...props} error={error} />
        : AggregatedDataExchangeTransferField

    const options = data?.dataExchangeIds?.aggregateDataExchanges
        ? data.dataExchangeIds.aggregateDataExchanges.map((exchangeIds) => ({
              label: exchangeIds.displayName,
              value: exchangeIds.id,
          }))
        : []

    const validator = (value) => {
        if (error) {
            return i18n.t('Data exchange ids are needed. Try again later')
        }

        if (!value || (value && value.length < 1)) {
            return i18n.t('Please select data exchange ids.')
        }
    }

    return (
        <FieldGroup label={i18n.t('Data exchange ids')}>
            <Field
                name={name}
                component={fieldContent}
                options={options}
                label={label}
                validate={validator}
                beforeSubmit={() => !loading}
            />
        </FieldGroup>
    )
}

const ErrorFieldDisplay = ({ meta, error }) => {
    const isErr = meta?.touched && meta?.invalid

    return (
        <>
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
            {isErr && <Help error>{meta.error}</Help>}
        </>
    )
}

ErrorFieldDisplay.propTypes = {
    error: PropTypes.shape({
        details: PropTypes.shape({
            message: PropTypes.string,
        }),
        type: PropTypes.string,
    }),
    meta: InputFieldFF.propTypes.meta,
}

const AggregatedDataExchangeTransferField = (props) => (
    <TransferFieldFF
        {...props}
        selectedEmptyComponent={<SelectedEmptyComponent />}
        className={styles.transfer}
    />
)

const SelectedEmptyComponent = () => (
    <p className={styles.selectedEmptyComponent}>
        {i18n.t('Select data exchange ids')}
    </p>
)

AggregatedDataExchangeField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}

export default AggregatedDataExchangeField
