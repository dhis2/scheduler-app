import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import i18n from '@dhis2/d2-i18n';
import moment from 'moment';

import { CRON, FIXED_DELAY } from '../../constants/schedulingTypes';
import ActionButtons from './ActionButtons';
import ConditionalIconButton from '../ConditionalIconButton';
import Details from './Details';
import Heading from '../Heading';
import HelpLink from '../HelpLink';
import JobType from './JobType';
import Parameters from '../jobParameters/Parameters';
import Schedule from './Schedule';
import history from '../../utils/history';
import validCronExpression from '../../utils/validCronExpression';

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

const validateFields = (values, jobTypeToSchedulingTypes) => {
    const errors = {};
    const { type } = values;

    if (!values.name) {
        errors.name = i18n.t('Required');
    } else if (values.name.length < 2) {
        errors.name = i18n.t('Must be of two or more characters');
    }

    if (!values.type) {
        errors.type = i18n.t('Required');
    }

    if (jobTypeToSchedulingTypes[type] === CRON) {
        if (!values.cronExpression) {
            errors.cronExpression = i18n.t('Required');
        } else if (!validCronExpression(values.cronExpression)) {
            errors.cronExpression = i18n.t('Invalid cron expression');
        }
    }

    if (jobTypeToSchedulingTypes[type] === FIXED_DELAY) {
        const { delay } = values;

        if (delay !== 0 && !delay) {
            errors.delay = i18n.t('Required');
        } else if (!Number.isInteger(delay) && !delay.match(/^\d+/)) {
            errors.delay = i18n.t('Delay needs to be an integer');
        } else if (delay === 0) {
            errors.delay = i18n.t('Delay must be greater than 0');
        } else if (delay > 86400) {
            errors.delay = i18n.t("Delay can't exceed 86400 seconds");
        }
    }

    return errors;
};

class Content extends Component {
    state = { isValid: true, errors: {} };

    componentWillReceiveProps = nextProps => {
        const { job, jobTypeToSchedulingTypes } = nextProps;
        if (this.props.job !== job) {
            const errors = validateFields(job, jobTypeToSchedulingTypes);

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

                    <JobType
                        disabled={this.props.disableEditing}
                        value={this.props.job.type}
                        onChange={this.onJobTypeSelected}
                        errorText={this.state.errors.type}
                    />

                    <Schedule
                        jobType={this.props.job.type}
                        disabled={false}
                        cronExpression={this.props.job.cronExpression}
                        delay={this.props.job.delay}
                        onCronExpressionChange={this.handleFieldEvent('cronExpression')}
                        onDelayChange={this.handleFieldEvent('delay')}
                        cronError={this.state.errors.cronExpression}
                        delayError={this.state.errors.delay}
                    />

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

const ConnectedContent = connect(
    state => ({
        jobTypeToSchedulingTypes: state.jobs.configuration.typeToSchedulingTypes,
    }),
)(Content);

export default ConnectedContent;
