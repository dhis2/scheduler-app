import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Heading from 'd2-ui/lib/headings/Heading.component';
import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import moment from 'moment';

import * as actionTypes from 'constants/actionTypes';
import cronExpressionRegex from 'constants/cronExp';
import JobActionPanel from 'components/JobActionPanel';
import JobParameters from 'components/JobParameters';
import ConditionalIconButton from 'components/ConditionalIconButton';
import { paramTypes } from 'constants/paramTypes';
import history from '../history';

const styles = {
    jobDetails: {
        padding: 24,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailsHeader: {
        paddingTop: 24,
        paddingBottom: 16,
    }
};

const validCronExpression = exp =>
    exp.trim().match(cronExpressionRegex) !== null;

const validateFields = values => {
    let errors = {};

    if (!values.name) {
        errors.name = 'Required';
    } else if (values.name.length < 2) {
        errors.name = 'Must be of two or more characters';
    }

    if (!values.cronExpression) {
        errors.cronExpression = 'Required';
    } else if (!validCronExpression(values.cronExpression)) {
        errors.cronExpression = 'Invalid cron expression';
    }

    return errors;
}

class JobDetails extends Component {
    state = { isValid: true, errors: {} }
    componentWillReceiveProps = (nextProps) => {
        if (this.props.job !== nextProps.job) {
            const errors = validateFields(nextProps.job);
            this.setState({
                isValid: Object.keys(errors).length === 0,
                errors,
            });
        }
    }

    onSubmit = () => {
        this.props.save(this.props.job);
    }

    onNameChange = (event, value) => {
        this.props.editJob("name", value);
    }

    onTypeChange = (event, index) => {
        const type = this.props.availableTypes[index];
        this.props.editJob("type", type);
    }

    onCronExpressionChange = (event, newValue) => {
        this.props.editJob("cronExpression", newValue);
    }

    onParametersChange = value => {
        this.props.editJob("parameters", value);
    }
    
    renderLastExecutionText = () => {
        const lastExecution = moment(this.props.job.lastExecuted);
        return (
            <div>Last executed on <b>{}</b> at <b>{lastExecution.format('HH:ss')}</b>, status: {this.props.job.lastExecutedStatus}</div>
        );
    }

    discardChanges = () => {
        history.replace('/');
    }

    render = () => (
        <div>
            <div style={styles.header}>
                <ConditionalIconButton
                    icon="arrow_back"
                    showConfirmation={this.props.dirty}
                    confirmationMessage={'Are you sure you want to discard your changes?'}
                    onConfirm={this.discardChanges}
                />
                <Heading style={{ paddingBottom: 16, paddingLeft: 24 }}>
                    { this.props.title }
                </Heading>
            </div>
            { this.props.job ?
                <Paper style={styles.jobDetails}>
                    <Heading>Attributes</Heading>
                    <TextField
                        fullWidth
                        value={this.props.job.name}
                        floatingLabelText="Name"
                        onChange={this.onNameChange}
                        errorText={this.state.errors.name}
                    />
                    <TextField
                        fullWidth
                        value={this.props.job.cronExpression}
                        floatingLabelText="Cron expression"
                        onChange={this.onCronExpressionChange}
                        errorText={this.state.errors.cronExpression}
                    />
                    <SelectField
                        fullWidth
                        value={this.props.job.type}
                        floatingLabelText="Job type"
                        onChange={this.onTypeChange}
                    >
                        { this.props.availableTypes.map(type => 
                            <MenuItem key={type} value={type} primaryText={type} />
                        )}
                    </SelectField>

                    { this.props.job.type &&
                        <JobParameters
                            type={this.props.job.type}
                            parameters={this.props.job.parameters}
                            availableParameters={this.props.availableParameters}
                            attributeOptions={this.props.attributeOptions}
                            onChange={this.onParametersChange}
                        />
                    }

                    { this.props.job.lastExecuted &&
                        <div>
                            <Heading style={styles.detailsHeader}>Details</Heading>
                            <div>Job created on: {moment(this.props.job.created).format('DD.MM.YYYY')}</div>
                            <div>Last executed: {moment(this.props.job.lastExecuted).format('DD.MM.YYYY HH:ss')}</div>
                            <div>Last execution status: {this.props.job.lastExecutedStatus}</div>
                        </div>
                    }

                    <JobActionPanel
                        job={this.props.job}
                        save={this.onSubmit}
                        saveEnabled={this.props.dirty && this.state.isValid}
                        delete={() => this.props.delete(this.props.job.id)}
                        saveLabel={this.props.saveLabel}
                        deleteLabel={this.props.deleteLabel}
                    />
                </Paper>
                : <div>Could not find job</div>
            }
        </div>
    );
}

export default JobDetails;