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
import { formatToString } from './formatters'
import SkipTableTypesField from './SkipTableTypesField'
import LabeledOptionsField from './LabeledOptionsField'
import DataIntegrityChecksField from './DataIntegrityChecksField'
import DataIntegrityReportTypeField from './DataIntegrityReportTypeField'
import styles from './ParameterFields.module.css'
import AggregatedDataExchangeField from './AggregatedDataExchangeField'

const { Field } = ReactFinalForm

// The key under which the parameters will be sent to the backend
const FIELD_NAME = 'jobParameters'

const JOB_TYPES = {
    DATA_INTEGRITY: 'DATA_INTEGRITY',
    AGGREGATE_DATA_EXCHANGE: 'AGGREGATE_DATA_EXCHANGE',
}

const getCustomComponent = (jobType, parameterName) => {
    if (jobType === JOB_TYPES.DATA_INTEGRITY && parameterName === 'checks') {
        return DataIntegrityChecksField
    } else if (
        jobType === JOB_TYPES.DATA_INTEGRITY &&
        parameterName === 'type'
    ) {
        return DataIntegrityReportTypeField
    } else if (jobType === JOB_TYPES.AGGREGATE_DATA_EXCHANGE) {
        return AggregatedDataExchangeField
    } else if (parameterName === 'skipTableTypes') {
        return SkipTableTypesField
    }
    return null
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
            let parameterComponent = null

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
