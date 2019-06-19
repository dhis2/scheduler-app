import React from 'react';
import { string, object, func, bool, shape } from 'prop-types';
import Paper from 'material-ui/Paper';
import i18n from '@dhis2/d2-i18n';

import ParameterList from '../../components/ParameterList';
import Heading from '../../components/Heading';
import { DialogButton, ActionButtons, HelpButton } from '../../components/Buttons';
import Spinner from '../../components/Spinner';
import { Name, Type, Cron } from '../../components/JobFields';

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
                <Name
                    value={job.name}
                    onChange={(event, value) => handleFormChange({ name: value })}
                    errorText={errors.name}
                />
                <Cron
                    cronExpression={job.cronExpression}
                    continuousExecution={job.continuousExecution}
                    onCronExpressionChange={(event, value) => handleFormChange({ cronExpression: value })}
                    onContinuousExecutionChange={(event, value) => handleFormChange({ continuousExecution: value })}
                    error={errors.cronExpression}
                />
                <Type value={job.type} onChange={handleTypeChange} />
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
