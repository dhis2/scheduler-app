import React, { Component } from "react";
import { connect } from "react-redux";
import Heading from 'd2-ui/lib/headings/Heading.component';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import moment from 'moment';

import * as actionTypes from '../constants/actionTypes';
import cronExpressionRegex from '../constants/cronExp';
import JobActionPanel from './JobActionPanel';

const jobDetailsStyle = {
    marginLeft: 64,
    marginRight: 64,
    paddingTop: 24,
    paddingBottom: 24,
};

const validCronExpression = exp => {
    return exp.trim().match(cronExpressionRegex);
}

class JobDetails extends Component {
    job = this.props.job;
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
    
    renderLastExecutionText = () => {
        const lastExecution = moment(this.job.lastExecuted);
        return (
            <div>Last executed on <b>{}</b> at <b>{lastExecution.format('HH:ss')}</b>, status: {this.job.lastExecutedStatus}</div>
        );
    }

    render = () => {
        if (this.job) {
            return (
                <div style={jobDetailsStyle}>
                    <Heading>Attributes</Heading>
                    <TextField
                        fullWidth
                        defaultValue={this.job.name}
                        floatingLabelText="Name"
                    />
                    <TextField
                        fullWidth
                        defaultValue={this.job.cronExpression}
                        floatingLabelText="Cron expression"
                        onChange={this.onCronExpressionChange}
                        errorText={this.state.cronExpressionErrorMessage}
                    />
                    <SelectField
                        fullWidth
                        value={this.job.jobType}
                        floatingLabelText="Job type"
                    >
                        { this.props.jobTypes && this.props.jobTypes.map(type => 
                            <MenuItem key={type} value={type} primaryText={type} />
                        )}
                    </SelectField>

                    <Heading style={{ paddingTop: 24, paddingBottom: 16 }}>Parameters</Heading>
                    No parameters for this job type.
                    
                    <Heading style={{ paddingTop: 24, paddingBottom: 16 }}>Details</Heading>
                    <div>Job created on: {moment(this.job.created).format('DD.MM.YYYY')}</div>
                    <div>Last executed: {moment(this.job.lastExecuted).format('DD.MM.YYYY HH:ss')}</div>
                    <div>Last execution status: {this.job.lastExecutedStatus}</div>

                    <JobActionPanel
                        job={this.props.job}
                        delete={this.props.deleteJob}/>
                </div>
            );
         } else return null;
    }
}

export default connect(
    state => ({
        jobTypes: state.jobs.jobTypes,
        job: state.jobs.jobs[state.jobs.selected],
    }),
    dispatch => ({
        deleteJob: id => dispatch({ type: 'JOB_DELETE', payload: { id }})
    })
)(JobDetails);