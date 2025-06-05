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
import SkipTableTypesField from './Custom/SkipTableTypesField'
import DataIntegrityChecksField from './Custom/DataIntegrityChecksField'
import DataIntegrityReportTypeField from './Custom/DataIntegrityReportTypeField'
import AggregatedDataExchangeField from './Custom/AggregatedDataExchangeField'
import PushAnalyticsModeField from './Custom/PushAnalyticsModeField'
import TestPolicyField from './Custom/TestPolicyField'
import styles from './ParameterFields.module.css'
import ListFieldSingle from './ListFieldSingle'
import ListFieldMulti from './ListFieldMulti'
import { formatToString } from './formatters'

const { Field } = ReactFinalForm

// The key under which the parameters will be sent to the backend
const FIELD_NAME = 'jobParameters'

// Overrides for fields where the generic types aren't appropriate
const customComponentLookup = {
    DATA_INTEGRITY: {
        checks: DataIntegrityChecksField,
        type: DataIntegrityReportTypeField,
    },
    AGGREGATE_DATA_EXCHANGE: {
        dataExchangeIds: AggregatedDataExchangeField,
    },
    ANALYTICS_TABLE: {
        skipTableTypes: SkipTableTypesField,
        skipPrograms: ListFieldMulti,
    },
    CONTINUOUS_ANALYTICS_TABLE: {
        skipTableTypes: SkipTableTypesField,
    },
    HTML_PUSH_ANALYTICS: {
        dashboard: ListFieldSingle,
        receivers: ListFieldSingle,
        mode: PushAnalyticsModeField,
    },
    TEST: {
        failWithPolicy: TestPolicyField,
    },
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

            const CustomParameterComponent =
                customComponentLookup?.[jobType]?.[name]

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
