import React, { useContext } from 'react'
import i18n from '@dhis2/d2-i18n'
import { PropTypes } from '@dhis2/prop-types'
import { ReactFinalForm, InputFieldFF, SwitchFieldFF, Box } from '@dhis2/ui'
import { selectors, StoreContext } from '../Store'
import { formatToString } from './formatters'
import SkipTableTypesField from './SkipTableTypesField'
import LabeledOptionsField from './LabeledOptionsField'
import styles from './ParameterFields.module.css'

const { Field } = ReactFinalForm

// The key under which the parameters will be sent to the backend
const FIELD_NAME = 'jobParameters'

// Renders all parameters for a given jobtype
const ParameterFields = ({ jobType }) => {
    const store = useContext(StoreContext)
    const parameters = selectors.getJobTypeParameters(store, jobType)

    if (parameters.length === 0) {
        return null
    }

    // Map all parameters to the appropriate field types
    const parameterComponents = parameters.map(({ fieldName, name, klass }) => {
        const defaultProps = {
            label: fieldName,
            name: `${FIELD_NAME}.${name}`,
        }
        let parameterComponent = null

        // Specific case, as the options here need specific translations
        if (name === 'skipTableTypes') {
            return (
                <Box marginTop="16px" key={name}>
                    <SkipTableTypesField
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
