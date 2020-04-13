import { FinalForm } from '@dhis2/ui'

const { FORM_ERROR } = FinalForm

/**
 * Formats the errors returned by our backend to a format that final-form can parse
 */

const formatError = error => {
    const {
        details: { response },
    } = error
    const validationErrors = {}

    /**
     * Some backend errors do not have a way for us to infer the related field,
     * those can be put in genericErrors
     */
    const genericErrors = []

    if (response.errorReports && response.errorReports.length) {
        response.errorReports.forEach(report => {
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
    }

    if (genericErrors.length > 0) {
        validationErrors[FORM_ERROR] = genericErrors
    }

    return validationErrors
}

export default formatError
