import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import moment from 'moment';
import i18n from '@dhis2/d2-i18n';

import validCronExpression from '../../utils/validCronExpression';
import history from '../../utils/history';
import Parameters from '../jobParameters/Parameters';
import ConditionalIconButton from '../ConditionalIconButton';
import Details from './Details';
import HelpLink from '../HelpLink';
import Heading from '../Heading';
import Schedule from './Schedule';
import ActionButtons from './ActionButtons';

const documentationHref =
    'https://docs.dhis2.org/master/en/user/html/dataAdmin_scheduling.html#dataAdmin_scheduling_config';

const styles = {
    jobContent: {
        padding: 24,
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

const validateFields = values => {
    const errors = {};
    if (!values.name) {
        errors.name = i18n.t('Required');
    } else if (values.name.length < 2) {
        errors.name = i18n.t('Must be of two or more characters');
    }

    if (!values.cronExpression) {
        errors.cronExpression = i18n.t('Required');
    } else if (!validCronExpression(values.cronExpression)) {
        errors.cronExpression = i18n.t('Invalid cron expression');
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
                    confirmationMessage={i18n.t('Are you sure you want to discard your changes?')}
                    onConfirm={this.discardChanges}
                />
                <Heading style={{ paddingBottom: 16, paddingLeft: 24 }}>{this.props.title}</Heading>
            </div>
            {this.props.job ? (
                <Paper style={styles.jobContent}>
                    <div style={styles.attributeHeaderContainer}>
                        <Heading style={styles.attributeHeader}>{i18n.t('Attributes')}</Heading>
                        <HelpLink href={documentationHref} />
                    </div>
                    <TextField
                        fullWidth
                        value={this.props.job.name || ''}
                        floatingLabelText={`${i18n.t('Name')} *`}
                        disabled={this.props.disableEditing}
                        onChange={this.handleFieldEvent('name')}
                        errorText={this.state.errors.name}
                    />
                    <Schedule
                        disabled={false}
                        cronExpression={this.props.job.cronExpression}
                        onCronExpressionChange={this.handleFieldEvent('cronExpression')}
                        error={this.state.errors.cronExpression}
                    />
                    <SelectField
                        fullWidth
                        disabled={this.props.disableEditing}
                        floatingLabelText={`${i18n.t('Job type')} *`}
                        value={this.props.job.type}
                        onChange={this.onJobTypeSelected}
                    >
                        {this.props.availableTypes.map(type => (
                            <MenuItem key={type} value={type} primaryText={i18n.t(type)} />
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
                        update={{
                            submit: this.onSubmit,
                            label: this.props.saveLabel,
                            pending: this.props.pending.update,
                            disabled:
                                !this.props.dirty ||
                                !this.state.isValid ||
                                this.props.pending.update,
                        }}
                        delete={
                            this.props.deleteLabel
                                ? {
                                      submit: this.onDelete,
                                      label: this.props.deleteLabel,
                                      pending: this.props.pending.delete,
                                      disabled: this.props.pending.delete,
                                  }
                                : {}
                        }
                    />
                </Paper>
            ) : (
                <div>{i18n.t('Could not find job')}</div>
            )}
        </div>
    );
}

export default Content;
