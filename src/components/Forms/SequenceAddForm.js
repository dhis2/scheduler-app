import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Button, CircularLoader, Box, ReactFinalForm } from '@dhis2/ui'
import { DiscardFormButton } from '../Buttons'
import { FormErrorBox } from '../FormErrorBox'
import { SequenceNameField } from '../FormFields'
import styles from './SequenceAddForm.module.css'

const { useForm } = ReactFinalForm

const SequenceAddForm = ({
    handleSubmit,
    pristine,
    submitting,
    submitError,
    hasSubmitErrors,
    setIsPristine,
}) => {
    const { subscribe } = useForm()

    /**
     * Lift pristine state up on changes, wrapped in useEffect because calls to setState
     * outside of the component that owns the setState should not happen synchronously.
     */
    useEffect(() =>
        /**
         * The subscriber will only be called when pristine changes. It returns a
         * cleanup function.
         * https://final-form.org/docs/final-form/types/FormApi#subscribe
         */
        subscribe(({ pristine }) => setIsPristine(pristine), { pristine: true })
    )

    // Show a spinner only when submitting
    const Spinner = submitting ? <CircularLoader small /> : null

    return (
        <form onSubmit={handleSubmit}>
            <Box maxWidth="600px">
                <SequenceNameField />
            </Box>
            <Box marginTop="16px" maxWidth="400px">
                {/*<JobTypeField />*/}
            </Box>
            {hasSubmitErrors && (
                <Box marginTop="32px" maxWidth="600px">
                    <FormErrorBox submitError={submitError} />
                </Box>
            )}
            <div className={styles.formButtonContainer}>
                <Button
                    primary
                    type="submit"
                    disabled={pristine || submitting}
                    icon={Spinner}
                    className={styles.saveButton}
                >
                    {i18n.t('Save')}
                </Button>
                <DiscardFormButton shouldConfirm={!pristine}>
                    {i18n.t('Cancel')}
                </DiscardFormButton>
            </div>
        </form>
    )
}

const { func, bool, array } = PropTypes

SequenceAddForm.defaultProps = {
    submitError: [],
}

SequenceAddForm.propTypes = {
    handleSubmit: func.isRequired,
    hasSubmitErrors: bool.isRequired,
    pristine: bool.isRequired,
    setIsPristine: func.isRequired,
    submitting: bool.isRequired,
    submitError: array,
}

export default SequenceAddForm
