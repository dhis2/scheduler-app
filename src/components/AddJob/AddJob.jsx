import React from 'react';
import { string, object, func, bool, shape, array } from 'prop-types';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import i18n from '@dhis2/d2-i18n';

import Parameters from '../Parameters';
import Heading from '../Heading';
import Schedule from '../Schedule';
import { DialogButton, ActionButtons, HelpButton } from '../Buttons';
import Spinner from '../Spinner';

const documentationHref =
    'https://docs.dhis2.org/master/en/user/html/dataAdmin_scheduling.html#dataAdmin_scheduling_config';

const styles = {
    jobContent: {
        padding: 24,
    },
    continuousExecutionToggle: {
        marginTop: 22,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    jobTypeList: {
        maxHeight: 300,
        overflowY: 'auto',
    },
    attributeHeaderContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    attributeHeader: {
        padding: 0,
    },
};

const AddJob = ({
    attributeOptions,
    availableParameters,
    availableTypes,
    discardChanges,
    errors,
    handleFormChange,
    handleSubmit,
    isDirty,
    isValid,
    job,
    hasLoaded,
    pending,
}) => {
    const onJobTypeSelected = (event, index) => {
        if (index !== -1) {
            handleFormChange({ type: availableTypes[index] });
        }
    };

    if (!hasLoaded) {
        return <Spinner />;
    }

    return (
        <div>
            <div style={styles.header}>
                <DialogButton
                    icon="arrow_back"
                    showConfirmation={isDirty}
                    confirmationMessage={i18n.t('Are you sure you want to discard your changes?')}
                    onConfirm={discardChanges}
                />
                <Heading>{i18n.t('Add new job')}</Heading>
            </div>
            <Paper style={styles.jobContent}>
                <div style={styles.attributeHeaderContainer}>
                    <Heading style={styles.attributeHeader}>{i18n.t('Attributes')}</Heading>
                    <HelpButton href={documentationHref} />
                </div>
                <TextField
                    fullWidth
                    value={job.name}
                    floatingLabelText={`${i18n.t('Name')} *`}
                    onChange={(event, value) => handleFormChange({ name: value })}
                    errorText={errors.name}
                />
                <Schedule
                    cronExpression={job.cronExpression}
                    continuousExecution={job.continuousExecution}
                    onCronExpressionChange={(event, value) => handleFormChange({ cronExpression: value })}
                    onContinuousExecutionChange={(event, value) => handleFormChange({ continuousExecution: value })}
                    error={errors.cronExpression}
                />
                <SelectField
                    fullWidth
                    floatingLabelText={`${i18n.t('Job type')} *`}
                    value={job.type}
                    onChange={onJobTypeSelected}
                >
                    {availableTypes.map(type => (
                        <MenuItem key={type} value={type} primaryText={i18n.t(type)} />
                    ))}
                </SelectField>

                {job.type && (
                    <Parameters
                        type={job.type}
                        parameters={job.parameters}
                        availableParameters={availableParameters}
                        attributeOptions={attributeOptions}
                        onChange={value => handleFormChange({ parameters: value })}
                    />
                )}

                <ActionButtons
                    job={job}
                    update={{
                        submit: handleSubmit,
                        label: 'Add job',
                        pending: pending.update,
                        disabled:
                            !isDirty ||
                            !isValid ||
                            pending.update,
                    }}
                />
            </Paper>
        </div>
    );
};

AddJob.propTypes = {
    job: shape({
        name: string,
        cronExpression: string,
        continuousExecution: bool,
        type: string,
        parameters: object,
    }).isRequired,
    hasLoaded: bool.isRequired,
    handleSubmit: func.isRequired,
    discardChanges: func.isRequired,
    handleFormChange: func.isRequired,
    pending: object.isRequired,
    isDirty: bool.isRequired,
    availableTypes: array.isRequired,
    availableParameters: object.isRequired,
    attributeOptions: object.isRequired,
    errors: object.isRequired,
    isValid: bool.isRequired,
};

export default AddJob;
