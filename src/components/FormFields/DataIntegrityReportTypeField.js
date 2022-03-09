import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import {
    SingleSelectFieldFF,
    ReactFinalForm,
} from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { getReportTypeLabel } from '../../services/server-translations/dataIntegrityChecks'
const { Field } = ReactFinalForm

// A labeled options field has options that have both an id and a label.
const DataIntegrityReportTypeField = ({
    name,
    parameterProps: { constants },
}) => {
    if (!constants) {
        // shouldn't really happen, but backend defaults to "report" if no value
        return null
    }

    const labeledOptions = constants.map(type => ({
        value: type,
        label: getReportTypeLabel(type),
    }))

    return (
        <Field
            name={name}
            component={SingleSelectFieldFF}
            initialValue={'REPORT'}
            options={labeledOptions}
            label={i18n.t('Report type')}
        />
    )
}

const { string, arrayOf } = PropTypes

DataIntegrityReportTypeField.propTypes = {
    name: string.isRequired,
    parameterProps: PropTypes.shape({
        constants: arrayOf(string),
    }),
}

export default DataIntegrityReportTypeField
