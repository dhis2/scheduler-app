import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Button, CircularLoader, Box } from '@dhis2/ui'
import { DiscardFormButton } from '../Buttons'
import { FormErrorBox } from '../FormErrorBox'
import { NameField, CronField, QueueOrderField } from '../FormFields'
import styles from './QueueAddForm.module.css'

const QueueAddForm = ({
    handleSubmit,
    pristine,
    submitting,
    submitError,
    hasSubmitErrors,
}) => {
    // Show a spinner only when submitting
    const Spinner = submitting ? <CircularLoader small /> : null

    return (
        <form onSubmit={handleSubmit}>
            <Box maxWidth="600px">
                <NameField isQueue />
            </Box>
            <Box marginTop="16px" maxWidth="400px">
                <CronField />
            </Box>
            <Box marginTop="16px">
                <QueueOrderField />
            </Box>
            {hasSubmitErrors && (
                <Box marginTop="32px" maxWidth="600px">
                    <FormErrorBox
                        title={i18n.t(
                            'Something went wrong whilst creating your queue'
                        )}
                        submitError={submitError}
                    />
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

QueueAddForm.defaultProps = {
    submitError: [],
}

QueueAddForm.propTypes = {
    handleSubmit: func.isRequired,
    hasSubmitErrors: bool.isRequired,
    pristine: bool.isRequired,
    submitting: bool.isRequired,
    submitError: array,
}

export default QueueAddForm
