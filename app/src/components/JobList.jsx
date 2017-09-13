import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import * as actionTypes from '../constants/actionTypes';
import d2 from 'd2/lib/d2';

const jobListStyle = {
    paddingTop: '100px',
};

const JobList = ({ loadJobs, jobs}) =>
        <div style={jobListStyle}>
            <div onClick={ loadJobs }>
                Jobs:
                { jobs.map(job =>
                    <div key={job.id}>{ job.displayName }</div>
                )}
            </div>
        </div>;

const ConnectedJobList = connect(
    (state) => ({
        jobs: state.jobs.jobs,
    }),
    dispatch => ({
        loadJobs: () => dispatch({ type: actionTypes.JOBS_LOAD }),
    }),
)(JobList);

export default ConnectedJobList;