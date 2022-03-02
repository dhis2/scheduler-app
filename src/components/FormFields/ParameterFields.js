import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { PropTypes } from '@dhis2/prop-types'
import { ReactFinalForm, InputFieldFF, Box, SwitchFieldFF } from '@dhis2/ui'
import { hooks } from '../Store'
import { formatToString } from './formatters'
import SkipTableTypesField from './SkipTableTypesField'
import LabeledOptionsField from './LabeledOptionsField'
import DataIntegrityChecksField from './DataIntegrityChecksField'
import TransferField from './Transfer/TransferField'
import styles from './ParameterFields.module.css'

const { Field } = ReactFinalForm

// The key under which the parameters will be sent to the backend
const FIELD_NAME = 'jobParameters'

const getCustomComponent = (jobType, parameterName) => {
    if (jobType === 'DATA_INTEGRITY' && parameterName === 'checks') {
        return DataIntegrityChecksField
    } else if (parameterName === 'skipTableTypes') {
        return SkipTableTypesField
    }
    return null
}

// Renders all parameters for a given jobtype
const ParameterFields = ({ jobType }) => {
    const parameters = hooks.useJobTypeParameters(jobType)

    if (parameters.length === 0) {
        return null
    }

    // Map all parameters to the appropriate field types
    const parameterComponents = parameters.map(({ fieldName, name, klass, ...rest }) => {
        const parameterProps = { name, klass, ...rest }
        const defaultProps = {
            label: fieldName,
            name: `${FIELD_NAME}.${name}`,
        }
        let parameterComponent = null
        console.log('parameter', defaultProps, parameterProps)
        console.log({parameterProps})
        const CustomParameterComponent = getCustomComponent(jobType, name)

        if (CustomParameterComponent) {
            return (
                <Box marginTop="16px" key={name}>
                    <CustomParameterComponent
                        {...defaultProps}
                        parameterName={name}
                    />
                </Box>
            )
        }

        // Generic field rendering
        switch (klass) {
            case 'java.lang.String':
                parameterComponent = (
                    <Field
                        {...defaultProps}
                        component={InputFieldFF}
                        type="text"
                    />
                )
                break
            case 'java.lang.Boolean':
                parameterComponent = (
                    <Field
                        {...defaultProps}
                        component={SwitchFieldFF}
                        type="checkbox"
                    />
                )
                break
            case 'java.lang.Integer':
                parameterComponent = (
                    <Field
                        {...defaultProps}
                        component={InputFieldFF}
                        format={formatToString}
                        type="number"
                    />
                )
                break
            case 'java.util.List':
                parameterComponent = (
                    <LabeledOptionsField
                        {...defaultProps}
                        parameterName={name}
                    />
                )
                break
            case 'java.util.Set':
                parameterComponent = (
                    <TransferField
                        {...defaultProps}
                        parameterName={name}
                        parameterProps={parameterProps}
                    />
                )
                break
        }

        // Wrap all components in a Box for spacing
        return (
            <Box marginTop="16px" key={name}>
                {parameterComponent}
            </Box>
        )
    })

    return (
        <React.Fragment>
            <header>
                <h4 className={styles.headerTitle}>{i18n.t('Parameters')}</h4>
            </header>
            {parameterComponents}
        </React.Fragment>
    )
}

const { string } = PropTypes

ParameterFields.propTypes = {
    jobType: string.isRequired,
}

export default ParameterFields
