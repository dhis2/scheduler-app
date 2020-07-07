import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { ReactFinalForm, InputFieldFF, SwitchFieldFF, Box } from '@dhis2/ui'
import { useDataQuery } from '@dhis2/app-runtime'
import { getJobTypeParameters, getParameterEndpoint } from './selectors'
import UnlabeledOptionsField from './UnlabeledOptionsField'
import LabeledOptionsField from './LabeledOptionsField'
import styles from './ParameterFields.module.css'

const { Field } = ReactFinalForm

/**
 * Our backend returns  'java.lang.Integer' as a number, but our
 * inputs expect and return a string, so we're formatting it to a string.
 */
const formatToString = value => {
    if (typeof value === 'number') {
        return value.toString()
    }

    return value
}

// The key under which the parameters will be sent to the backend
const FIELD_NAME = 'jobParameters'

const query = {
    jobTypes: {
        resource: 'jobConfigurations/jobTypes',
    },
}

// Renders all parameters for a given jobtype
const ParameterFields = ({ jobType }) => {
    const { loading, error, data } = useDataQuery(query)

    if (loading) {
        return null
    }

    if (error) {
        /**
         * We need the parameters, so throw the error if these
         * can't be loaded.
         */
        throw error
    }

    const parameters = getJobTypeParameters(data.jobTypes.jobTypes, jobType)

    if (parameters.length === 0) {
        return null
    }

    // Map all parameters to the appropriate field types
    const parameterComponents = parameters.map(
        ({ fieldName, name, klass, relativeApiEndpoint }) => {
            const defaultProps = {
                label: fieldName,
                name: `${FIELD_NAME}.${name}`,
            }
            const endpoint = getParameterEndpoint(relativeApiEndpoint)
            let parameterComponent = null

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
                case 'java.util.Set':
                    parameterComponent = (
                        <UnlabeledOptionsField
                            {...defaultProps}
                            endpoint={endpoint}
                        />
                    )
                    break
                case 'java.util.List':
                    parameterComponent = (
                        <LabeledOptionsField
                            {...defaultProps}
                            parameterName={name}
                            endpoint={endpoint}
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
        }
    )

    return (
        <React.Fragment>
            <header>
                <h4 className={styles.headerTitle}>Monitoring parameters</h4>
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
