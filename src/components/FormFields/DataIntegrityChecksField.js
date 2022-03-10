import React, { useCallback, useState } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import i18n from '@dhis2/d2-i18n'
import {
    FieldGroup,
    Radio,
    Transfer,
    TransferOption,
    ReactFinalForm,
    InputFieldFF,
    Help,
} from '@dhis2/ui'
import cx from 'classnames'
import { hooks } from '../Store'
import {
    getCheckName,
    severityMap,
} from '../../services/server-translations/dataIntegrityChecks'
import styles from './DataIntegrityChecksField.module.css'

const { Field, useField } = ReactFinalForm

const VALIDATOR = value =>
    value && value.length < 1
        ? i18n.t('Please select checks to run.')
        : undefined

const DataIntegrityChecksField = ({ label, name }) => {
    const options = hooks.useParameterOptions('dataIntegrityChecks')
    const {
        input: { value, onChange },
    } = useField(name)

    const hasValue = !!value && value.length > 0
    const [runSelected, setRunSelected] = useState(hasValue)

    const translatedOptions = options
        .map(option => ({
            ...option,
            value: option.name,
            label: getCheckName(option.name),
            severity: severityMap[option.severity],
        }))
        .sort((a, b) => a.label.localeCompare(b.label))

    const toggle = ({ value }) => {
        const checked = value === 'true'

        if (!checked) {
            // clear checks when "Run all" is selected
            onChange([])
        }
        setRunSelected(checked)
    }

    return (
        <FieldGroup label={i18n.t('Checks to run')}>
            <Radio
                name={'checksToRun'}
                value={"false"}
                label={i18n.t('Run all available checks')}
                checked={!runSelected}
                onChange={toggle}
            />
            <Radio
                name={'checksToRun'}
                value={"true"}
                label={i18n.t('Only run selected checks')}
                checked={runSelected}
                onChange={toggle}
            />
            <Field
                name={name}
                component={ChecksTransfer}
                options={translatedOptions}
                label={label}
                validate={VALIDATOR}
                // conditional rendering of FinalForm-fields cause some issues,
                // see https://github.com/final-form/react-final-form/issues/809
                hidden={!runSelected}
            />
        </FieldGroup>
    )
}

const LabelComponent = ({ label, severity, highlighted, disabled }) => (
    <div
        className={cx(styles.transferOption, {
            [styles.highlighted]: highlighted,
            [styles.disabled]: disabled,
        })}
    >
        <div className={styles.optionName}>{label}</div>
        <div
            className={cx(styles.optionSeverity, {
                [styles.highlighted]: highlighted,
            })}
        >{`${i18n.t('Severity')}: ${severity}`}</div>
    </div>
)

LabelComponent.propTypes = TransferOption.propTypes

const renderOption = option => (
    <TransferOption {...option} label={<LabelComponent {...option} />} />
)

const ChecksTransfer = ({ input, meta, options = [], hidden }) => {
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
            <Transfer
                options={options}
                onChange={handleChange}
                selected={input.value || []}
                renderOption={renderOption}
                maxSelections={Infinity}
                enableOrderChange={true}
                filterable={true}
                height={'450px'}
                selectedEmptyComponent={<SelectedEmptyComponent />}
                className={styles.transfer}
            />
            {isErr && <Help error={isErr}>{meta.error}</Help>}
        </>
    )
}

ChecksTransfer.propTypes = InputFieldFF.propTypes

const SelectedEmptyComponent = () => (
    <p className={styles.selectedEmptyComponent}>
        {i18n.t('Select checks to run.')}
    </p>
)

const { string } = PropTypes

DataIntegrityChecksField.propTypes = {
    label: string.isRequired,
    name: string.isRequired,
}

export default DataIntegrityChecksField
