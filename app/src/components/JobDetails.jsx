import React, { Component } from 'react';
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

const jobDetailsStyle = {
    padding: 24,
};

const validCronExpression = exp => {
    return exp.trim().match(cronExpressionRegex);
}

const styles = {
    mediumIcon: {
        width: 48,
        height: 48,
    },
}

class JobDetails extends Component {
    state = {
        cronExpressionErrorMessage: '',
    }

    onCronExpressionChange = (event, newValue) => {
        const validExp = validCronExpression(newValue);

        this.setState({
            cronExpressionErrorMessage: validExp
                ? ''
                : 'Invalid cron expression',
        });

        if (validExp) {
            //this.props.cronExpressionChanged(newValue); // TODO: Trim string?
        }
    }

    componentWillMount = () => {
        this.props.selectJob(this.props.match.params.id);
    }
    
    renderLastExecutionText = () => {
        const lastExecution = moment(this.props.job.lastExecuted);
        return (
            <div>Last executed on <b>{}</b> at <b>{lastExecution.format('HH:ss')}</b>, status: {this.props.job.lastExecutedStatus}</div>
        );
    }

    deleteSelectedJob = () => {
        if (this.props.job) {
            this.props.deleteJob(this.props.job.id);
        }
    }

    render = () =>
        <div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <Link to="/">
                    <IconButton
                        iconStyle={styles.mediumIcon}
                        style={styles.mediumIcon}
                    >
                        <FontIcon className="material-icons">arrow_back</FontIcon>
                    </IconButton>
                </Link>
                <Heading style={{ paddingBottom: 16, paddingLeft: 24 }}>
                    { this.props.job ? this.props.job.displayName : 'Job details' }
                </Heading>
            </div>
            { this.props.jobsLoaded && this.props.job ?
                <Paper style={jobDetailsStyle}>
                    <Heading>Attributes</Heading>
                    <TextField
                        fullWidth
                        defaultValue={this.props.job.name}
                        floatingLabelText="Name"
                    />
                    <TextField
                        fullWidth
                        defaultValue={this.props.job.cronExpression}
                        floatingLabelText="Cron expression"
                        onChange={this.onCronExpressionChange}
                        errorText={this.state.cronExpressionErrorMessage}
                    />
                    <SelectField
                        fullWidth
                        value={this.props.job.jobType}
                        floatingLabelText="Job type"
                    >
                        { this.props.jobTypes && this.props.jobTypes.map(type => 
                            <MenuItem key={type} value={type} primaryText={type} />
                        )}
                    </SelectField>

                    <Heading style={{ paddingTop: 24, paddingBottom: 16 }}>Parameters</Heading>
                    No parameters for this job type.
                    
                    <Heading style={{ paddingTop: 24, paddingBottom: 16 }}>Details</Heading>
                    <div>Job created on: {moment(this.props.job.created).format('DD.MM.YYYY')}</div>
                    <div>Last executed: {moment(this.props.job.lastExecuted).format('DD.MM.YYYY HH:ss')}</div>
                    <div>Last execution status: {this.props.job.lastExecutedStatus}</div>

                    <JobActionPanel
                        job={this.props.job}
                        delete={this.deleteSelectedJob}/>
                </Paper>
                : <div>Could not find job</div>
            }
        </div>;
}

export default connect(
    state => ({
        job: state.jobs.jobs.find(job => job.id === state.jobs.selected),
        jobsLoaded: state.jobs.jobsLoaded,
        jobTypes: state.jobs.jobTypes,
        jobParameters: state.jobs.jobParameters,
    }),
    dispatch => ({
        selectJob: id => dispatch({ type: actionTypes.JOB_SELECT, payload: { id } }),
        deleteJob: id => dispatch({ type: 'JOB_DELETE', payload: { id }})
    })
)(JobDetails);