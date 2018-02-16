import React, { Component } from 'react';
import Heading from 'd2-ui/lib/headings/Heading.component';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import moment from 'moment';
import i18next from 'i18next';

import cronExpressionRegex from 'constants/cronExp';
import ActionButtons from 'components/jobContent/ActionButtons';
import Schedule from 'components/jobContent/Schedule';
import Parameters from 'components/jobParameters/Parameters';
import ConditionalIconButton from 'components/ConditionalIconButton';
import Details from 'components/jobContent/Details';
import history from 'utils/history';

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
};

const validCronExpression = exp => exp.trim().match(cronExpressionRegex) !== null;

const validateFields = values => {
    const errors = {};
    if (!values.name) {
        errors.name = i18next.t('required');
    } else if (values.name.length < 2) {
        errors.name = i18next.t('must_be_of_two_or_more_characters');
    }

    if (!values.continuousExecution) {
        if (!values.cronExpression) {
            errors.cronExpression = i18next.t('required');
        } else if (!validCronExpression(values.cronExpression)) {
            errors.cronExpression = i18next.t('invalid_cron_expression');
        }
    }

    return errors;
};

class Content extends Component {
    state = { isValid: true, errors: {} };

    componentWillReceiveProps = nextProps => {
        if (this.props.job !== nextProps.job) {
            const errors = validateFields(nextProps.job);
            this.setState({
                isValid: Object.keys(errors).length === 0,
                errors,
            });
        }
    };

    onJobTypeSelected = (event, index) => {
        if (index !== -1) {
            this.props.editJob('type', this.props.availableTypes[index]);
        }
    };

    onSubmit = () => {
        this.props.save(this.props.job);
    };

    onDelete = () => {
        this.props.delete(this.props.job.id);
    };

    discardChanges = () => {
        history.replace('/');
    };

    handleFieldChange = field => value => {
        this.props.editJob(field, value);
    };

    handleFieldEvent = field => (event, value) => {
        this.props.editJob(field, value);
    };

    renderLastExecutionText = () => {
        const lastExecution = moment(this.props.job.lastExecuted);
        return (
            <div>
                Last executed on <b>{}</b> at <b>{lastExecution.format('HH:ss')}</b>, status:{' '}
                {this.props.job.lastExecutedStatus}
            </div>
        );
    };

    render = () => (
        <div>
            <div style={styles.header}>
                <ConditionalIconButton
                    icon="arrow_back"
                    showConfirmation={this.props.dirty}
                    confirmationMessage={i18next.t('are_you_sure_you_want_to_discard_your_changes')}
                    onConfirm={this.discardChanges}
                />
                <Heading style={{ paddingBottom: 16, paddingLeft: 24 }}>{this.props.title}</Heading>
            </div>
            {this.props.job ? (
                <Paper style={styles.jobContent}>
                    <Heading>{i18next.t('attributes')}</Heading>
                    <TextField
                        fullWidth
                        value={this.props.job.name}
                        floatingLabelText={`${i18next.t('name')} *`}
                        disabled={this.props.disableEditing}
                        onChange={this.handleFieldEvent('name')}
                        errorText={this.state.errors.name}
                    />
                    <Schedule
                        disabled={false}
                        cronExpression={this.props.job.cronExpression}
                        continuousExecution={this.props.job.continuousExecution}
                        onCronExpressionChange={this.handleFieldEvent('cronExpression')}
                        onContinuousExecutionChange={this.handleFieldEvent('continuousExecution')}
                        error={this.state.errors.cronExpression}
                    />
                    <SelectField
                        fullWidth
                        disabled={this.props.disableEditing}
                        floatingLabelText={`${i18next.t('job_type')} *`}
                        value={this.props.job.type}
                        onChange={this.onJobTypeSelected}
                    >
                        {this.props.availableTypes.map(type => (
                            <MenuItem key={type} value={type} primaryText={i18next.t(type)} />
                        ))}
                    </SelectField>

                    {this.props.job.type && (
                        <Parameters
                            type={this.props.job.type}
                            parameters={this.props.job.parameters}
                            availableParameters={this.props.availableParameters}
                            attributeOptions={this.props.attributeOptions}
                            onChange={this.handleFieldChange('parameters')}
                        />
                    )}

                    {this.props.job.created && (
                        <Details
                            createdOn={this.props.job.created}
                            lastExecuted={this.props.job.lastExecuted}
                            lastExecutedStatus={this.props.job.lastExecutedStatus}
                        />
                    )}

                    <ActionButtons
                        job={this.props.job}
                        save={this.onSubmit}
                        disabled={this.props.disableEditing}
                        saveEnabled={this.props.dirty && this.state.isValid}
                        delete={this.onDelete}
                        saveLabel={this.props.saveLabel}
                        deleteLabel={this.props.deleteLabel}
                    />
                </Paper>
            ) : (
                <div>{i18next.t('could_not_find_job')}</div>
            )}
        </div>
    );
}

export default Content;
