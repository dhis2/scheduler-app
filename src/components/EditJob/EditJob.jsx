import React from 'react';
import { string, object, func, bool, shape, array } from 'prop-types';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import i18n from '@dhis2/d2-i18n';

import ParameterList from '../ParameterList';
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

const EditJob = ({
    availableTypes,
    errors,
    handleDelete,
    handleDiscard,
    handleFormChange,
    handleParameterChange,
    handleSubmit,
    handleTypeChange,
    isDeleting,
    isDirty,
    isLoading,
    isUpdating,
    isValid,
    job,
}) => {
    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div>
            <div style={styles.header}>
                <DialogButton
                    icon="arrow_back"
                    showConfirmation={isDirty}
                    confirmationMessage={i18n.t('Are you sure you want to discard your changes?')}
                    onConfirm={handleDiscard}
                />
                <Heading>{job.name}</Heading>
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
                    onChange={handleTypeChange}
                >
                    {availableTypes.map(type => (
                        <MenuItem key={type} value={type} primaryText={i18n.t(type)} />
                    ))}
                </SelectField>
                <ParameterList
                    type={job.type}
                    values={job.parameters || {}}
                    handleParameterChange={handleParameterChange}
                />
                <ActionButtons
                    job={job}
                    update={{
                        submit: handleSubmit,
                        label: i18n.t('Save changes'),
                        pending: isUpdating,
                        disabled:
                            !isDirty ||
                            !isValid ||
                            isUpdating,
                    }}
                    delete={{
                        submit: handleDelete,
                        label: i18n.t('Delete job'),
                        pending: isDeleting,
                        disabled: isDeleting,
                    }}
                />
            </Paper>
        </div>
    );
};

EditJob.propTypes = {
    availableTypes: array.isRequired,
    errors: object.isRequired,
    handleDelete: func.isRequired,
    handleDiscard: func.isRequired,
    handleFormChange: func.isRequired,
    handleParameterChange: func.isRequired,
    handleSubmit: func.isRequired,
    isDeleting: bool.isRequired,
    isDirty: bool.isRequired,
    isLoading: bool.isRequired,
    isUpdating: bool.isRequired,
    isValid: bool.isRequired,
    job: shape({
        continuousExecution: bool,
        cronExpression: string,
        type: string,
        name: string,
        parameters: object,
    }).isRequired,
};

export default EditJob;
