import React, { Component } from "react";
import JobDetails from './JobDetails';
import FontIcon from 'material-ui/FontIcon';
import Checkbox from 'material-ui/Checkbox';
import moment from 'moment';

import d2 from 'd2/lib/d2';

const listEntryStyle = {
    cursor: 'pointer',
    paddingLeft: 24,
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

const JobEntry = ({ job, onSelectJob, isSelected, toggleJob, first }) =>
    <div>
        <div onClick={onSelectJob} style={{...listEntryStyle, borderTop: first ? '' : '1px solid lightgray'}}>
            <FontIcon className="material-icons" style={{ paddingRight: 16 }}>
                { isSelected ? 'keyboard_arrow_down' : 'keyboard_arrow_right' }
            </FontIcon>
            <div style={{...displayNameStyle, ...someWeight}}>{job.displayName}</div>
            <div style={someWeight}>{job.jobStatus}</div>
            <div style={someWeight}>{moment(job.nextExecutionTime).format('DD.MM.YYYY')}</div>
            <div>
                <Checkbox
                    checked={job.enabled}
                    onCheck={toggleJob}
                    onClick={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                    }}
                />
            </div>
        </div>
        { isSelected &&
            <JobDetails job={job} />
        }
    </div>

export default JobEntry;