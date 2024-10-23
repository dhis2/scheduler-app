import React from 'react'
import i18n from '@dhis2/d2-i18n'
import PropTypes from 'prop-types'
import {
    NoticeBox,
    ReactFinalForm,
    InputFieldFF,
    Box,
    SwitchFieldFF,
} from '@dhis2/ui'
import { useJobTypeParameters } from '../../hooks/job-types'
import SkipTableTypesField from './Custom/SkipTableTypesField.jsx'
import DataIntegrityChecksField from './Custom/DataIntegrityChecksField.jsx'
import DataIntegrityReportTypeField from './Custom/DataIntegrityReportTypeField.jsx'
import AggregatedDataExchangeField from './Custom/AggregatedDataExchangeField.jsx'
import PushAnalyticsModeField from './Custom/PushAnalyticsModeField.jsx'
import TestPolicyField from './Custom/TestPolicyField.jsx'
import styles from './ParameterFields.module.css'
import ListFieldSingle from './ListFieldSingle.jsx'
import ListFieldMulti from './ListFieldMulti.jsx'
import { formatToString } from './formatters'

const { Field } = ReactFinalForm

// The key under which the parameters will be sent to the backend
const FIELD_NAME = 'jobParameters'

// Overrides for fields where the generic types aren't appropriate
const getCustomComponent = (jobType, parameterName) => {
    switch (jobType) {
        case 'DATA_INTEGRITY':
            if (parameterName === 'checks') {
                return DataIntegrityChecksField
            } else if (parameterName === 'type') {
                return DataIntegrityReportTypeField
            }

            return null
        case 'AGGREGATE_DATA_EXCHANGE':
            if (parameterName === 'dataExchangeIds') {
                return AggregatedDataExchangeField
            }

            return null
        case 'ANALYTICS_TABLE':
            if (parameterName === 'skipTableTypes') {
                return SkipTableTypesField
            } else if (parameterName === 'skipPrograms') {
                return ListFieldMulti
            }

            return null
        case 'CONTINUOUS_ANALYTICS_TABLE':
            if (parameterName === 'skipTableTypes') {
                return SkipTableTypesField
            }

            return null
        case 'HTML_PUSH_ANALYTICS':
            if (parameterName === 'dashboard') {
                return ListFieldSingle
            } else if (parameterName === 'receivers') {
                return ListFieldSingle
            } else if (parameterName === 'mode') {
                return PushAnalyticsModeField
            }

            return null
        case 'TEST':
            if (parameterName === 'failWithPolicy') {
                return TestPolicyField
            }

            return null
        default:
            return null
    }
}

// Renders all parameters for a given jobtype
const ParameterFields = ({ jobType }) => {
    const { loading, error, data } = useJobTypeParameters(jobType)

    if (loading) {
        return null
    }

    if (error) {
        return (
            <NoticeBox
                error
                title={i18n.t('There was a problem fetching parameters')}
            />
        )
    }

    if (data.length === 0) {
        return null
    }

    // Map all parameters to the appropriate field types
    const parameterComponents = data.map(
        ({ fieldName, name, klass, ...rest }) => {
            let parameterComponent = null
            const defaultProps = {
                label: fieldName,
                name: `${FIELD_NAME}.${name}`,
            }
            const parameterProps = {
                fieldName,
                name,
                klass,
                ...rest,
            }

            const CustomParameterComponent = getCustomComponent(jobType, name)

            if (CustomParameterComponent) {
                return (
                    <Box marginTop="16px" key={name}>
                        <CustomParameterComponent
                            {...parameterProps}
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
                case 'java.lang.Long':
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
                        <ListFieldMulti
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
        }
    )

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
