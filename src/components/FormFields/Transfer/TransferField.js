import React, { useCallback } from 'react'
import {
    Box,
    ReactFinalForm,
    MultiSelectFieldFF,
    Help,
    Transfer,
} from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import styles from './TransferField.module.css'
import { hooks } from '../../Store'
import PaginatedTransfer from './PaginatedTransfer'

const { Field, useFormState, useForm } = ReactFinalForm

const programQuery = {
    programs: {
        resource: 'programs',
        params: {
            paging: true,
            pageSize: 5,
        },
    
    },
}
const queries = new Map([['programs', programQuery]])

const TransferField = ({ name, parameterName, parameterProps }) => {
    const options = hooks.useParameterOptions(name)
    const resource = parameterProps.relativeApiEndpoint.replace('/api/', '')
    const resourceQuery = queries.get(resource)

    console.log({ resource, resourceQuery })
    let TransferComponent = TransferFF
    if (resourceQuery && resourceQuery.paging !== false) {
        TransferComponent = PaginatedTransfer
    }

    return (
        <React.Fragment>
            <Field
                key={resource}
                component={TransferComponent}
                name={name}
                label={parameterName}
                enableOrderChange={parameterProps.ordered}
                options={options}
                parameterName={parameterName}
                parameterProps={parameterProps}
                query={resourceQuery}
                resource={resource}
            />
        </React.Fragment>
    )
}

const TransferFF = ({ input, meta, options = [], hidden, label, ...rest }) => {
    const { onChange } = input

    const handleChange = useCallback(
        ({ selected }) => {
            onChange(selected)
        },
        [onChange]
    )

    if (hidden) {
        return null
    }

    const isErr = meta.touched && meta.invalid

    return (
        <>
            <Help>{label}</Help>
            <Transfer
                options={options}
                onChange={handleChange}
                selected={input.value || []}
                maxSelections={Infinity}
                enableOrderChange={true}
                filterable={true}
                height={'450px'}
                className={styles.transfer}
                {...rest}
            />
            {isErr && <Help error={isErr}>{meta.error}</Help>}
        </>
    )
}

const SelectedEmptyComponent = () => (
    <p className={styles.selectedEmptyComponent}>
        {i18n.t('Select checks to run.')}
    </p>
)

TransferFF.propTypes = MultiSelectFieldFF.propTypes

export default TransferField
