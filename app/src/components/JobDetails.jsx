import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Toggle from 'material-ui/Toggle';

import * as actionTypes from '../constants/actionTypes';
import cronExpressionRegex from '../constants/cronExp';

const jobDetailsStyle = {
    borderTop: '1px solid lightgray',
    marginLeft: 64,
    marginRight: 64,
    paddingTop: 24,
    paddingBottom: 24,
};

const saveButtonStyle = {
    marginTop: 24,
    marginLeft: 16,
}

const deleteButtonStyle = {
    backgroundColor: 'tomato',
}

const validCronExpression = exp => {
    return exp.trim().match(cronExpressionRegex);
}

class JobDetails extends Component {
    constructor(props) {
        super(props);

        this.job = this.props.job;
        this.state = {
            cronExpressionErrorMessage: '',
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('Props:', nextProps);
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

    render = () => {
        if (this.props.job) {
            return (
                <div style={jobDetailsStyle}>
                    <Toggle
                        label="Enabled"
                        defaultToggled={this.job.enabled}
                    />
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
                    <RaisedButton
                        primary
                        buttonStyle={deleteButtonStyle}
                        label="Delete job"
                        icon={<FontIcon className="material-icons">delete_forever</FontIcon>}
                    />
                    <RaisedButton
                        primary
                        label="Save changes"
                        style={saveButtonStyle}
                        icon={<FontIcon className="material-icons">cloud_upload</FontIcon>}
                    />
                </div>
            );
         } else return null;
    }
}

export default JobDetails; // TODO: Connect.

/*

Details

Enabled: Checkmark
Cron expression: TextField
Last executed Status: Scheduled | Completed | Failed
Next execution time


*/