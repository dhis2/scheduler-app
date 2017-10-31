import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import d2 from 'd2/lib/d2';
import { compose, lifecycle, pure } from 'recompose';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import Heading from 'd2-ui/lib/headings/Heading.component';
import Paper from 'material-ui/Paper';

import * as actionTypes from 'constants/actionTypes';
import JobDetails from 'components/JobDetails';
import JobEntry from 'components/JobEntry';

const headerStyle = {
    display: 'flex',
    flexDirection: 'row',
    padding: 24,
    fontWeight: 600,
}

const JobList = ({ jobs, toggleJob }) =>
        <div>
            <Heading style={{ paddingBottom: 16, paddingLeft: 24 }}>
                Scheduled Jobs
            </Heading>
            <Paper>
                <div style={headerStyle}>
                    <div style={{ flex: 10, }}>Name</div>
                    <div style={{ flex: 10, }}>Job Status</div>
                    <div style={{ flex: 10, }}>Next execution</div>
                    <div style={{ flex: 0, }}>Enabled</div>
                </div>
                <Divider />
                { jobs && jobs.map((job, index) =>
                    <Link key={job.id} to={`edit/${job.id}`}>
                        <JobEntry
                            job={job}
                            onToggle={toggleJob}
                            first={index === 0}
                        />
                    </Link>
                )}
            </Paper>
            <Link to={'add'}>
                <AddButton />
            </Link>
        </div>;


const AddButton = () =>
    <div style={{
        position: 'absolute',
        right: 36,
        bottom: 36,
    }}>
        <FloatingActionButton>
            <FontIcon className="material-icons">add</FontIcon>
        </FloatingActionButton>
    </div>;

const enhance = compose(
    connect(
        (state) => ({
            jobs: state.jobs.all,
        }),
        dispatch => ({
            toggleJob: job => dispatch({ type: actionTypes.JOB_SAVE, payload: { job }}),
        }),
    ),
    pure,
);

export default enhance(JobList);