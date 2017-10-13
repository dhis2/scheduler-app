import React, { Component } from 'react';
import { connect } from 'react-redux';
import Heading from 'd2-ui/lib/headings/Heading.component';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom'

import * as actionTypes from 'constants/actionTypes';
import JobDetails from 'components/JobDetails';
import JobEntry from 'components/JobEntry';

import d2 from 'd2/lib/d2';

const headerStyle = {
    display: 'flex',
    flexDirection: 'row',
    padding: 24,
    fontWeight: 600,
}

class JobList extends Component {
    onJobToggle = (jobIndex, enabled) => {
        console.log('Job', jobIndex, 'toggled to', enabled);
    }

    render = () => (
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
                { this.props.jobs && this.props.jobs.map((job, index) =>
                    <Link key={job.id} to={`edit/${job.id}`}>
                        <JobEntry
                            job={job}
                            onToggle={value => { this.onJobToggle(index, value); }}
                            first={index === 0}
                        />
                    </Link>
                )}
            </Paper>
        </div>
    );
}

const ConnectedJobList = connect(
    (state) => ({
        jobs: state.jobs.jobs,
    }),
    dispatch => ({}),
)(JobList);

export default ConnectedJobList;