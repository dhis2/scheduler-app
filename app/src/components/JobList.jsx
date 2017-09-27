import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from '../constants/actionTypes';
import Heading from 'd2-ui/lib/headings/Heading.component';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';

import JobDetails from './JobDetails';
import JobEntry from './JobEntry';

import d2 from 'd2/lib/d2';

class JobList extends Component {
    constructor(props) {
        super(props);
        this.props.loadJobs();
    }
    
    onJobSelect = (jobIndex) => {
        this.props.selectJob(jobIndex === this.props.selected ? -1 : jobIndex);
    }

    toggleJob = (event, isInputChecked) => {
        console.warn('Checkbox checked.');
    }

    render = () => (
        <Paper>
            { this.props.jobs && this.props.jobs.map((job, index) =>
                <JobEntry
                    key={job.id}
                    job={job}
                    onSelectJob={() => { this.onJobSelect(index); }}
                    isSelected={index === this.props.selected}
                    toggleJob={this.toggleJob}
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
        selectJob: jobIndex => dispatch({ type: actionTypes.JOB_SELECT, payload: jobIndex }),
    }),
)(JobList);

export default ConnectedJobList;