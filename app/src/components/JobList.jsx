import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from '../constants/actionTypes';
import Heading from 'd2-ui/lib/headings/Heading.component';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import JobDetails from './JobDetails';
import JobEntry from './JobEntry';

import d2 from 'd2/lib/d2';

const headerStyle = {
    display: 'flex',
    flexDirection: 'row',
    padding: 24,
    fontWeight: 600,
}

class JobList extends Component {
    componentDidMount() {
        this.props.loadJobs();
        this.props.loadJobConfiguration();
    }
    
    onJobSelect = (jobIndex) => {
        this.props.selectJob(jobIndex === this.props.selected ? -1 : jobIndex);
    }

    onJobToggle = (jobIndex, enabled) => {
        console.log('Job', jobIndex, 'toggled to', enabled);
    }

    render = () => (
        <Paper>
            <div style={headerStyle}>
                <div style={{ flex: 10, }}>Name</div>
                <div style={{ flex: 10, }}>Job Status</div>
                <div style={{ flex: 10, }}>Next execution</div>
                <div style={{ flex: 0, }}>Enabled</div>
            </div>
            <Divider />
            { this.props.jobs && this.props.jobs.map((job, index) =>
                <JobEntry
                    key={job.id}
                    job={job}
                    onSelect={() => { this.onJobSelect(index); }}
                    onToggle={value => { this.onJobToggle(index, value); }}
                    isSelected={index === this.props.selected}
                    first={index === 0}
                />
            )}
        </Paper>
    );
}

const ConnectedJobList = connect(
    (state) => ({
        jobs: state.jobs.jobs,
        selected: state.jobs.selected,
    }),
    dispatch => ({
        loadJobs: () => dispatch({ type: actionTypes.JOBS_LOAD }),
        loadJobConfiguration: () => dispatch({ type: actionTypes.CONFIGURATION_LOAD }),
        selectJob: index => dispatch({ type: actionTypes.JOB_SELECT, payload: { index } }),
    }),
)(JobList);

export default ConnectedJobList;