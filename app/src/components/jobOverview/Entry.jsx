import React, { Component } from 'react';
import Content from 'components/jobContent/Content';
import FontIcon from 'material-ui/FontIcon';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import moment from 'moment';

import d2 from 'd2/lib/d2';

const styles = {
    listEntry: {
        color: 'black',
        cursor: 'pointer',
        paddingLeft: 24,
        paddingRight: 24,
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        fontSize: 14,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    someWeight: { flex: 10 },
    displayName: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontSize: 20,
    },
    noWrap: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    }
}

const Entry = ({ job, onSelect, onToggle, first }) => {
    const enabledStatusStyle = {
        fontWeight: '600',
        color: job.enabled ? 'mediumseagreen' : 'tomato',
    };

    const nextExecution = moment(job.nextExecutionTime);
    const nextExecutionText = nextExecution.format('DD.MM.YYYY HH:mm');

    const toggle = (e, value) => {
        onToggle({
            id: job.id,
            name: job.name,
            jobType: job.jobType,
            jobParameters: job.jobParameters,
            cronExpression: job.cronExpression,
            enabled: value,
        });
    }

    const toggleClick = event => {
        event.preventDefault();
        event.stopPropagation();
    }

    return (
        <div onClick={onSelect} style={{...styles.listEntry, borderTop: first ? '' : '1px solid lightgray'}}>
            <div style={{...styles.displayName, flex: 12 }}>{job.displayName}</div>
            <div style={{...styles.noWrap, flex: 11 }}>{job.jobType}</div>
            <div style={{ flex: 7 }}>{job.jobStatus}</div>
            <div style={{ flex: 10 }}>{nextExecutionText}</div>
            <div><Toggle toggled={job.enabled} onToggle={toggle} onClick={toggleClick} /></div>
        </div>
    );
}

export default Entry;