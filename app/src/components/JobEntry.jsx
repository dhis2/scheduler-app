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

const JobEntry = ({ job, onSelect, onToggle, isSelected, first }) => {
    const enabledStatusStyle = {
        fontWeight: '600',
        color: job.enabled ? 'mediumseagreen' : 'tomato',
    };

    const nextExecution = moment(job.nextExecutionTime);
    const nextExecutionText = nextExecution.format('DD.MM.YYYY HH:SS');

    const toggle = (event, value) => {
        onToggle(value);
    }

    const toggleClick = event => {
        event.preventDefault();
        event.stopPropagation();
    }

    return (
        <div>
            <div onClick={onSelect} style={{...listEntryStyle, borderTop: first ? '' : '1px solid lightgray'}}>
                <div style={{...displayNameStyle, ...someWeight }}>{job.displayName}</div>
                <div style={someWeight}>{job.jobStatus}</div>
                <div style={someWeight}>{nextExecutionText}</div>
                <div><Toggle toggled={job.enabled} onToggle={toggle} onClick={toggleClick} /></div>
            </div>
            { isSelected &&
                <JobDetails />
            }
        </div>
    );
}

export default JobEntry;