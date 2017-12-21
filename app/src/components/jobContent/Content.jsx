import React, { Component } from 'react';
import Heading from 'd2-ui/lib/headings/Heading.component';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import moment from 'moment';

import cronExpressionRegex from 'constants/cronExp';
import ActionButtons from 'components/jobContent/ActionButtons';
import Schedule from 'components/jobContent/Schedule';
import Parameters from 'components/jobParameters/Parameters';
import ConditionalIconButton from 'components/ConditionalIconButton';
import history from '../../history';

const styles = {
    jobDetails: {
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
    detailsHeader: {
        paddingTop: 24,
        paddingBottom: 16,
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
        errors.name = 'Required';
    } else if (values.name.length < 2) {
        errors.name = 'Must be of two or more characters';
    }

    if (!values.continuousExecution) {
        if (!values.cronExpression) {
            errors.cronExpression = 'Required';
        } else if (!validCronExpression(values.cronExpression)) {
            errors.cronExpression = 'Invalid cron expression';
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
                    confirmationMessage={'Are you sure you want to discard your changes?'}
                    onConfirm={this.discardChanges}
                />
                <Heading style={{ paddingBottom: 16, paddingLeft: 24 }}>{this.props.title}</Heading>
            </div>
            {this.props.job ? (
                <Paper style={styles.jobDetails}>
                    <Heading>Attributes</Heading>
                    <TextField
                        fullWidth
                        value={this.props.job.name}
                        floatingLabelText="Name *"
                        disabled={this.props.disableEditing}
                        onChange={this.handleFieldEvent('name')}
                        errorText={this.state.errors.name}
                    />
                    <Schedule
                        disabled={this.props.disableEditing}
                        cronExpression={this.props.job.cronExpression}
                        continuousExecution={this.props.job.continuousExecution}
                        onCronExpressionChange={this.handleFieldEvent('cronExpression')}
                        onContinuousExecutionChange={this.handleFieldEvent('continuousExecution')}
                        error={this.state.errors.cronExpression}
                    />
                    <SelectField
                        fullWidth
                        disabled={this.props.disableEditing}
                        floatingLabelText="Job type *"
                        value={this.props.job.type}
                        onChange={this.onJobTypeSelected}
                    >
                        {this.props.availableTypes.map(type => (
                            <MenuItem key={type} value={type} primaryText={type} />
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

                    {this.props.job.lastExecuted && (
                        <div>
                            <Heading style={styles.detailsHeader}>Details</Heading>
                            <div>
                                Job created on:{' '}
                                {moment(this.props.job.created).format('DD.MM.YYYY')}
                            </div>
                            <div>
                                Last executed:{' '}
                                {moment(this.props.job.lastExecuted).format('DD.MM.YYYY HH:ss')}
                            </div>
                            <div>Last execution status: {this.props.job.lastExecutedStatus}</div>
                        </div>
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
                <div>Could not find job</div>
            )}
        </div>
    );
}

export default Content;
