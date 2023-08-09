import React from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import { Button, CircularLoader, Box } from '@dhis2/ui'
import { DiscardFormButton, DeleteSequenceButton } from '../Buttons'
import history from '../../services/history'
import { FormErrorBox } from '../FormErrorBox'
import { NameField, CronField, SequenceOrderField } from '../FormFields'
import styles from './SequenceEditForm.module.css'

const SequenceEditForm = ({
    name,
    handleSubmit,
    pristine,
    submitting,
    submitError,
    hasSubmitErrors,
    initialSelectedValues,
}) => {
    // Show a spinner only when submitting
    const Spinner = submitting ? <CircularLoader small /> : null

    return (
        <form onSubmit={handleSubmit}>
            <Box maxWidth="600px">
                <NameField />
            </Box>
            <Box marginTop="16px" maxWidth="400px">
                <CronField />
            </Box>
            <Box marginTop="16px">
                <SequenceOrderField
                    initialSelectedValues={initialSelectedValues}
                />
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
                <span className={styles.deleteButton}>
                    <DeleteSequenceButton
                        name={name}
                        onSuccess={() => {
                            history.push('/')
                        }}
                    />
                </span>
            </div>
        </form>
    )
}

const { func, bool, array, string } = PropTypes

SequenceEditForm.defaultProps = {
    submitError: [],
}

SequenceEditForm.propTypes = {
    handleSubmit: func.isRequired,
    hasSubmitErrors: bool.isRequired,
    name: string.isRequired,
    pristine: bool.isRequired,
    submitting: bool.isRequired,
    initialSelectedValues: array,
    submitError: array,
}

export default SequenceEditForm
