import React from 'react'
import PropTypes from 'prop-types'
import { SingleSelectFieldFF, ReactFinalForm } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { getReportTypeLabel } from '../../services/server-translations/dataIntegrityChecks'

const { Field } = ReactFinalForm

const DEFAULT_VALUE = 'REPORT'

const DataIntegrityReportTypeField = ({ name, constants }) => {
    if (!constants) {
        // shouldn't really happen, but backend defaults to "report" if no value
        return null
    }

    const labeledOptions = constants.map((type) => ({
        value: type,
        label: getReportTypeLabel(type),
    }))

    return (
        <Field
            name={name}
            component={SingleSelectFieldFF}
            initialValue={DEFAULT_VALUE}
            options={labeledOptions}
            label={i18n.t('Report type')}
        />
    )
}

const { string, arrayOf } = PropTypes

DataIntegrityReportTypeField.propTypes = {
    name: string.isRequired,
    constants: arrayOf(string),
}

export default DataIntegrityReportTypeField
