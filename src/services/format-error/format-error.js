import { FinalForm } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'

const { FORM_ERROR } = FinalForm

/**
 * Formats the errors returned by our backend to a format that final-form can parse
 */

const formatError = (error) => {
    const validationErrors = {}
    const errorReports = error.details?.response?.errorReports

    /**
     * Return a generic validation error if there are no errorReports
     */
    if (!errorReports?.length) {
        validationErrors[FORM_ERROR] = error.message
            ? [error.message]
            : [i18n.t('Something went wrong but no error message was provided')]

        return validationErrors
    }

    /**
     * Some validation errors do not have a way for us to infer the related field,
     * those can be put in genericErrors
     */
    const genericErrors = []

    errorReports.forEach((report) => {
        /**
         * errorProperty is how the backend indicates the field that the error
         * is related to. If we know this, return it as a field specific error
         * (note that this will swallow errors if the backend indicates a field
         * that does not exist in the frontend). Otherwise we'll push it to the
         * generic errors.
         */
        if (report.errorProperty) {
            validationErrors[report.errorProperty] = report.message
        } else {
            genericErrors.push(report.message)
        }
    })

    if (genericErrors.length > 0) {
        validationErrors[FORM_ERROR] = genericErrors
    }

    return validationErrors
}

export default formatError
