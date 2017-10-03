import React, { Component } from "react";
import JobDetails from './JobDetails';
import FontIcon from 'material-ui/FontIcon';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import moment from 'moment';

import d2 from 'd2/lib/d2';

const listEntryStyle = {
    cursor: 'pointer',
    paddingLeft: 24,
    paddingRight: 24,
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    fontSize: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
}

const someWeight = {
    flex: 10,
}

const displayNameStyle = {
    fontSize: 20,
}

const JobEntry = ({ job, onSelectJob, isSelected, toggleJob, first }) => {
    const enabledStatusStyle = {
        fontWeight: '600',
        color: job.enabled ? 'mediumseagreen' : 'tomato',
    };

    const nextExecution = moment(job.nextExecutionTime);
    const nextExecutionText = nextExecution.format('DD.MM.YYYY HH:SS');

    return (
        <div>
            <div onClick={onSelectJob} style={{...listEntryStyle, borderTop: first ? '' : '1px solid lightgray'}}>
                <div style={{...displayNameStyle, ...someWeight }}>{job.displayName}</div>
                <div style={someWeight}>{job.jobStatus}</div>
                <div style={someWeight}>{nextExecutionText}</div>
                <div><Toggle defaultToggled={job.enabled} /></div>
            </div>
            { isSelected &&
                <JobDetails />
            }
        </div>
    );
}

export default JobEntry;