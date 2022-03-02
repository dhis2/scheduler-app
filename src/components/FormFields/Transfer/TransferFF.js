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

const { Field, useFormState, useForm } = ReactFinalForm

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
    console.log('ff', options)
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

TransferFF.propTypes = MultiSelectFieldFF.propTypes

export default TransferFF
